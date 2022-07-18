import request from '@/utils/request' //引入已经封装好的axios 和 拦截器

export default{

    //条件分页课程查询的方法
    getCourseList(page,limit,searchObj){
        return request({
            url: `/eduservice/coursefront/getFrontCourseList/${page}/${limit}`,
            method: 'post',
            data: searchObj
        })
    },
    //查询所有分类的方法
    getAllSubject(){
        return request({
            url: '/eduservice/edu-subject/getAllSubject',
            method: 'get'
        })
    },
    //课程详情的方法
    getCourseInfo(id){
        return request({
            url: '/eduservice/coursefront/getFrontCourseInfo/'+id,
            method: 'get'
        })
    }
}