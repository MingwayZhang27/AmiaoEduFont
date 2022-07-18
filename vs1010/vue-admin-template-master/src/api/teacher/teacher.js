import request from '@/utils/request'

export default{
  
    //1.讲师列表(条件查询分页)
    getTeacherListPage(page,limit,teacherQuery){
        return request({
            // url: '/table/list'+'current'+'/'+'limit',
            url: `/eduservice/edu-teacher/pageTeacherCondition/${page}/${limit}`,
            method: 'post',
            //teacherQuery条件对象，后端使用RequestBody获取数据
            //data表示吧对象转换json进行传递到接口
            data: teacherQuery
          })
    },
    //2.讲师删除
    deleteTeacherId(id){
        return request({
            // url: '/table/list'+'current'+'/'+'limit',
            url: `/eduservice/edu-teacher/${id}`,
            method: 'delete',
          })
    },
    //3.添加讲师
    addTeacher(teacher){
        return request({
            url: `/eduservice/edu-teacher/addTeacher`,
            method: 'post',
            data: teacher
        })
    },
    //根据id查询讲师
    getTeacherInfo(id){
        return request({
            url: `/eduservice/edu-teacher/getTeacher/${id}`,
            method: 'get',
        })
    },
    //修改讲师
    updateTeacherInfo(teacher){
        return request({
            url: `/eduservice/edu-teacher/updateTeacher`,
            method: 'post',
            data: teacher
        })
    }
}
