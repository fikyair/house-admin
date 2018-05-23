import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import { Select, Input, Modal, Row, Col } from 'antd';
import {Bcrumb} from '../../component/bcrumb/bcrumb';
import ManagerBody from "../../component/public/ManagerBody";
import { Axios } from "../../utils/Axios";
const Option = Select.Option;


/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            pageSize: 10,
            total: 1,
            regionInfo: [],
            streetsInfo: [],
            visible: false,
        };
    }
    mockData = [{
        pName: '北京市',
        cities: ['东城区',
            '西城区',
        ],

    },{
        pName: '深圳市',
        cities: ['大望区',
            '小店',
        ],
    }]
    columns = [{
        title: '省份',
        dataIndex: 'pName',
        key: 'pName',
        width: '30%',
    }, {
        title: '市区',
        dataIndex: 'cities',
        key: 'cities',
        width: '30%',
        render: (text, record) => this.renderCitiesColumn(text, record, 'cities'),
    }, {
        title: '街道',
        dataIndex: 'streets',
        key: 'streets',
        width: '30%',
        render: (text, record) => this.renderStreetsColumn(),
    },  {
        title: '操作',
        key: 'action',
        width: '30%',
        render: (text, record) => (
            <span>
              <a onClick={this.showModal}>新增</a>
            </span>
        )
    }];
    handleOptiona =(value)=>{
        console.log("--------->",value)
        const cId = value;
        const dataInfo = {cId};
        Axios.post(`/queryProvince/querysNameBycId`, dataInfo).then((result) =>{
            console.log("街道数据：",result.data);
            const { data = [] } = result.data;
            this.setState({
                streetsInfo: data,
            })
        })
    }
    handleOk =()=> {
        this.setState({
            visible: false
        })
    }

    handleCancel=()=> {
        this.setState({
            visible: false
        })
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
//dd
    renderCitiesColumn(text, record, column){
        const regionInfo = this.state.regionInfo;
        console.log("===>",text)
        console.log("===>",record)
        console.log("===>",column)
        return (
            <div>
                <Select placeholder={'点击查看'} onChange = {this.handleOptiona} style = {{ width: 140 }} size='large'>
                    {
                        text.map((item,k) =>{
                            return <Option key = {k} value={item.cId} >{ item.cName }</Option>
                        })
                    }
                </Select>
            </div>
        )
    }
    renderStreetsColumn(){
        const streetsInfo = this.state.streetsInfo;
       // console.log("对应的街道信息！！！",streetsInfo);
        return (
            <div>
                <Select placeholder={'点击查看'}  style = {{ width: 140 }} size='large'>
                    {
                        streetsInfo.map((item, k) =>{
                            return <Option key = {k} value={item}>{ item }</Option>
                        })
                    }
                </Select>
            </div>
        )
    }//y
    componentWillMount(){
        const { pageSize, pageNum } = this.state;
        const params = { pageSize, pageNum }
        this.searchData(params);

    }

    searchData = (params) => {
        let { pageSize, pageNum } = params;
        Axios.get(`/queryProvince/queryProvincePage?pageNum=${pageNum}&pageSize=${pageSize}`).then((reslut) => {
            console.log("Axiosreslut:",reslut.data);
            let { data = [] } = reslut.data;
            const { pageNum, pageSize, total } = reslut.data.page;
            this.setState({
                pageSize: pageSize,
                pageNum: pageNum,
                total: total,
                regionInfo: data,
            })
        })


    }


    render() {
        const  regionInfo = this.state.regionInfo;
        let source =[];
        source = regionInfo.map(item =>{
            // console.log(item);
            return {
                pName: item.pName,
                cities: item.cities.map(i=>{
                    return {
                        cId: i.cId,
                        cName: i.cName,
                    }
                })

            }
        })
        debugger
        console.log("dsdsdsdsdsd",source)
        return (
            <div>
                <div>
                    <Bcrumb title="地域信息管理" icon="environment-o"/>
                    <ManagerBody
                        title={ <span style={{fontSize: 13, fontWeight: 400}}> 地域信息管理 </span> }
                        pageNum={ this.state.pageNum }
                        pageSize={this.state.pageSize }
                        total={ this.state.total }
                        columns={ this.columns }
                        dataSource={ source }
                        changePage={(v)=>{ this.setState({pageNum: v})}}
                        changeSize={(v)=>{ this.setState({pageSize: v})}}
                        searchData = { this.searchData }
                    />
                    <Modal
                        title="添加省市街道信息"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <Row style = {{ padding: 20 ,fontSize: 13}}>
                            <Col span={24}>
                                <span style={{ fontWeight: 500,padding: 5, fontSize: 14 }}>市区</span>
                                <Input  style={{width: 140, marginBottom: 20 }}/>
                            </Col>
                            <br/>
                            <Col span={24}>
                                <span style={{ fontWeight: 500, padding: 5, fontSize: 14 }}>街道</span>
                                <Input  style={{width: 140}} />
                            </Col>
                        </Row>
                    </Modal>
                </div>
            </div>
        );
    }
}

Main.contextTypes = {};

export default Main;
