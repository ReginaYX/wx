// pages/signIn/signIn.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData:{
      email: null,
      password: null
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  updateFormData:function(e){
    let o = this.data.formData
    o[e.currentTarget.dataset.key] = e.detail.value
    this.setData({
      formData: o
    })
  },

  submit: function () {
    util.showLoading();
    wx.request({
      method: 'POST',
      url: util.url + 'customer/login/account',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: this.data.formData,
      success: res => {
        wx.hideLoading();
        console.log(res)
        if (res.data.code==200){
          wx.setStorage({
            key: 'access-token',
            data: res.header['Access-Token'],
            success:function(){
              wx.navigateBack()
            }
          })
          wx.setStorage({
            key: 'uuid',
            data: res.header['Fecshop-Uuid'],
          })
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none'
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