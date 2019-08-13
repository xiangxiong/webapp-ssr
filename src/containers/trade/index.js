import React,{Component} from 'react';
import Header from '../../components/Header';
import {createWebSocket,closeConnection} from './../../common/Connection';

class Trade extends Component{

    constructor(){
        super();
        this.state ={
            isOpen:false
        }
    }

    handleConnection(){
        if(this.state.isOpen){
            closeConnection();
            this.setState({
                isOpen:false
            })
        }else{
            createWebSocket();
            this.setState({
                isOpen:true
            })
        }
    }

    render(){
        return (
            <div>
                {/* <Header/> */}
                <div>
                     <button onClick={this.handleConnection.bind(this)}>
                      { this.state.isOpen ? "关闭" : "连接WS" }
                     </button>
                </div>
            </div>
        )
    }
}

// const Trade = () =>{
//     return (
//         <div>
//             <Header/>
//             <div>
//                  <button onClick={()=>{alert('click!')}}>连接WS</button>
//             </div>
//         </div>
//     )
// }

export default Trade;