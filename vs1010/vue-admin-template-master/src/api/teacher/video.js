import request from '@/utils/request' //引入已经封装好的axios 和 拦截器

export default{
    //添加小节
    addVideo(video){
        return request({
            url:`/eduservice/edu-video/addVideo/`,
            method: 'post',
            data: video
        })
    },
    //删除章节
    deleteVideo(id){
        return request({
            url:`/eduservice/edu-video/`+id,
            method: 'delete',
        })
    },
    //删除视频
    deleteAliyunvod(id){
        return request({
            url:`/eduvod/video/removeAlyVideo/`+id,
            method: 'delete',
        })
    },

}
