import request from '@/utils/request'

export default{
    //根据视频id，获取视频凭证
    getPlayAuth(vid){
        return request({
            url:`/eduvod/video/getPlayAuth/${vid}`,
            method: 'get'
        })
    }
}
