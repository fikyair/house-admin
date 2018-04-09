# react-antd
[![React Native](https://img.shields.io/badge/react-^15.3.2-brightgreen.svg?style=flat-square)](https://github.com/facebook/react)
[![Redux](https://img.shields.io/badge/redux-^4.4.5-yellowgreen.svg?style=flat-square)](https://github.com/reactjs/redux)
[![Redux Immutablejs](https://img.shields.io/badge/immutablejs-^0.0.8-orange.svg?style=flat-square)](https://github.com/indexiatech/redux-immutablejs)
[![Ant Design](https://img.shields.io/badge/ant--design-^2.7.2-yellowgreen.svg?style=flat-square)](https://github.com/ant-design/ant-design)


## 最新更新
>  webpack版本升级2，同时引入Yarn缓存下载的每个包以及happypack利用了多进程，同时还利用缓存来使得rebuild 更快等

>  Redux使用调整

> 路由模式更改为浏览器模式

## 前言
>  本工程主要基于react + redux + immutable + less + ES6/7 + webpack2.0 + fetch + react-router + antd(2.x)实现的爱家房屋后台管理系统。

>  如果觉得不错的话，请star一下吧 😊



### 下载

```
# git clone

git clone https://github.com/fikyair/house-admin

cd house-admin
```

### 安装
```bush

// 安装前请先确保已安装node和npm

// 安装成功后,再安装依赖，如果之前有用npm安装过，请先删掉node_modules
yarn install
```
### 运行
```bush
yarn run dev （开发版本，用于开发使用，热加载）
  
yarn run dist （发布生产版本，对代码进行混淆压缩，提取公共代码，分离css文件）
```

### 访问
在浏览器地址栏输入[http://127.0.0.1:8082](http://127.0.0.1:8082)

### 目标功能
- [x] 登录页面
- [x] 全站布局
- [x] 全站路由
- [ ] 对接接口，优化代码(冗余代码，不规则写法，界面样式)
- [ ] 后台系统常用场景会逐个完善

### 历史更新

  	1. 初始化项目目录;

  	2. webpack版本升级(webpack2.0)，并加上yarn，happypack等(最新迭代)；

  	3. 登录退出;

  	4. 整体布局;

  	5. 菜单映射路由(路由模式更改为浏览器模式);
    
# 性能优化

## 如何正确地在React中处理事件

[参考官网](https://facebook.github.io/react/docs/handling-events.html)