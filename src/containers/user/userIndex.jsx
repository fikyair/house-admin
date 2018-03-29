import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {is, fromJS} from 'immutable';
import {Bcrumb} from '../../component/bcrumb/bcrumb';
import ManagerBody from "../../component/public/ManagerBody";
import { Table, Input, Popconfirm } from 'antd';
import {Link} from 'react-router-dom';

const EditableCell = ({ editable, value, onChange }) => (
    <div>
        {editable
            ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
            : value
        }
    </div>
);
const data = []
for (let i = 0; i < 10; i++) {
    data.push({
        key: i.toString(),
        userName: '小鸣',
        name: `小薛${i}`,
        nickName: '明明是你',
        phone: `1313225768${i}`,

    });
}
/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '用户名',
            dataIndex: 'userName',
            key: 'userName',
            width: '20%',
            render: (text, record) => this.renderColumns(text, record, 'userName'),
        }, {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            render: (text, record) => this.renderColumns(text, record, 'name'),
        }, {
            title: '昵称',
            dataIndex: 'nickName',
            key: 'nickName',
            width: '20%',
            render: (text, record) => this.renderColumns(text, record, 'nickName'),
        }, {
            title: '电话',
            dataIndex: 'phone',
            key: 'phone',
            width: '20%',
            render: (text, record) => this.renderColumns(text, record, 'phone'),
        }, {
            title: '操作',
            key: 'action',
            width: '20%',
            render: (text, record) => {
                const {editable} = record;
                return (
                    <div className="editable-row-operations">
                        {
                            editable ?
                                <span>
                  <a onClick={() => this.save(record.key)}>保存</a>
                                     <span className="ant-divider"/>
                  <Popconfirm title="确定取消吗?" onConfirm={() => this.cancel(record.key)}>
                    <a>取消</a>
                  </Popconfirm>
                </span>
                                : <span>
                                    <a onClick={() => this.edit(record.key)}>编辑</a>
                                        <span className="ant-divider"/>
                                    <a href='#'>删除</a>
                                </span>
                        }
                    </div>
                )

            }
        }];

        this.state = {
            loading: false,
            userInfo: [],
            pageNum: 1,
            pageSize: 10,
            total: 1,
            data,
        };
        this.cacheData = data.map(item => ({ ...item }));
    }

    renderColumns(text, record, column) {
        return (
            <EditableCell
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, record.key, column)}
            />
        );
    }
    handleChange(value, key, column) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target[column] = value;
            this.setState({ data: newData });
        }
    }

    edit(key) {
        debugger
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target.editable = true;
            this.setState({ data: newData });
        }
    }
    save(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            delete target.editable;
            this.setState({ data: newData });
            this.cacheData = newData.map(item => ({ ...item }));
        }
    }
    cancel(key) {
        const newData = [...this.state.data];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
            delete target.editable;
            this.setState({ data: newData });
        }
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    // }

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
                    dataSource={ this.state.data }
                />
            </div>
        );
    }
}

Main.contextTypes = {};

export default Main;

