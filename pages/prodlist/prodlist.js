// pages/prodlist/prodlist.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    //分类id
    currentPage:1,
    //当前页数
    pageCount:null,
    //总页数
    products:null,
    //页面中显示的产品
    filterShow: false,
    //筛选框是否显示
    menuShow: false,
    //综合菜单是否显示
    filterPrice: null,
    //产品价格区间
    filterInfo: null,
    //产品属性
    sortColumn:null,
    //用户选的排序方式
    filterAttrs:{},
    //用户筛选的条件
    fedPrice:null
    //用户筛选的价格区间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id ||'57bea0e3f656f275313bf56e'
    })
  },
  clearFilter:function(){
    //清除筛选条件
    this.setData({
      filterAttrs: {},
      fedPrice:null,
      filterShow: false
    })
    this.fetchData();
  },
  toggleFilter:function(){
    //控制筛选框是否显示
    this.setData({
      filterShow: !this.data.filterShow
    })
  },
  toggleMenuShow:function(){
    //控制综合菜单是否显示
    this.setData({
      menuShow: !this.data.menuShow
    })
  },
  fPrice:function(e){
    //接收价格筛选条件，根据条件价格区间查询数据
    this.setData({
      fedPrice: e.currentTarget.dataset.key,
      filterShow: false,
      filterAttrs: this.data.filterAttrs
    })
    util.showLoading();
    this.search();
  },
  search:function(){
    //根据条件查询数据
    wx.request({
      url: util.url + 'catalog/category/index',
      data: {
        categoryId: this.data.id,
        sortColumn: this.data.sortColumn,
        filterAttrs: this.data.filterAttrs,
        filterPrice: this.data.fedPrice
      },
      success: res => {
        wx.hideLoading();
        this.setData({
          filterInfo: res.data.data.filter_info,
          currentPage: 1,
          filterPrice: res.data.data.filter_price.price,
          pageCount: res.data.data.page_count,
          products: res.data.data.products
        })
      },
      fail: () => util.fail()
    })
  },
  setFilterAttrs:function(e){
    //接收筛选条件
    let k = e.currentTarget.dataset.key;
    let v = e.currentTarget.dataset.value;
    let o = this.data.filterAttrs;
    o[k]= v;
    this.setData({
      filterAttrs: o,
      filterShow: false,
      fedPrice: this.data.fedPrice
    })
    util.showLoading();
    this.search();
  },
  setSortColumn:function(e){
    //设置产品排序规则
    if(this.data.menuShow){
      this.setData({
        menuShow:false
      })
    }
    if (!e.currentTarget.dataset.key){
      this.setData({
        sortColumn:null
      })
    }
    this.setData({
      sortColumn: e.currentTarget.dataset.key
    })
    util.showLoading();
    this.search();
  },
  fetchData:function(){
    util.showLoading();
    // wx.request({
    //   url: util.url+'catalog/category/index?categoryId='+this.data.id,
    //   success:(res)=> {
    //     wx.hideLoading();
    //     this.setData({
    //       filterInfo: res.data.data.filter_info,
    //       filterPrice: res.data.data.filter_price.price,
    //       totalPage:res.data.data.page_count,
    //       products: res.data.data.products
    //     })
    //   },
    //   fail: () => util.fail()
    // })
    this.search()
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
    if (!this.data.products) {
      this.fetchData();
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
    this.setData({
      currentPage: this.data.currentPage + 1
    })
    util.showLoading();
    if (this.data.currentPage > this.data.totalPage) {
      wx.showToast({
        title: '没有更多',
        icon: "none"
      })
    }
    wx.request({
      url: util.url +'catalog/category/product',
      data: {
        categoryId: this.data.id,
        sortColumn: this.data.sortColumn,
        filterAttrs: this.data.filterAttrs,
        p: this.data.currentPage,
        fedPrice: this.data.fedPrice
      },
      success: (res) => {
        wx.hideLoading();
        let arr = this.data.products.concat(res.data.data.products)
        this.setData({
          products: arr
        })
      },
      fail: () => util.fail()
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})