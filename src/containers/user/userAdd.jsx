import React, { Component } from 'react';
import {Bcrumb} from "../../component/bcrumb/bcrumb";

class userAdd extends Component {

    render () {
        return(
            <div className="user-container">
                <Bcrumb title="添加账号" icon="usergroup-add"/>
                这里是增加哦
            </div>
        )
    }

}

userAdd.contextTypes = {};

export default userAdd;
