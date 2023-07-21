// pages/uploadFile/uploadFile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picUrl: 'cloud://plant-factory-1g6f51knc1750184.706c-plant-factory-1g6f51knc1750184-1319215353/test/utils/belinda-fewings-6wAGwpsXHE0-unsplash.jpg',
    result:''
  },

  uploadImage(){
    var that = this;
    console.log('upload!')
    //先拿到临时路径
    wx.chooseImage({
      count:1,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      success:(res)=>{
        console.log(res)
        wx.showLoading({
          title: 'Uploading...',
        })
        wx.cloud.uploadFile({
          cloudPath:'test/demo1',
          filePath:res.tempFilePaths[0],
          success:(res)=>{console.log(res)},
          fail:(err=>{console.log(err)})
        })
        wx.hideLoading()
        this.setData({
          picUrl: res.tempFilePaths[0]
        })
        wx.uploadFile({
          filePath: res.tempFilePaths[0],
          name: 'file',
          url: 'http://47.99.131.209:8081/',
          success: function(res){
            var real = JSON.parse(res.data)
            that.setData({result: real.result})
          },
          fail: function(err){
            console.log(err)
          },
        })
      },
      fail:(err)=>{
        console.log(err)
      }
    })
  },

  downloadImage(){
    console.log('download!')
    //先拿到临时路径
    wx.cloud.downloadFile({
      fileID:'cloud://plant-factory-1g6f51knc1750184.706c-plant-factory-1g6f51knc1750184-1319215353/test/demo1',
      success:(res)=>{
        console.log(res)
      },
      fail:(err)=>{
        console.log(err)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})