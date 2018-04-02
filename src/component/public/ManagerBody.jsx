import React from 'react';
import {Card, Table, Pagination} from 'antd';
import './style/tablebody.less'

export default class ManagerBody extends React.Component {
    columns = [{
        key: 'id',
        dataIndex: 'id',
        title: "Openid 号"
    }, {
        key: 'mecFlg',
        dataIndex: 'mecFlg',
        title: "商户标识"
    }, {
        key: 'ruleNames',
        dataIndex: 'ruleNames',
        title: "规则名称"
    }, {
        key: 'id2',
        dataIndex: 'id2',
        title: "执行类型"
    }, {
        key: 'id3',
        dataIndex: 'id3',
        title: "规则描述"
    }, {
        key: 'id4',
        dataIndex: 'id4',
        title: "控制点"
    }, {
        key: 'id5',
        dataIndex: 'id5',
        title: "风险类型"
    }, {
        key: 'id6',
        dataIndex: 'id6',
        title: "处罚方式"
    }, {
        key: 'id7',
        dataIndex: 'id7',
        title: "创建人"
    }, {
        key: 'id8',
        dataIndex: 'id8',
        title: "创建时间"
    }, {
        key: 'id9',
        dataIndex: 'id9',
        title: "备注"
    }, {
        key: 'id0',
        dataIndex: 'id0',
        title: "操作"
    }]

    changePage = (page) => {
        debugger;
        const {pageSize, changePage, searchData} = this.props;
        this.props.changePage(page);//子组件改变page时候通父组件
        const params = {
            pageNum: page,
            pageSize,
        }
        searchData(params)
    }


    render() {
        const {dataSource = [], columns, title, footer, pageNum, pageSize, total, changeSize, searchData} = this.props;
        return (
            <div style={{margin: '20px 10px'}}>
                <Card noHovering={true} className="limitable" bodyStyle={{padding: '0px'}}>
                    <Table
                        bordered = { false }
                        style = {{margin: '0 20px', }}
                        className="btl"
                        columns={columns}
                        dataSource={dataSource}
                        title={() => title}
                        footer={() => footer}
                        pagination={false}
                    />
                    <div style={{margin: 29, textAlign: 'right'}}>
                        <Pagination showSizeChanger
                                    onShowSizeChange={(current, size) => {
                                        changeSize(size);
                                        const params = {
                                            pageNum:parseInt(current) == 0? 1:current,
                                            pageSize: size,
                                        }
                                        searchData(params)
                                    }}
                                    current={parseInt(pageNum)}
                                    pageSize={parseInt(pageSize)}
                                    total={parseInt(total)}
                                    onChange={this.changePage}/>
                    </div>
                </Card>
            </div>
        )
    }
}