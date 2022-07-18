import request from '@/utils/request' //引入已经封装好的axios 和 拦截器

export default{

    //登陆的方法
    submitLogin(userInfo){
        return request({
            url: '/educenter/member/login',
            method: 'post',
            data:userInfo
        })
    },
    //根据token获取用户信息
    getLoginUserInfo(){
        return request({
            url: '/educenter/member/getMemberInfo',
            method: 'get',
        })
    }
}