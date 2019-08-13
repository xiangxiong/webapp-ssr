import React from 'react';
import {Route} from 'react-router-dom';
import Home from './containers/home';
import App from './App';
import Trade from './containers/trade';
import Translation from './containers/translation';
import NotFound from './containers/notfound/'

export default [{
  path:'/',
  component: App,
  loadData: App.loadData,
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
    },{
      path: '/translation',
      component: Translation,
      loadData: Translation.loadData,
      exact:true,
      key:'translation'
   },{
       component: NotFound,
     }
  ]
}];
// export default (
//     <div>
//         <Route path='/' exact component={Home}></Route>
//         <Route path='/trade' exact component={Trade}></Route>
//     </div>
// )