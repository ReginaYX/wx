// pages/details/details.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pid: null,
    sku_num: 1,
    prod_data: null,
    favorite: false,
    items_count: 0,
    //购物车中商品总数量
    visibleKey: 'desc'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      pid: options.pid || '57bab0d5f656f2940a3bf56e'
    })
  },
  
  addToFavorite: function (e) {
    util.showLoading();
    wx.request({
      url: util.url + 'catalog/product/favorite',
      data: {
        product_id: this.data.pid
      },
      header: {
        'access-token': wx.getStorageSync('access-token')
      },
      success: res => {
        wx.hideLoading();
        this.setData({
          favorite: !this.data.favorite
        })
        if (res.data.code == 200) {
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
          })
        } else if (res.data.code == 1100003) {
          wx.navigateTo({
            url: '/pages/signIn/signIn',
          })
        }
      },
      fail: () => util.fail()
    })
  },

  setSkuNum: function (e) {
    this.setData({
      sku_num: Number(e.detail.value)
    })
  },

  changeVisibleKey: function (e) {
    this.setData({
      visibleKey: e.currentTarget.dataset.key
    })
    this.fetchData();
  },

  changeProperty: function (e) {
    this.setData({
      pid: e.currentTarget.dataset.oid
    })
    this.fetchData();
  },

  minusSkunum: function () {
    if (this.data.sku_num > 1) {
      this.setData({
        sku_num: this.data.sku_num - 1
      })
    }
  },

  plusSkunum: function () {
    if (this.data.sku_num < 100) {
      this.setData({
        sku_num: this.data.sku_num + 1
      })
    }
  },

  fetchData: function () {
    util.showLoading();
    wx.request({
      url: util.url + 'catalog/product/index',
      data: {
        product_id: this.data.pid,
      },
      success: res => {
        wx.hideLoading();
        this.setData({
          prod_data: res.data.data.product,
          shouldAdd: true
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

  addCart: function () {
    util.showLoading();
    wx.request({
      method: 'POST',
      url: util.url + 'checkout/cart/add',
      data: {
        product_id: this.data.pid,
        qty: this.data.sku_num,
        custom_option: {}
      },
      header: {
        'access-token': wx.getStorageSync('access-token'),
        'fecshop-uuid': wx.getStorageSync('uuid'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        wx.hideLoading();
        if (res.data.code == 200) {
          let v = res.data.data.items_count
          wx.showToast({
            title: '加入成功',
            icon:"success"
          })
          this.setData({
            items_count:v
          })
          wx.setStorageSync("items_count",v)
        } else if (res.data.code == 1100003) {
          wx.navigateTo({
            url: '/pages/signIn/signIn',
          })
        }
      },
      fail: () => util.fail()
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (!wx.getStorageSync('access-token')){
      wx.navigateTo({
        url: '/pages/signIn/signIn'
      })
    }else {
      if (!this.data.prod_data){
        this.fetchData()
      }
      if (wx.getStorageSync('items_count')){
        this.setData({
          items_count: wx.getStorageSync('items_count')
        })
      }
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