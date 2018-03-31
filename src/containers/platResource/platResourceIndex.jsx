import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
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
        name: '新新家园',
        type: '一室两厅',
        habitable: '朝南',
        price: '1200元',
        area: '北京市石景山区',
        street: '实行大街',
        age: '5年',
        details: '家具一应俱全',
        require: '希望你热爱干净',
    }]
    columns = [{
        title: '房屋名称',
        dataIndex: 'name',
        key: 'name',
        width: '10%',
    }, {
        title: '房屋类型',
        dataIndex: 'type',
        key: 'type',
        width: '10%',
    }, {
        title: '房屋朝向',
        dataIndex: 'habitable',
        key: 'habitable',
        width: '10%',
    }, {
        title: '房屋价格',
        dataIndex: 'price',
        key: 'price',
        width: '10%',
    }, {
        title: '所在地区',
        dataIndex: 'area',
        key: 'area',
        width: '10%',
    }, {
        title: '所在街道',
        dataIndex: 'street',
        key: 'street',
        width: '10%',
    }, {
        title: '房龄',
        dataIndex: 'age',
        key: 'age',
        width: '10%',
    },  {
        title: '房屋描述',
        dataIndex: 'details',
        key: 'details',
        width: '10%',
    },{
        title: '要求',
        dataIndex: 'require',
        key: 'require',
        width: '10%',
    },{
            title: '操作',
            key: 'action',
            width: '10%',
            render: (text, record) => (
                <span>
              <a href=''>编辑</a>
                 <span className="ant-divider"/>
                <a href=''>删除</a>
            </span>
            )
        }
];
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    render() {
        return (
            <div>
                <div>
                    <Bcrumb title="房源信息管理" icon="home"/>
                    <ManagerBody
                        title={ <span style={{fontSize: 13, fontWeight: 400}}> 房源信息表 </span> }
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