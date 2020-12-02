import axios from 'axios';
const {withRouter} = require('react-router-dom');
const Axios = axios.create();

Axios.defaults.timeout = 10000;
Axios.defaults.baseURL = 'https://portal.it/';
// Axios.defaults.baseURL = 'https://swapi.dev/';
Axios.defaults.responseType = "json";

Axios.interceptors.request.use(
    config => {
        // if (config.url!=='api/login/' && config.url!=='api/sms/'){
        //     if (window.localStorage.getItem('token')){
        //         config.headers.Authorization = `JWT ${window.localStorage.getItem('token')}`;
        //     }else {
        //         alert('登陆信息过期或无效，请重新登陆');
        //         window.location.href = '/';
        //     }
        // }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
Axios.interceptors.response.use(
    res => {
        if (res.status >= 200 && res.status < 300){
            return res;
        }else {

        };
        return res;
    },
    err => {
        // console.log('err', err);
        if (err.response.status===401){
            alert('登陆信息过期或无效，请重新登陆');
            window.location.href = '/login';
            window.localStorage.clear();
        }
        return Promise.reject(err);
    }
)

export default withRouter(Axios);