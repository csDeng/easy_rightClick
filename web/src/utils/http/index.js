import axios from 'axios';


const $axios = axios.create({
    baseURL:'http://127.0.0.1:8080'
})

$axios.interceptors.request.use(config=>{
    config.headers['Content-Type'] = 'application/json; charset=utf-8'
    return config
})

export default $axios