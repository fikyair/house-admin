import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes
import ManagerBody from "../../component/public/ManagerBody";
import {Bcrumb} from '../../component/bcrumb/bcrumb';
import { Axios } from '../../utils/Axios';
import { Popconfirm, Input } from 'antd';

const EditableCell = ({ editable, value, onChange }) => (
    <div>
        {editable
            ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
            : value
        }
    </div>
);
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
        title: '房屋地址',
        dataIndex: 'fStreet',
        key: 'fStreet',
        width: '20%',
    }, {
        title: '约看人',
        dataIndex: 'userName',
        key: 'userName',
        width: '20%',
    }, {
        title: '约看时间',
        dataIndex: 'assTime',
        key: 'assTime',
        width: '20%',
    },{
        title: '约看状态',
        dataIndex: 'assStatus',
        key: 'assStatus',
        width: '20%',
    },  {
        title: '操作',
        key: 'action',
        width: '20%',
        render: (text, record) => (
            <span>
                <a onClick={() => { this.pass(record.assId)} }>设为已约看</a>
                 <span className="ant-divider"/>
                <Popconfirm title="确定删除吗?" onConfirm={()=> { this.delete(record.assId)}}>
                    <a>删除</a>
                </Popconfirm>
            </span>
        ),
    }];

    pass =(assId)=> {

       const query = { assId };
       const { pageSize, pageNum } = this.state;
       const params = { pageSize, pageNum }
       Axios.post(`/assumpsit/assPass`, query).then((result)=>{
           console.log("你看你看", result.data );
           this.searchData(params);
       })
    }

    delete =(assId)=> {
        const { pageSize, pageNum } = this.state;
        const params = { pageSize, pageNum }
        Axios.get(`/assumpsit/assdelete/${assId}`).then((result)=>{
            console.log("你看你看", result );
            this.searchData(params);
        })
    }

    componentWillMount (){
        const { pageSize, pageNum } = this.state;
        const params = { pageSize, pageNum }
        this.searchData(params);

    }
//ss
    searchData = (params) => {
        let { pageSize, pageNum } = params;
        Axios.post(`/assumpsit/getAssPage?pageNum=${pageNum}&pageSize=${pageSize}`).then((reslut) => {
            console.log("房屋审核结果:",reslut.data);
            let { data = [] } = reslut.data;
            const { pageNum, pageSize, total } = reslut.data.page;
            const recordsData = data.map((item) => {
                if(item.assStatus == 0){
                    item.assStatus = '未约看';
                }else {
                    item.assStatus = '已约看'
                }

                const time = item.assStarttime.split("T");
                let timeTemp = '';
                let ky = '';
                ky = time[1];
                switch (ky) {
                    case '0': timeTemp ='00:00-02:00'
                        break;
                    case '1': timeTemp ='02:00-04:00'
                        break;
                    case '2': timeTemp ='04:00-06:00'
                        break;
                    case '3': timeTemp ='06:00-08:00'
                        break;
                    case '4': timeTemp ='08:00-10:00'
                        break;
                    case '5': timeTemp ='10:00-12:00'
                        break;
                    case '6': timeTemp ='12:00-14:00'
                        break;
                    case '7': timeTemp ='14:00-16:00'
                        break;
                    case '8': timeTemp ='16:00-18:00'
                        break;
                    case '9': timeTemp ='18:00-20:00'
                        break;
                    case '10': timeTemp ='20:00-22-00'
                        break;
                    case '11': timeTemp ='22:00-24:00'
                        break;
                }
                const fStreet = item.flat.fStreet;
                const assTime = time[0] + " "+ timeTemp;
                const { assId : key , assId: assId , assStatus, userName,  ...rest} = item;
                return { key, assId, assStatus, fStreet, userName, assTime, ...rest }
            })//aassdd
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
                    <Bcrumb title="约看信息管理" icon="message"/>
                    <ManagerBody
                        title={ <span style={{fontSize: 13, fontWeight: 400}}> 约看信息管理 </span> }
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
