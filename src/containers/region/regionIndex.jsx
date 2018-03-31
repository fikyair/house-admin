import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {connect} from 'react-redux';
import {is, fromJS} from 'immutable';
import {Bcrumb} from '../../component/bcrumb/bcrumb';
import ManagerBody from "../../component/public/ManagerBody";

/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNum: 1,
            pageSize: 10,
            total: 1,
        };
    }
    mockData = [{
        province: '北京市',
        city: '石景山区',
        street: '实行大街',
    }]
    columns = [{
        title: '省份',
        dataIndex: 'province',
        key: 'province',
        width: '30%',
    }, {
        title: '市区',
        dataIndex: 'city',
        key: 'city',
        width: '30%',
    }, {
        title: '街道',
        dataIndex: 'street',
        key: 'street',
        width: '30%',
    },  {
        title: '操作',
        key: 'action',
        width: '30%',
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
        return (
            <div>
                <div>
                    <Bcrumb title="地域信息管理" icon="environment-o"/>
                    <ManagerBody
                        title={ <span style={{fontSize: 13, fontWeight: 400}}> 地域信息表 </span> }
                        pageNum={ this.state.pageNum }
                        pageSize={this.state.pageSize }
                        total={ this.state.total }
                        columns={ this.columns }
                        dataSource={ this.mockData }
                    />
                </div>
            </div>
        );
    }
}

Main.contextTypes = {};

export default Main;
