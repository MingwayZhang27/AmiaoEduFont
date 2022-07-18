import request from '@/utils/request'

export default{

    //1.课程课程信息
    addCourseInfo(courseInfo){
        return request({
            url: `/eduservice/edu-course/addCourseInfo`,
            method: 'post',
            data:courseInfo
          })
    },
    //2.查询所有讲师
    getAllTeacher(){
        return request({
            url: `/eduservice/edu-teacher/findAll`,
            method: 'get',
            })
    },

    //根据课程id查询课程基本信息
    getCourseInfoId(id){
        return request({
            url: `/eduservice/edu-course/getCourseInfo/`+id,
            method: 'get',
            })
    },
    //修改课程信息
    updateCourseInfo(courseInfo){
        return request({
            url: `/eduservice/edu-course/updateCourseInfo/`,
            method: 'post',
            data: courseInfo
            })
    },
    //课程确认信息显示
    getPublishCourseInfo(id){
        return request({
            url: `/eduservice/edu-course/getPublishCourseInfo/`+id,
            method: 'get',
            })
    },
    //课程最终发布
    publishCourse(id){
        return request({
            url: `/eduservice/edu-course/publishCourse/`+id,
            method: 'post',
            })
    },
    //课程列表

    //课程最终发布
    getListCourse(){
        return request({
            url: `/eduservice/edu-course`,
            method: 'get'
            })
    }
}
