import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import ManagerBody from "../../component/public/ManagerBody";
import {Bcrumb} from '../../component/bcrumb/bcrumb';
import { Axios } from '../../utils/Axios';
import { Popconfirm, Input } from 'antd';

const records = []
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            remarkInfo: [],
            pageNum: 1,
            pageSize: 10,
            total: 1,
            records,
        };
    }

    columns = [{
        title: '小区名',
        dataIndex: 'fName',
        key: 'fName',
        width: '10%',
    }, {
        title: '房屋地区',
        dataIndex: 'fCity',
        key: 'fCity',
        width: '10%',
    }, {
        title: '楼号',
        dataIndex: 'fBuilding',
        key: 'fBuilding',
        width: '10%',
    }, {
        title: '单元号',
        dataIndex: 'fUnit',
        key: 'fUnit',
        width: '10%',
    }, {
        title: '门牌号',
        dataIndex: 'fHouse',
        key: 'fHouse',
        width: '10%',
    }, {
        title: '期望价格',
        dataIndex: 'fExpectprice',
        key: 'fExpectprice',
        width: '10%',
    }, {
        title: '申请人',
        dataIndex: 'fOwnername',
        key: 'fOwnername',
        width: '10%',
    }, {
        title: '申请电话',
        dataIndex: 'fOwnermobile',
        key: 'fOwnermobile',
        width: '10%',
    }, {
        title: '审核状态',
        dataIndex: 'fStatus',
        key: 'fStatus',
        width: '10%',
    },  {
        title: '操作',
        key: 'action',
        width: '20%',
        render: (text, record) => (
            <span>
                <a href='/platResource/platDetails/:id'>通过</a>
                 <span className="ant-divider"/>
                <a  onClick={() =>{this.pass()}}>不通过</a>
            </span>
        )
    }];

    pass() {

    }

    componentWillMount (){
        const { pageSize, pageNum } = this.state;
        const params = { pageSize, pageNum }
        this.searchData(params);

    }

    searchData = (params) => {
        let { pageSize, pageNum } = params;
        Axios.post(`/verify/getAllVerifyPage?pageNum=${pageNum}&pageSize=${pageSize}`).then((reslut) => {
            console.log("房屋审核结果:",reslut.data);
            let { data = [] } = reslut.data;
            const { pageNum, pageSize, total } = reslut.data.page;
            const recordsData = data.map((item) => {
                if(item.fStatus == 0){
                    item.fStatus = '未通过';
                }else {
                    item.fStatus = '审核通过'
                }
                const { fId : key , fId: fId , fName, fStatus, ...rest} = item;
                return { key, fId, fName, fStatus, ...rest }
            })//aa
            this.setState({
                records: recordsData,
                pageSize: pageSize,
                pageNum: pageNum,
                total: total,
            },()=>{
                console.log("recordsData:",records)
            })
        })

    }

    render() {
        return (
            <div>
                <div>
                    <Bcrumb title="房屋审核管理" icon="message"/>
                    <ManagerBody
                        title={ <span style={{fontSize: 13, fontWeight: 400}}> 房屋审核管理 </span> }
                        pageNum={ this.state.pageNum }
                        pageSize={this.state.pageSize }
                        total={ this.state.total }
                        columns={ this.columns }
                        changePage={(v)=>{ this.setState({pageNum: v})}}
                        changeSize={(v)=>{ this.setState({pageSize: v})}}
                        dataSource={ this.state.records }
                        searchData = { this.searchData }
                    />
                </div>
            </div>
        );

    }
}

Main.contextTypes = {
};

export default Main;
