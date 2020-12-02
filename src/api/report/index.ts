import apiService from '../apiService.config';
import { AxiosResponse, AxiosError } from 'axios';

const api:{name:string, type:string, url:string, config?:object}[] = [
    {
        name: 'test',
        type: 'get',
        url: 'api/test/'
    }
]

const reportAPI:any = {};

api.forEach(el => {
    switch (el.type) {
        case 'post':
            reportAPI[el.name] = (function (name) {
                console.log(name);
                return function (params:object, callback:(res:AxiosResponse)=>any, errorback:(err:AxiosError)=>any) {
                    let url = el.url;
                    if (typeof (params) == "string") {
                        url = url + params
                    };
                    apiService.post(url, params, el.config).then(function (res:AxiosResponse) {
                        callback(res.data);
                    }).catch(function (err:AxiosError) {
                        errorback(err);
                    })
                }
            }(el.name));
            break;
        case 'delete':
            reportAPI[el.name] = (function (name) {
                console.log(name);
                return function (params:any, callback:any, errorback:any) {
                    apiService.delete(el.url, {
                        params: params
                    }).then(function (res:any) {
                        callback(res.data);
                    }).catch(function (err:any) {
                        errorback(err);
                    })
                }
            }(el.name));
            break;
        case 'patch':
            reportAPI[el.name] = (function (name) {
                console.log(name);
                return function (params:any, callback:any, errorback:any) {
                    apiService.patch(el.url, params).then(function (res:any) {
                        callback(res.data);
                    }).catch(function (err:any) {
                        errorback(err);
                    })
                }
            }(el.name));
            break;
        case 'get':
            reportAPI[el.name] = (function (name) {
                console.log(name);
                return function (params:object, callback:(res:AxiosResponse)=>any, errorback:(err:AxiosError)=>any) {
                    apiService.get(el.url, {
                        params: params
                    }).then(function (res:AxiosResponse) {
                        // console.log(el.url);
                        callback(res.data);
                    }).catch(function (err:AxiosError) {
                        errorback(err);
                    })
                }
            }(el.name));
            break;
        default:
            break;
    }
});

export default reportAPI;