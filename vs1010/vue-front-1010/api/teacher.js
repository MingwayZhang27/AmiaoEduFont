import request from '@/utils/request' //引入已经封装好的axios 和 拦截器

export default{

    //分页讲师查询的方法
    getTeacherList(page,limit){
        return request({
            url: `/eduservice/teacherfront/getTeacherFrontList/${page}/${limit}`,
            method: 'post'
        })
    },
    //讲师详情的方法
    getTeacherInfo(id){
        return request({
            url: '/eduservice/teacherfront/getTeacherFrontInfo/'+id,
            method: 'get'
        })
    }
}