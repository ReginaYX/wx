// pages/order/order.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prod_data: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  getshopping: function () {
    util.showLoading();
    wx.request({
      url: util.url + 'checkout/onepage/getshippingandcartinfo',
      method: 'GET',
      header: {
        'access-token': wx.getStorageSync('access-token'),
        'fecshop-uuid': wx.getStorageSync('uuid')
      },
      data: {
        'country': 'CN',
        'address_id': '',
        'state': '',
        'shipping_method': 'free_shipping'
      },
      success: res => {
        wx.hideLoading();
        if (res.data.code == 200) {
          this.setData({
            prod_data: res.data.data.cart_info.products
          })
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
          })
        }
      },
      fail: () => util.fail()
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getshopping()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})