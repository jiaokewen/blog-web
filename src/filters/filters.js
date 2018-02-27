import Vue from 'vue'

Vue.filter('fRefundStatus', val => {
  return {
    'pending': '待审核',
    'shipment_pending': '待发货',
    'goods_receipt_pending': '待收货',
    'express_pending': '待揽件',
    'pending_payment': '待打款',
    'refund_completed': '已完成',
    'refund_cancelled': '已取消',
    'refund_closed': '已关闭'
  }[val] || '未知状态'
})
