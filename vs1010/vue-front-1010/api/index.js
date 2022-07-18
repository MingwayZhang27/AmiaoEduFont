import request from '@/utils/request' //引入已经封装好的axios 和 拦截器

export default{
    //查询热门课程和名师
    getIndexData() {
        return request({
          url: '/eduservice/indexfront/index',
          method: 'get'
        })
    }
}