import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {is, fromJS} from 'immutable';
import {Bcrumb} from '../../component/bcrumb/bcrumb';
import ManagerBody from "../../component/public/ManagerBody";
import { Button, Input, Popconfirm } from 'antd';
import {Link} from 'react-router-dom';
import { Axios } from "../../utils/Axios";

const EditableCell = ({ editable, value, onChange }) => (
    <div>
        {editable
            ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
            : value
        }
    </div>
);
const records = []
/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '用户名',
            dataIndex: 'uName',
            key: 'uName',
            width: '20%',
            render: (text, record) => this.renderColumns(text, record, 'uName'),
        }, {
            title: '密码',
            dataIndex: 'uPwd',
            key: 'uPwd',
            width: '20%',
            render: (text, record) => this.renderColumns(text, record, 'uPwd'),
        }, {
            title: '昵称',
            dataIndex: 'uNickname',
            key: 'uNickname',
            width: '20%',
            render: (text, record) => this.renderColumns(text, record, 'uNickname'),
        }, {
            title: '电话',
            dataIndex: 'uPhone',
            key: 'uPhone',
            width: '20%',
            render: (text, record) => this.renderColumns(text, record, 'uPhone'),
        }, {
            title: '操作',
            key: 'action',
            width: '20%',
            render: (text, record) => {
                debugger
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
                                :
                                <span>
                                    <a onClick={() => this.edit(record.key)}>编辑</a>
                                        <span className="ant-divider"/>
                                     <Popconfirm title="确定删除吗?" onConfirm={() => this.delete(record.key)}>
                                        <a>删除</a>
                                    </Popconfirm>
                                </span>
                        }
                    </div>
                );

            },
        }];
        this.state = {
            loading: false,
            userInfo: [],
            pageNum: 1,
            pageSize: 10,
            total: 1,
            records,
        };
        this.cacheData = records.map(item => ({ ...item }));
    }
    componentWillMount(){
         Axios.get('/user/selectall').then((reslut) => {
             console.log("Axiosreslut:",reslut.data);
             let { data = [] } = reslut.data;
             const recordsData = data.map((item) => {
                 const { uId : key , uId: uId , ...rest} = item;
                 return { key, uId, ...rest }
             })
             this.setState({
                 records: recordsData
             })
        })

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
        console.log("框里的值",value);
        const newData = [...this.state.records];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target[column] = value;
            this.setState({ records: newData });
        }
    }

    edit(key) {
        debugger
        const newData = [...this.state.records];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target.editable = true;
            this.setState({ records: newData });
        }
    }
    save(key) {
        debugger
        const newData = [...this.state.records];
        const target = newData.filter(item => key === item.key)[0];
        console.log("修改后的数据为：",target);
        if (target) {
            delete target.editable;
            this.setState({ records: newData });
            this.cacheData = newData.map(item => ({ ...item }));
        }

       Axios.post(`/user/updateUser`,target).then((result) => {
           console.log("成功",result);
        })

    }
    cancel(key) {
        const newData = [...this.state.records];
        const target = newData.filter(item => key === item.key)[0];
        //target 为本条数据
        if (target) {
            Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
            delete target.editable;
            this.setState({ records: newData });
        }
    }
    delete(key) {
        debugger
        const newData = [...this.state.records];
        const target = newData.filter(item => key === item.key)[0];
        Axios.post(`/user/deleteUser`,target).then((result) => {
           // this.setState({ records: [] });
            console.log("成功",result);
        })
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    // }

    handleAdd = () => {
        const { count, records } = this.state;

    }
    render() {

        let userInfo = this.state.userInfo;  // 用户信息数据
        return (
            <div className="user-container">
                <Bcrumb title="账号信息管理" icon="user"/>
                <Button className="editable-add-btn" style = {{ margin: '0 24px'}} onClick={this.handleAdd}><a href = '/user/userAdd'>新增</a></Button>
                <ManagerBody
                    title={ <span style={{fontSize: 13, fontWeight: 400}}> 用户信息表 </span> }
                    pageNum={ this.state.pageNum }
                    pageSize={this.state.pageSize }
                    total={ this.state.total }
                    columns={ this.columns }
                    dataSource={ this.state.records }
                />
            </div>
        );
    }
}

Main.contextTypes = {};

export default Main;

