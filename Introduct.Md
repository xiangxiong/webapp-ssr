# 1、技术栈
-. React + Redux + SSR.

-. 测试框架: 
mocha + enzyme

# 2、项目启动
```
npm run dev  启动项目.
```

## 1、什么是服务端渲染. SSR
页面上的内容在服务器上已经生成了.
``` 
var express = require('express')
var app = express()
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send(`<html>
    <head>
        <title>hello</title>
    </head>
    <body>
        <h1>first lesson</h1>
    </body>
  </html>`)
});
var server = app.listen(3000);

``` 
- 1.4 React 客户端渲染的优势和弊端.
-. SSR 首屏加载很快.
-. CSR SEO效果非常不好.

## 2、什么是客户端渲染. CSR.
页面使用JS来渲染出来的.
-. 2.1 在服务器端编写React 组件.
-. 服务器端渲染的流程: 浏览器发送请求，服务器运行React代码生成页面. 下载html代码.

- 2.2 服务器端webpack 的配置.
- 2.3 实现服务器组件渲染.
- 2.4 建立在虚拟DOM的服务器渲染.

使用场景:
// 客户端渲染
// react 代码在浏览器上执行,消耗的是用户浏览器的性能.（js比对.）

// 服务器端渲染
// react 代码在服务器上执行, 消耗的是服务器端的性能.
// seo 优化.

- 2.5 Webpack 的自动打包与服务器自动重启.
```
"dev:start": "nodemon --watch build --exec node \"./build/bundle.js\"",
"dev:build": "webpack --config webpack.server.js --watch"
```

- 2.6 使用npm -run all 提升开发效率.
```
"dev":"npm-run-all --parallel dev:**",
"dev:start": "nodemon --watch build --exec node \"./build/bundle.js\"",
"dev:build": "webpack --config webpack.server.js --watch"
```

### 3.1 什么是同构.
-.  3.1 什么是同构.
// 同构的概念:在一套react代码，在服务器执行一次，再客户端执行一次.

-. 3.2 在浏览器上执行一段 JS 代码.
// 静态文件中间件.
app.use(express.static('public'));

- 3.3 让 React 代码在浏览器上运行
``` webpack.client.js
const path = require('path');
module.exports ={
    entry:'./src/client/index.js',
    output:{
        filename:'index.js',
        path:path.resolve(__dirname,'public')
    },
    module:{
        rules:[{
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'stage-0',['env',{
                    targets:{
                        browsers:['last 2 versions']
                    }
                }]]
            }
        }]
    }
}
```

- 3.4 工程代码优化整理
-. 增加webpack.base.js 将webpack公用的代码合并.
-. 引入webpack-merge 模块.
``` 
const path = require('path');
const merge = require('webpack-merge');
const config = require('./webpack.base.js');

const clientConfig = {
    entry:'./src/client/index.js',
    output:{
        filename:'index.js',
        path:path.resolve(__dirname,'public')
    }
}

module.exports = merge(config,clientConfig);

```
## 3.5 阶段总结
同构的流程
1、服务器端运行react代码渲染出html
2、发送HTML给浏览器.
3、浏览器接收到内容展示.
4、浏览器加载js.
5、js中的React代码在浏览器端重新执行.
6、JS中的react代码接管页面操作。


## 4、服务器端渲染中的路由
StaticRouter  服务端路由

Route 客户端路由

服务端路由如何与客户端路由同步切换:
```
app.get('/', function (req, res){
  const content = renderToString((
    <StaticRouter location={req.path} context={{}}>
     {Routes}
    </StaticRouter>
  ));

  res.send(`<html>
      <head>
         <title>ssr</title>
      </head>
      <body>
      <div id="root"><div>${content}</div></div>
       </body>
     </html>
     <script src='./index.js'></script>`)
});
```

# 4-2 多页面路由跳转.
注意：前端路由要和后端路由要保持一致.

# 4-3  使用Link标签串联起整个路由流程.
服务器端渲染，只会发生在我们页面第一次进入的时候.
只会完全走的是客户端的路由了. 
服务器端渲染并不是每个页面多去做服务器端渲染.
你访问的第一个页面具有服务器端渲染.其他的页面还是react 的
路由机制.

# 5-1 我们常常听说的中间层是什么？
Web.
Node Server . (只负责瓶装给用户展示的页面).
Java Server . （专注于数据的获取和计算就可以了）
服务器渲染，比较消化服务器的资源，我们可以增加node
server 的数量来解决负载的瓶颈.
前端不仅要关注前端的代码，还要关注NodeServer 上的代码了.
还要node服务器器的稳定.

