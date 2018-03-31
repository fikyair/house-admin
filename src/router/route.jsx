/**
* 疑惑一：
* React createClass 和 extends React.Component 有什么区别?
* 之前写法：
* let app = React.createClass({
*  	getInitialState: function(){
*    	// some thing
*  	}
*  })
* ES6写法(通过es6类的继承实现时state的初始化要在constructor中声明)：
* class exampleComponent extends React.Component {
*    constructor(props) {
*        super(props);
*        this.state = {example: 'example'}
*    }
* }
*/

import React, {Component, PropTypes} from 'react'; // react核心
import { Router, Route, Redirect, IndexRoute, browserHistory, hashHistory } from 'react-router'; // 创建route所需
import Config from '../config/index';
import layout from '../component/layout/layout'; // 布局界面

import login from '../containers/login/login'; // 登录界面

/**
 * (路由根目录组件，显示当前符合条件的组件)
 * 
 * @class Roots
 * @extends {Component}
 */
class Roots extends Component {
	render() {
		// 这个组件是一个包裹组件，所有的路由跳转的页面都会以this.props.children的形式加载到本组件下
		return (
			<div>{this.props.children}</div>
		);
	}
}

// const history = process.env.NODE_ENV !== 'production' ? browserHistory : hashHistory;

// 快速入门
const home = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/home/homeIndex').default)
    }, 'home');
}

// 用户管理
const user = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/user/userIndex').default)
    }, 'user');
}

// 用户增加页面
const userAdd = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/user/userAdd').default)
    }, 'userAdd');
}

// 系统设置
const platResource = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/platResource/platResourceIndex').default)
    }, 'platResource');
}

// 地域管理
const region = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/region/regionIndex').default)
    }, 'region');
}
//留言管理
const message = (location, cb) => {
	require.ensure([],require => {
        cb(null, require('../containers/message/messageIndex').default)
    }, 'message');
}
// 组件一
const oneui = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/ui/oneIndex').default)
    }, 'oneui');
}

// 组件二
const twoui = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/ui/twoIndex').default)
    }, 'twoui');
}

// 登录验证
const requireAuth = (nextState, replace) => {
	let token = (new Date()).getTime() - Config.localItem('USER_AUTHORIZATION');
	if(token > 7200000) { // 模拟Token保存2个小时
		replace({
			pathname: '/login',
			state: { nextPathname: nextState.location.pathname }
		});
	}
}

const RouteConfig = (
	<Router history={browserHistory}>
		<Route path="/home" component={layout} >
			<IndexRoute getComponent={home} /> // 默认加载的组件，比如访问www.test.com,会自动跳转到www.test.com/home
			<Route path="/home" getComponent={home}  />
            <Route path="/user" getComponent={user}/>
			<Route path="/platResource" getComponent={platResource} />
			<Route path="/region" getComponent={region} />
			<Route path="/message" getComponent={message}  />
			<Route path="/ui/oneui" getComponent={oneui}/>
			<Route path="/ui/twoui" getComponent={twoui} />
			<Route path="/user/userAdd" getComponent={userAdd}/>
			{/*<Route path="/ui/twoui" getComponent={twoui} onEnter={requireAuth} />*/}
		</Route>
		<Route path="/login" component={Roots}> // 所有的访问，都跳转到Roots
			<IndexRoute component={login} /> // 默认加载的组件，比如访问www.test.com,会自动跳转到www.test.com/home
		</Route>
		<Redirect from="*" to="/home" />
	</Router>
);

export default RouteConfig;
