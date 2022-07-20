import request from '@/utils/request' //引入已经封装好的axios 和 拦截器

export default{
    //1 生成统计数据
    createStaData(day){
        return request({
            url:`/staservice/sta/registerCount/${day}`,
            method: 'post',
        })
    },
    //2 获取统计数据
    getDataSta(searchObj){
        return request({
            url:`/staservice/sta/showData/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
            method: 'get',
        })
    }
    
}
