<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="1"
      process-status="wait"
      align-center
      style="margin-
bottom: 40px;"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>
    <el-form label-width="120px">
      <el-form-item label="课程标题">
        <el-input
          v-model="courseInfo.title"
          placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"
        />
      </el-form-item>

      <!-- 所属分类 TODO -->
    <el-form-item label="课程分类">
        <el-select 
        v-model="courseInfo.subjectParentId" placeholder="一级分类" 
            @change="subjectLevelOneChanged">
            <el-option
                    v-for="subject in subjectOneList"
                    :key="subject.id"
                    :label="subject.title"
                    :value="subject.id"
                    ></el-option>
        </el-select>
        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
        <el-option
               v-for="subject in subjectTwoList"
               :key="subject.id"
               :label="subject.title"
               :value="subject.id"
               ></el-option>
        </el-select>
    </el-form-item> 

      <!-- 课程讲师 TODO -->
    <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
            <el-option
                    v-for="teacher in teacherList"
                    :key="teacher.id"
                    :label="teacher.name"
                    :value="teacher.id"
                    ></el-option>
        </el-select>
    </el-form-item> 


      <el-form-item label="总课时">
        <el-input-number
          :min="0"
          v-model="courseInfo.lessonNum"
          controls-position="right"
          placeholder="请填写课程的总课时数"
        />
      </el-form-item>

      <!-- 课程简介 TODO -->
      <el-form-item label="课程简介">
          <tinymce :height="300" v-model="courseInfo.description"/>
      </el-form-item>

      <!-- 课程封面 TODO -->
      <!-- 课程封面 TODO -->
      <el-form-item label="课程封面">
          <el-upload
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :action="BASE_API + '/eduoss/fileoss'"
                  class="avatar-uploader"
                  >
              <img :src="courseInfo.cover" />
          </el-upload>
      </el-form-item>


      <el-form-item label="课程价格">
        <el-input-number
          :min="0"
          v-model="courseInfo.price"
          controls-position="right"
          placeholder="免费课程请设置为0元"
        />
      </el-form-item>
        <el-form-item>
        <el-button
          :disabled="saveBtnDisabled"
          type="primary"
          @click="saveOrUpdate"
          >保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import course from '@/api/teacher/course.js'
import subject from '@/api/teacher/subject.js'
import Tinymce from '@/components/Tinymce'

export default {
    components: { Tinymce },
    data() {
        return {
            saveBtnDisabled:false,
            courseInfo: 
                {
                    title: "",
                    subjectId: "",//二级分类id
                    subjectParentId: "",//一级分类id
                    teacherId: "", 
                    lessonNum: 0,
                    description: "",
                    cover: "static/03.jpg",
                    price: 0,
                },
                BASE_API: process.env.BASE_API, // 接口API地址
                teacherList:[],//封装所有讲师
                subjectOneList:[],//一级分类,
                subjectTwoList:[],//二级分类
                courseId:''
            }
    },
    created(){//页面渲染之前执行
        //获取路由里的id值
        if(this.$route.params && this.$route.params.id){
          this.courseId=this.$route.params.id
          //调用根据id查询课程的方法
          this.getInfo()
        }else{
        //初始化所有讲师
        this.getListTeacher(),
        //初始化一级分类
        this.getOneSubject()
        }
    },
    methods: {
      //根据课程id查询信息
      getInfo(){
        course.getCourseInfoId(this.courseId)
          .then(response=>{
            //在courseInfo课程基本信息。包含一级分类和二级分类
            this.courseInfo=response.data.courseInfoVo
            //1 查询所有的分类，包含一级和二级
            subject.getSubjectList()
              .then(response=>{
                //2 获取所有一级分类
                this.subjectOneList=response.data.list
                
                //3 把所有的一级分类的数组进行遍历，
                for(var i=0;i<this.subjectOneList.length;i++){
                  //获取每个一级分类
                  var oneSubject=this.subjectOneList[i]
                  //比较当前courseInfo的一级分类id和所有一级分类id
                  if(this.courseInfo.subjectParentId==oneSubject.id){
                    //获取一级分类所有的二级分类
                    this.subjectTwoList=oneSubject.children
                  }
                }
              })
              //初始化所有讲师
              this.getListTeacher()
          })
      },
      //上传封面成功调用的方法
      handleAvatarSuccess(res,file) {
          this.courseInfo.cover = res.data.url
      },
      //上传之前要调用的方法
      beforeAvatarUpload(file) {
          const isJPG = file.type === "image/jpeg";
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isJPG) {
              this.$message.error("上传头像图片只能是 JPG 格式!");
          }
          if (!isLt2M) {
              this.$message.error("上传头像图片大小不能超过 2MB!");
          }
          return isJPG && isLt2M;
      },
      //点击某个一级分类，触发change事件，显示对应的二级分类
      subjectLevelOneChanged(value) {
      //value就是一级分类的id值
          for (let i = 0; i < this.subjectOneList.length; i++) {
              //对比所点击的一级分类和所有一级分类的id
              if (this.subjectOneList[i].id === value) {
                  //取一级分类中获取的二级分类
                  this.subjectTwoList = this.subjectOneList[i].children;
                  //选择其他的时候清空二级分类的id值
                  this.courseInfo.subjectId = '';
                  }
              }
      },
      //查询所有的一级分类
      getOneSubject(){
          subject.getSubjectList()
              .then(response=>{
                  this.subjectOneList=response.data.list
              })
      },
      //查询所有的讲师
      getListTeacher(){
          course.getAllTeacher()
          .then(response=>{
              this.teacherList=response.data.items
          })
      },
      //添加课程
      addCourse() {
        course.addCourseInfo(this.courseInfo).then((resp) => {
          this.$message({
            message: "添加课程信息成功",
            type: "success",
          });
          //跳转到第二步,并带着这个课程生成的id
          this.$router.push({ path: "/course/chapter/" + resp.data.courseId });
        });
      },

      //修改课程
      updateCourse() {
        course.updateCourseInfo(this.courseInfo).then((resp) => {
          this.$message({
            message: "修改课程信息成功",
            type: "success",
          });
          //跳转到第二步,并带着这个课程生成的id
          this.$router.push({ path: "/course/chapter/" + this.courseId });
        });
      },
      saveOrUpdate() {
        //判断courseInfo中是否有id值
        if (this.courseInfo.id) {
          //有id值，为修改
          this.updateCourse();
        } else {
          //没id值，为添加
          this.addCourse();
        }
      },
  }
};
</script>

<style scoped>
.tinymce-container {
  line-height: 29px;
}</style>
