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
        title: '房屋编号',
        dataIndex: 'fId',
        key: 'fId',
        width: '30%',
        render: (text, record) => this.renderColumns(text, record, 'fId'),
    }, {
        title: '约看人',
        dataIndex: 'uName',
        key: 'uName',
        width: '30%',
        render: (text, record) => this.renderColumns(text, record, 'uName'),
    }, {
        title: '约看时间',
        dataIndex: 'oTime',
        key: 'oTime',
        width: '30%',
        render: (text, record) => this.renderColumns(text, record, 'oTime'),
    },  {
        title: '操作',
        key: 'action',
        width: '40%',
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
