import React,{Component} from 'react';
import {connect} from 'react-redux';
import {getHomeList} from './store/actions';
import styles from  './style.css';
import withStyle from '../../withStyle';

class Home extends Component{
    // componentWillMount(){
    //     if(this.props.staticContext){
    //         // console.log("styles._getCss()",styles._getCss());
    //         this.props.staticContext.css.push(styles._getCss());
    //     }
    // }

    getList(){
        const {list} = this.props;
        return list==null? "" : list.map((item,i)=> <div key={i}>{item.title} </div>)
    }

    render(){
        return (
            <div className={styles.test}>
                {this.getList()}
                {/* {
                    this.props.list.map((item)=>{
                        return <div key={item.id}>{item.title}</div>
                    })
                } */}
                {/* <div>this is {this.props.name}</div> */}
            </div>
        )
    }

    componentDidMount(){
        if(this.props.list && !this.props.list.length){
            this.props.getHomeList();
        }
    }
}

Home.loadData = (store) =>{
    // 这个函数，负责在服务器端渲染之前，把这个路由需要的数据提前加载好.
    // 返回promise 对象.
   return store.dispatch(getHomeList());
}

const mapStateToProps = state => ({
    list: state.home.newsList
    //  name:state.home.name
});

const mapDispatchToProps = dispatch =>({
    getHomeList(){
        dispatch(getHomeList())
    }
});

// const ExportHome = 

// ExportHome.loadData = (store) =>{
//     // 这个函数，负责在服务器端渲染之前，把这个路由需要的数据提前加载好.
//    return store.dispatch(getHomeList());
// }


export default connect(mapStateToProps,mapDispatchToProps)(withStyle(Home,styles));