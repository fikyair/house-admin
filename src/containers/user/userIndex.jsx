import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {is, fromJS} from 'immutable';
import {Bcrumb} from '../../component/bcrumb/bcrumb';
import ManagerBody from "../../component/public/ManagerBody";
import {Link} from 'react-router-dom';

/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            userInfo: [],
            pageNum: 1,
            pageSize: 10,
            total: 1,
        };
    }

    mockData = [{
        userName: '小鸣',
        name: '小薛',
        nickName: '明明是你',
        phone: '13132257682',
    }]
    columns = [{
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
        width: '20%',
    }, {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
    }, {
        title: '昵称',
        dataIndex: 'nickName',
        key: 'nickName',
        width: '20%',
    }, {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
        width: '20%',
    }, {
        title: '操作',
        key: 'action',
        width: '20%',
        render: (text, record) => (
            <span>
              <a href=''>编辑</a>
                 <span className="ant-divider"/>
                <a href=''>删除</a>
            </span>
        )
    }];

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    render() {

        let userInfo = this.state.userInfo;  // 用户信息数据
        return (
            <div className="user-container">
                <Bcrumb title="账号信息管理" icon="user"/>
                <ManagerBody
                    title={ <span style={{fontSize: 13, fontWeight: 400}}> 用户信息表 </span> }
                    pageNum={ this.state.pageNum }
                    pageSize={this.state.pageSize }
                    total={ this.state.total }
                    columns={ this.columns }
                    dataSource={ this.mockData }
                />
            </div>
        );
    }
}

Main.contextTypes = {};

export default Main;

