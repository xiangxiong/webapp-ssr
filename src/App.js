import React,{Component} from 'react';
import Header from './components/Header/';
import {createWebSocket,closeConnection} from './common/Connection';
import {renderRoutes} from 'react-router-config';
import { actions } from './components/Header/store/'

class App extends Component{
    constructor(props){
        super();
        this.state = props;
    }
    
    render(){
        return (
            <div>
                <Header/>
                {renderRoutes(this.state.route.routes)}
            </div>
        )
    }
}

App.loadData = (store) =>{
   return store.dispatch(actions.getHeaderInfo());
}
export default App;