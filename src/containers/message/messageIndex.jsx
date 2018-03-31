import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {is, fromJS} from 'immutable';
//import axios from 'axios';
import {Bcrumb} from '../../component/bcrumb/bcrumb';
import { FetchAPI } from '../../utils/Axios';
import { Axios } from '../../utils/Axios';
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
        name: '鑫星家园',
        remark: '你们家的房子很好啊，可以带我去看看吗',
    }]
    columns = [{
        title: '房屋名称',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
    }, {
        title: '留言内容',
        dataIndex: 'remark',
        key: 'remark',
        width: '60%',
    },  {
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
    componentWillMount (){
      /*  const pName = '北京市'
        Axios.get('/queryProvince/queryByPname/北京市').then(function(reslut) {
           console.log("Axiosreslut:",reslut.data);
       })
*/
    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
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
                        dataSource={ this.mockData }
                    />
                </div>
            </div>
        );

    }
}

Main.contextTypes = {};

export default Main;