没搞清楚. 这个没太听清楚.

# 5-2 同构项目中引入 Redux
客户端和Server 端多需要应用redux.

# 5-3创建 Store 代码的复用
const getStore = () =>{
    return createStore(reducer,applyMiddleware(thunk));
}
// const store = createStore(reducer);

export default getStore;

# 5-4 构建 Redux 代码结构
构建Redux代码结构(1)
构建Redux代码结构(2)
现在看到的列表是客户端渲染出来的，不是服务器端渲染出来的.

# 5-6 如果获取最新的secret 值.

# 5-7 流程回顾及问题分析.

# 流程回顾及问题分析
1、服务器接收参数，这个时候store是空的.
2、服务器端不会执行componentDidMount,所以列表数据为空.
3、客户端代码运行.这个时候store依然是空的.
4、客户端执行 componentDidMount ,列表数据被获取.
5、store 中的列表数据被更新.
6、客户端渲染出store中list数据对应的列表内容.

如何让服务器端执行componetDidMount?

异步数据服务器渲染: loadData方法及路由重构.
1、
   // 如果在这里,我能够拿到异步数据,并填充到Store中.
    // store 里面到底填充什么,我们不知道，我们需要结合当前用户请求地址
    // 和路由做判断.
    // 如果用户范围/ 根路径，我们就拿Home组件的异步数据.
    // 如果用户访问login路径, 我们就拿login组件的异步数据.
    // 根据路由的路径，来网store里面加数据.

    // routes.some(route => {
    //     // use `matchPath` here
    //     const match = matchPath(req.path, route);
    //     if(match){
    //         matchRoutes.push(route);
    //     }
    // });


5-8、 异步数据服务器渲染：loadData方法及路由重构.

5-9、 Favicon 及多级路由问题的处理.
https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
解决多级路由的问题.

-. 5-10 服务器端渲染获取数据.


-. 5-11 数据的脱水和注水.
解决数据抖动的问题.

## 6-1 使用proxy代理，让中间层承担数据获取职责.

express-http-proxy 中间件.
https://github.com/villadora/express-http-proxy
让所有的数据访问全部去使用nodeJs 去访问而不是直接调用API接口.

-. 6-2 服务器端请求和客户端请求的不同处理
    let url = '';
    if(server){
        url = 'http://47.95.113.63/ssr/api/news.json?secret=D37msjPeC3';
    }else{
        url = '/api/news.json?secret=D37msjPeC3';
    }
Home.loadData = (store) =>{
    // 这个函数，负责在服务器端渲染之前，把这个路由需要的数据提前加载好.

   return store.dispatch(getHomeList(true));
}

