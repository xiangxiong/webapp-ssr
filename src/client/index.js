import React from 'react';
import {hydrate} from 'react-dom';
import {BrowserRouter,Route} from 'react-router-dom';
import routes from '../Routes';
// import store from '../store';
import {getStore,getClientStore} from '../store';
import { Provider } from 'react-redux';
import {renderRoutes} from 'react-router-config';

// import { createStore,applyMiddleware } from 'redux';
// import thunk from 'react-thunk';
// const reducer = (state = {name:'dll'},action)=>{
//     return state;
// }
// const store = createStore(reducer);

const store = getClientStore();

const App = ()=>{
    return (
        <Provider store={store}>
            <BrowserRouter>
            {/* {Routers} */}
            <div>
                {/* {
                    routes.map(route => (
                    <Route {...route}/>
                    ))
                } */}
                {
                    renderRoutes(routes)
                }
            </div>
            </BrowserRouter>
        </Provider>
    )
}

hydrate(<App/>,document.getElementById('root'));