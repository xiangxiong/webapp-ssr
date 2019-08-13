import  {CHANGE_LOGIN} from './constants';

const changeLogin = (value)=>({
    type:CHANGE_LOGIN,
    value
});

export const login = ()=>{
    return (dispatch,getState,axiosInstance)=>{
        return axiosInstance.get('/api/login.json')
        .then((res)=>{
            dispatch(changeLogin(true));
        });
    }
};

export const loginOut = ()=>{
    return (dispatch,getState,axiosInstance)=>{
        return axiosInstance.get('/api/logout.json')
        .then((res)=>{
            dispatch(changeLogin(false));
        });
    }
};

export const getHeaderInfo = ()=>{
    return (dispatch,getState,axiosInstance)=>{
        return axiosInstance.get('/api/isLogin.json?secret=D37msjPeC3')
        .then((res)=>{
            dispatch(changeLogin(res.data.data.login))
        });
    }
};