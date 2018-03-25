import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {is, fromJS} from 'immutable';
//import axios from 'axios';
import {Bcrumb} from '../../component/bcrumb/bcrumb';
import { FetchAPI } from '../../utils/Axios';
import { Axios } from '../../utils/Axios';

/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount (){
        const pName = '北京市'
        Axios.get('/queryProvince/queryByPname/北京市').then(function(response) {
           console.log("Axiosreslut:",response);
       })

    }
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    render() {
        return (
            <div>
                <div>
                    <Bcrumb title="留言信息管理" icon="setting"/>
                    留言信息管理
                </div>
            </div>
        );

    }
}

Main.contextTypes = {};

export default Main;