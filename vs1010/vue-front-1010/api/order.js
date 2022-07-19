import request from '@/utils/request' //引入已经封装好的axios 和 拦截器

export default{
  //生成订单
  createOrders(courseId) {
      return request({
        url: '/eduorder/order/createOrder/'+courseId,
        method: 'post'
      })
  },
  //根据订单id查询订单信息
  getOrdersInfo(id) {
    return request({
      url: '/eduorder/order/getOrderInfo/'+id,
      method: 'get'
    })
  },
  //生成二维码的方法
  createNative(orderNo) {
    return request({
      url: '/eduorder/pay-log/createNative/'+orderNo,
      method: 'get'
    })
  },
  //查询订单状态
  queryPayStatus(orderNo) {
    return request({
      url: '/eduorder/pay-log/queryPayStatus/'+orderNo,
      method: 'get'
    })
  }
}