-. 6-3  axios中instance的使用
    const request = server ? serverAxios : clientAxios;

    return (dispatch)=>{
        return request.get('/api/news.json?secret=D37msjPeC3')
        .then((res)=>{
            const list = res.data.data;
            dispatch(changeList(list))
        });
        
-. 6-4 redux-thunk中的withExtraArgument.

-. 6-5 renderRoutes 方法实现对多级路由的支持.
``` js
 <div>
 <Header/>
  {renderRoutes(this.state.route.routes)}
 </div>

import {renderRoutes} from 'react-router-config';
<div>
    {
        renderRoutes(routes)
    }
</div>

export default [{
  path:'/',
  component:App,
  routes:[
    { 
      path: '/',
      component: Home,
      exact:true,
      loadData: Home.loadData,
      key:'home'
    },{
       path: '/trade',
       component: Trade,
       exact:true,
       key:'trade'
    }
  ]
}];
```

6-6 . 制作登录
``` js
import reducer  from './reducer';
export {reducer}

App.loadData = (store) =>{
    store.dispatch(actions.getHeaderInfo());
}

export const getHeaderInfo = ()=>{
    return (dispatch,getState,axiosInstance)=>{
        return axiosInstance.get('/api/isLogin.json?secret=D37msjPeC3')
        .then((res)=>{
            dispatch(changeLogin(res.data.data.login))
        });
    }
};

```
### 6-8 登录状态切换
1、刚进入页面，处于非登录状态.
2、用户点击登录按钮，进行登录操作.
 (1). 浏览器发请求到NODEJS 服务器.
 (2). 转发给api服务器,进行登录.
 (3).api服务器生成cookie。
 (4).浏览器上存在cookie，登录成功.
3. 当用户重新刷新页面的时候.
 (1). 浏览器去请求html.(携带了cookie)
 (2). NodeJs 服务器进行服务器端渲染.
 (3). 进行服务器渲染，首先要去api服务器取数据（没有携带cookie）.

### 6-9 解决登陆 cookie 传递问题. 
1.

### 6-10 翻译列表页面制作.
1.

### 7 1.1 secret统一管理
```
import axios from 'axios';

const instance = axios.create({
    baseURL:'/',
    params:{
        secret:'D37msjPeC3'
    }
})
export default instance;

引入 config.js 文件.
export default {
    secret: 'D37msjPeC3'
}
```

### 7.2  context 实现404页面功能

```
class NotFound extends Component{
    
    componentWillMount(){
        const {staticContext} = this.props;
        staticContext&& (staticContext.NOT_FOUND = true);
    }
    
    render(){
        return <div>404,sorry ,Not Page</div>
    }
}

const context = {};
const html = render(store,routes,req,context);
if(context.NOT_FOUND){
res.status(404);
res.send(html);
}else{
res.status(200);
res.send(html);
}

```

### 7.3 实现服务器端301重定向.
```
 Promise.all(promises).then(()=>{
     const context = {};
     const html = render(store,routes,req,context);
     if(context.action === 'REPLACE'){
       res.redirect(301,context.url);
     }else if(context.NOT_FOUND){
       res.status(404);
       res.send(html);
     }else{
      res.status(200);
      res.send(html);
     }
   });
```

### 7.4 数据请求失败情况下 promise 的处理
   // 一个页面要加载A,B,C,D四个组件. 这四个组件多要加载数据.
   // 假设A组件加载数据错误.
   // B,C,D 组件有几种情况.
   // 1. B,C,D 组件数据已经完成了.
   // 2.假设B,C,D接口数据比较慢, B,C,D组件数据没有加载完成.
   // promise = [a,b,c,d]
```
   matchedRoutes.forEach(item=>{
    if(item.route.loadData){
        const primise = new Promise((resolve,reject)=>{
           item.route.loadData(store).then(resolve).catch(resolve)
        });
        promises.push(primise)
    }
   });
```

### 8-1 如何支持 CSS 样式修饰.
```
客户端样式处理
    module:{
        rules:[{
            test:/\.css?$/,
            use:['style-loader',{
                loader:'css-loader',
                options:{
                    importLoaders:1,
                    modules:true,
                    localIdentName:'[name]_[local]_[hash：base64:5]'
                }
            }]
        }]
    }

服务器端样式处理
module:{
        rules:[{
            test:/\.css?$/,
            use:['isomorphic-style-loader',{
                loader:'css-loader',
                options:{
                    importLoaders:1,
                    modules:true,
                    localIdentName:'[name]_[local]_[hash：base64:5]'
                }
            }]
        }]
    }
```

### 8-2 如何实现CSS样式的服务器端渲染.
样式抖动的问题.
isomorphic-style-loader 与 style-loader 区别.
```
     if(this.props.staticContext){
            this.props.staticContext.css = styles._getCss();
        }
const cssStr = context.css ? context.css:'';

     return `<html>
     <head>
         <title>ssr</title>
         <style>${cssStr}</style>
     </head>
     <body>
     <div id="root">${content}</div>
     <script>
     window.context = {
         state:${JSON.stringify(store.getState())}
     }
     </script>
     </body>
     </html>
     <script src='/index.js'></script>
     `;
```

### 8-3 多组件中的样式如何整合
```
const context = { css:[] };

const cssStr = context.css.length ? context.css.join('\n') : '';

    componentWillMount(){
        if(this.props.staticContext){
            this.props.staticContext.css.push(styles._getCss());
        }
    }

```

### 8-4 LoadData 方法潜在问题的修正

``` js
const ExportTranslation = connect(mapStateToProps,mapDispatchToProps)(Translation);

ExportTranslation.loadData = (store) =>{
    return store.dispatch(getTranslationList())
}

export default ExportTranslation;
```

### 8-5 使用高阶组件精简代码
```
import React,{Component} from 'react';
// 这个函数，返回一个组件
// 这个函数，是生成高阶组件的函数.
export default (DecoratedComponent,styles)=>{
    // 返回的组件，叫高阶组件
    return class NewComponent extends Component{

        componentWillMount(){
            if(this.props.staticContext){
                this.props.staticContext.css.push(styles._getCss());
            }
        }

        render(){
            return <DecoratedComponent {...this.props}/>
        }
    }
}
```















































