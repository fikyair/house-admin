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

//新闻页面
const news = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/news/newsIndex').default)
    }, 'news');
}

// 房源页面
const platResource = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/platResource/platResourceIndex').default)
    }, 'platResource');
}

// 房源审核
const platIssue = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/platResource/platIssueIndex').default)
    }, 'platIssue');
}

// 房源增加页面
const platAdd = (location, cb) => {
   require.ensure([], require => {
	   cb(null, require('../containers/platResource/platAdd').default)
   }, 'platAdd')
}

//房源详情页面
const platDetails = (location, cb) => {
	require.ensure([], require => {
		cb(null, require('../containers/platResource/platDetails').default)
	}, 'platDetails')
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

//订单管理
const order = (location, cb) => {
    require.ensure([],require => {
        cb(null, require('../containers/order/orderIndex').default)
    }, 'order');
}

//约看管理
const assumpsit = (location, cb) => {
	require.ensure([], require => {
		cb(null, require('../containers/assumpit/assumpitIndex').default)
	}, 'assumpsit')
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
// 登录
// const login = (location, cb) => {
//     require.ensure([], require => {
//         cb(null, require('../containers/login/login').default)
//     }, 'login')
// }ssd

const RouteConfig = (
	<Router history={browserHistory}>
		<Route path="/home" component={layout} >
			<IndexRoute getComponent={home} /> // 默认加载的组件，比如访问www.test.com,会自动跳转到www.test.com/home
			<Route path="/home" getComponent={home} />
            <Route path="/user" getComponent={user}/>
			<Route path="/news" getComponent={news} />
			<Route path="/region" getComponent={region} />
			<Route path="/message" getComponent={message}  />
			<Route path="/plat/platResource" getComponent={platResource}/>
			<Route path="/plat/platIssue" getComponent={platIssue} />
			<Route path="/user/userAdd" getComponent={userAdd}/>
			<Route path="/platResource/platAdd" getComponent={platAdd} />
			<Route path="/platResource/platDetails/:id" getComponent={platDetails} />
			<Route path="/order" getComponent={order} />
			<Route path="/assumpsit" getComponent={assumpsit} />
			<Route path="/uis" getComponent={order} onEnter={requireAuth} />
		</Route>
		<Route path="/login" component={Roots}> // 所有的访问，都跳转到Roots
			<IndexRoute component={login} /> // 默认加载的组件，比如访问www.test.com,会自动跳转到www.test.com/home
		</Route>
		<Redirect from="*" to="/home" />
	</Router>
);

export default RouteConfig;
