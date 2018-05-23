import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {Bcrumb} from '../../component/bcrumb/bcrumb';
import { FetchAPI } from '../../utils/Axios';
import { Axios } from '../../utils/Axios';
import ManagerBody from "../../component/public/ManagerBody";
import { Popconfirm, Input}  from 'antd';

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

    mockData = [{
        name: '鑫星家园',
        remark: '你们家的房子很好啊，可以带我去看看吗',
    }]
    columns = [{
        title: '房屋名称',
        dataIndex: 'fName',
        key: 'fName',
        width: '20%',
        render: (text, record) => this.renderColumns(text, record, 'fName'),
    }, {
        title: '留言人',
        dataIndex: 'rSendname',
        key: 'rSendname',
        width: '10%',
        render: (text, record) => this.renderColumns(text, record, 'rSendname'),
    }, {
        title: '房屋所有人',
        dataIndex: 'rBelongname',
        key: 'rBelongname',
        width: '10%',
        render: (text, record) => this.renderColumns(text, record, 'rBelongname'),
    }, {
        title: '留言内容',
        dataIndex: 'rInfo',
        key: 'rInfo',
        width: '40%',
        render: (text, record) => this.renderColumns(text, record, 'rInfo'),
    },  {
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
    componentWillMount (){
        const { pageSize, pageNum } = this.state;
        const params = { pageSize, pageNum }
        this.searchData(params);

    }
    searchData = (params) => {
        let { pageSize, pageNum } = params;
        Axios.post(`/remark/getAllRemarkPage?pageNum=${pageNum}&pageSize=${pageSize}`).then((reslut) => {
            console.log("留言信息查询结果:",reslut.data);
            let { data = [] } = reslut.data;
            const { pageNum, pageSize, total } = reslut.data.page;
            const recordsData = data.map((item) => {
                const { rId : key , rId: rId , ...rest} = item;
                const { fName } = item.flat;
                return { key, rId, fName, ...rest }
            })
            this.setState({
                records: recordsData,
                pageSize: pageSize,
                pageNum: pageNum,
                total: total,
            },()=>{
                console.log("recordsData:",records)
            })
            this.cacheData = recordsData.map(item => ({ ...item }));
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
        const newData = [...this.state.records];
        debugger
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target.editable = true;
            this.setState({ records: newData });
        }
    }
    save(key) {
        const newData = [...this.state.records];
        const target = newData.filter(item => key === item.key)[0];
        console.log("修改后的数据为：",target);
        const { rInfo, rId } = target;
        if (target) {
            delete target.editable;
            this.setState({ records: newData });
            this.cacheData = newData.map(item => ({ ...item }));
        }

        const query = { rInfo, rId  }
        Axios.post(`/remark/updateRemark`,query).then((result) => {
            console.log("成功",result);
        })

    }
    cancel(key) {
        const newData = [...this.state.records];
        const target = newData.filter(item => key === item.key)[0];
        //target 为本条数据
        if (target) {
            Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);//本条数据用cacheData来覆盖
            delete target.editable;
            this.setState({ records: newData });
        }
    }
    delete(key) {
        const newData = [...this.state.records];
        const target = newData.filter(item => key === item.key)[0];

        if (target) {
            Axios.post(`/user/deleteUser`,target).then((result) => {
                const { pageSize, pageNum } = this.state;
                const params = { pageSize, pageNum }
                this.searchData(params);
            })

        }

    }


    render() {
        return (
            <div>
                <div>
                    <Bcrumb title="留言信息管理" icon="message"/>
                    <ManagerBody
                        title={ <span style={{fontSize: 13, fontWeight: 400}}> 留言信息表 </span> }
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

Main.contextTypes = {};

export default Main;