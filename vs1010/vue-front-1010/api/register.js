import request from '@/utils/request' //引入已经封装好的axios 和 拦截器

export default{
    //根据手机号发验证码
    sendCode(mobile) {
        return request({
          url: '/edumsm/msm/send/'+mobile,
          method: 'get'
        })
    },
    //注册的方法
    registerMember(formItem){
        return request({
            url: '/educenter/member/register',
            method: 'post',
            data:formItem
        })
    }
}