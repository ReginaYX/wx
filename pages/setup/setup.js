// pages/setup/setup.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pic: wx.getStorageSync('avatarUrl'),
    customerInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  loginOut:function(){
    wx.removeStorageSync('access-token')
    wx.navigateTo({
      url: '/pages/signIn/signIn',
    })
  },

  customerInfo:function(){
    util.showLoading();
    wx.request({
      url: util.url + 'customer/editaccount/index',
      method: 'GET',
      header: {
        'access-token': wx.getStorageSync('access-token'),
        'fecshop-uuid': wx.getStorageSync('uuid')
      },
      success: res => {
        wx.hideLoading();
        this.setData({
          customerInfo:res.data.data
        })
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
    if (!this.data.customerInfo){
      this.customerInfo()
    }
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