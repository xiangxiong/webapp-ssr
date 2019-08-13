import React from 'react';
import { renderToString } from 'react-dom/server';
import {StaticRouter,Route} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import { Provider } from 'react-redux';

export const render = (store,routes,req,context)=>{
    const content = renderToString((
        <Provider store={store}>
            <StaticRouter location={req.path} context={context}>
            <div>
            {/* {
                routes.map(route => (
                 <Route {...route}/>
                ))
            } */}
            {renderRoutes(routes)}
            </div>
            </StaticRouter>
        </Provider>
     ));

     const cssStr = context.css.length ? context.css.join('\n') : '';

    //  console.log("cssStr",cssStr);
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
}