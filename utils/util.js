const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const showLoading = (tip="正在加载") => {
  wx.showLoading({
    title: tip,
    mask:true
  })
}
const fail = (tip = "加载失败") => {
  wx.hideLoading();
  wx.showToast({
    title: tip,
    icon: 'none'
  })
}

module.exports = {
  showLoading: showLoading,
  fail:fail,
  url:'http://appserver.fecshoptest.com/'
}
