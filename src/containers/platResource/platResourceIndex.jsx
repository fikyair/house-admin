import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {is, fromJS} from 'immutable';
import {Bcrumb} from '../../component/bcrumb/bcrumb';
import ManagerBody from "../../component/public/ManagerBody";
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { Axios } from "../../utils/Axios";


/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            pageSize: 10,
            total: 1,
            flatInfo: [],
        };
    }
    columns = [{
        title: '房屋名称',
        dataIndex: 'fName',
        key: 'fName',
        width: '10%',
    }, {
        title: '房屋类型',
        dataIndex: 'fType',
        key: 'fType',
        width: '10%',
    }, {
        title: '房屋朝向',
        dataIndex: 'fOrientation',
        key: 'fOrientation',
        width: '10%',
    }, {
        title: '房屋价格',
        dataIndex: 'fPrice',
        key: 'fPrice',
        width: '10%',
    }, {
        title: '地址',
        dataIndex: 'fStreet',
        key: 'fStreet',
        width: '10%',
    }, {
        title: '房龄',
        dataIndex: 'fAge',
        key: 'fAge',
        width: '10%',
    },  {
        title: '房屋描述',
        dataIndex: 'fDetails',
        key: 'fDetails',
        width: '10%',
    },{
        title: '要求',
        dataIndex: 'fRequire',
        key: 'fRequire',
        width: '10%',
    },{
            title: '操作',
            key: 'action',
            width: '10%',
            render: (text, record) => (
                <span>
                <a href='/platResource/platDetails/:id'>详情</a>
                 <span className="ant-divider"/>
                <a href=''>删除</a>
            </span>
            )
        }
];
    componentWillMount(){
        const { pageSize, pageNum } = this.state;
        const params = { pageSize, pageNum }
        this.searchData(params);

    }
    searchData = (params) => {
        let { pageSize, pageNum } = params;
        Axios.get(`/flat/queryall?pageNum=${pageNum}&pageSize=${pageSize}`).then((reslut) => {
            console.log("Axiosreslut:",reslut.data);
            let { data = [] } = reslut.data;
            const { pageNum, pageSize, total } = reslut.data.page;
            this.setState({
                pageSize: pageSize,
                pageNum: pageNum,
                total: total,
                flatInfo: data,
            })
        })

    }
    render() {
        return (
            <div>
                <div>
                    <Bcrumb title="房源信息管理" icon="home"/>
                    <Button className="editable-add-btn" style = {{ margin: '0 24px'}} onClick={this.handleAdd}><a href = '/platResource/platAdd'>新增</a></Button>
                    <ManagerBody
                        title={ <span style={{fontSize: 13, fontWeight: 400}}> 房源信息表 </span> }
                        pageNum={ this.state.pageNum }
                        pageSize={this.state.pageSize }
                        total={ this.state.total }
                        columns={ this.columns }
                        dataSource={ this.state.flatInfo }
                        changePage={(v)=>{ this.setState({pageNum: v})}}
                        changeSize={(v)=>{ this.setState({pageSize: v})}}
                        searchData = { this.searchData }
                    />
                </div>
            </div>
        );

    }
}

Main.contextTypes = {};

export default Main;