import axios from "../axios";

export class Basic {
    /**
     * 登录
     * @param {*} data
     */
    static async(data) {
        return axios({
            url: '/base-service/login',
            method: 'post',
            data
        })
    }


    /**
     * 获取登录用户信息
     */
    static async WebGLActiveInfo() {
        return axios({
            url: '/base-service/user-info',
            method: 'get'
        })
    }
}


