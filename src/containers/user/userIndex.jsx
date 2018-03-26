import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {is, fromJS} from 'immutable';
import {Bcrumb} from '../../component/bcrumb/bcrumb';
import ManagerBody from "../../component/public/ManagerBody";

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

    columns = [{
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName'
    }, {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
    }, {
        title: '昵称',
        dataIndex: 'nickName',
        key: 'nickName'
    }, {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone'
    }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            (record.roleLevel && record.roleLevel > curRoleLevel) ?
                <span>
			    		<a href="javascript:;" onClick={this.editUser.bind(this, record)}>编辑</a>
			    		<span className="ant-divider"/>
			    		<a href="javascript:;" className="ant-dropdown-link"
                           onClick={this.changeState.bind(this, record.clientId, record.name, record.available)}>{record.available == 1 ? '停用' : '启用'}</a>
			    		<span className="ant-divider"/>
			    		<a href="javascript:;" onClick={this.delUser.bind(this, record.clientId, record.name)}>删除</a>
			    	</span>
                :
                <span>
			    		<span className="cole5e5e5">编辑</span>
			    		<span className="ant-divider"/>
			    		<span className="cole5e5e5">{record.available == 1 ? '停用' : '启用'}</span>
			    		<span className="ant-divider"/>
			    		<span className="cole5e5e5">删除</span>
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
                    title={<span style = {{ fontSize: 13 ,fontWeight: 400 }}> 用户信息表 </span>}
                    pageNum={ this.state.pageNum }
                    pageSize={ this.state.pageSize }
                    total={ this.state.total }
                    columns={ this.columns }
                    //dataSource = { }
                />
            </div>
        );
    }
}

Main.contextTypes = {};

export default Main;

