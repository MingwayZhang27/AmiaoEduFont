import request from '@/utils/request'

export default{
  
    //1.课程分类列表(条件查询分页)
    getSubjectList(page,limit,teacherQuery){
        return request({
            url: `/eduservice/edu-subject/getAllSubject`,
            method: 'get',
          })
    }
}
