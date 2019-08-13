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