import React, {Component, PropTypes} from 'react'; // 引入了React和PropTypes
import {connect} from 'react-redux';
import {is, fromJS} from 'immutable';
import {Bcrumb} from '../../component/bcrumb/bcrumb';

/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    render() {
        return (
            <div>
                <div>
                    <Bcrumb title="房源信息管理" icon="setting"/>
                    房源信息管理
                </div>
            </div>
        );

    }
}

Main.contextTypes = {};

export default Main;