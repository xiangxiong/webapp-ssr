import express from 'express';
import proxy from 'express-http-proxy';
import { render } from './utils';
import { matchRoutes } from 'react-router-config'
const app = express();
import {getStore}  from '../store';
import routes from '../Routes';

// 静态文件中间件.
app.use(express.static('public'));

app.use('/api',proxy('http://47.95.113.63', {
  proxyReqPathResolver: function (req) {
    return '/ssr/api'+req.url;
    // console.log(req.url);
    // var parts = req.url.split('?');
    // var queryString = parts[1];
    // var updatedPath = parts[0].replace(/test/, 'tent');
    // return updatedPath + (queryString ? '?' + queryString : '');
  }
}));

app.get('*', function (req, res){
  const store = getStore(req);

  // 根据路由的路径，来往store里面加数据.
  // 让matchRoutes 里面的所有组件，对应的LoadData方法执行一次.
   const matchedRoutes =  matchRoutes(routes,req.path);
   const promises = [];

   matchedRoutes.forEach(item=>{
    if(item.route.loadData){
        const primise = new Promise((resolve,reject)=>{
           item.route.loadData(store).then(resolve).catch(resolve)
        });
        promises.push(primise)
    }
   });

   Promise.all(promises).then(()=>{
     const context = { css:[] };
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
   })
});

var server = app.listen(3000);