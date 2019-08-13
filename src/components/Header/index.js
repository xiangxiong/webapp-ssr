import React,{Fragment,Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {actions,login,loginOut} from './store/actions';
import styles from './style.css';
import WithStyle from '../../withStyle';

class Header extends Component{

    constructor(){
        super();
    }

    componentWillMount(){
        if(this.props.staticContext){
            this.props.staticContext.css.push(styles._getCss());
        }
    }

    render(){
        const { login , handleLogin,handleLoginOut } = this.props;

        return (
            <div className={styles.test1}>
                <Link to='/'>首页</Link>
                <br/>
                {
                    login ? <Fragment>
                           <Link to='/translation'>翻译列表</Link>
                           <br/>
                             <div onClick={handleLoginOut}>退出</div>
                    </Fragment> : <div onClick={handleLogin}>登录</div>
                }
            </div>
        )
    }
}

const mapState = (state) =>({
    login:state.header.login
});

const mapDispatch = (dispatch) => ({
    handleLogin(){
        dispatch(login());
    },
    handleLoginOut(){
        dispatch(loginOut());
    }
}); 

// 实际上是一个高阶组件.
export default connect(mapState,mapDispatch)(Header);