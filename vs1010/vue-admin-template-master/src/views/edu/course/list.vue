<template>
  <div class="app-container">
    课程列表
     <!--多条件查询表单-->
    <el-form
      :inline="true"
      class="demo-form-inline"
      style="margin-left: 20px; margin-top: 12px;"
    >
      <el-form-item>
        <el-input
          v-model="courseQuery.title"
          placeholder="课程名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="courseQuery.status" placeholder="课程状态">
          <el-option label="已发布" :value="Normal"></el-option>
          <el-option label="未发布" :value="Draft"></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList()"
          >查询</el-button
        >
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form-item>
    </el-form>

  <!-- 表格 -->
  <el-table
      :data="list"
      style="width: 100%"
      border
      fit
      highlight-current-row
      element-loading-text="数据加载中"
      v-loading="listLoading"
    >
      <el-table-column prop="date" label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="课程名称" width="80"> </el-table-column>
      <el-table-column label="课程状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status === "Normal" ? "已发布" : "未发布" }}
        </template>
      </el-table-column>
      <el-table-column prop="lessonNum" label="课时数" />
      <el-table-column prop="gmtCreate" label="添加时间" width="160" />
      <el-table-column prop="viewCount" label="浏览数量" width="60" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >编辑课程基本信息</el-button
            >
          </router-link>

          <router-link :to="'/teacher/edit/' + scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >编辑课程大纲</el-button
            >
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
            >删除课程信息</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!--分页组件-->
    <el-pagination
      background
      layout="prev, pager, next, total, jumper"
      :total="total"
      :page-size="limit"
      style="padding: 30px 0; text-align: center"
      :current-page="page"
      @current-change="getList"
      >
    </el-pagination>
  </div>
</template>

<script>
//引入调用teacher.js文件
import course from '@/api/teacher/course.js'

export default {
  //写核心代码位置
  data(){//定义变量和初始值
    return{
      list:null,//查询之后接口返回集合
      page:1,//当前页
      limit:5,//每页记录数
      total:0,//总记录数
      courseQuery:{}//条件查询数据
    }
  },
  created(){//页面渲染之前执行，调用methods定义的方法
    //调用
    this.getList()
  },
  methods:{//创建具体的方法，调用teacher.js定义的方法
    //讲师列表的方法
    getList(page=1){
      course.getListCourse()
        .then(response=>{//请求成功
          //response接口返回的数据
          this.list=response.data.list
        })
        .catch(error=>{
          console.log(error)
        })//请求失败
    },
    resetData(){
      //清空的方法
      this.courseQuery={}
      this.getList()
    }
 
  }
}
</script>