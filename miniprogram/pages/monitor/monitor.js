const db=wx.cloud.database();
//import appUtil from '../../utils/time'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    temperature: 0,
    humidity: 0,
    PH: 0,
    Led: false,
    time: Date.now(),
    testList:[],
  },

  getData(){
    const that = this;
    wx.cloud.callFunction({
      name:"read",
      data:{
        num:1
      }
    }).then(res=>{
      console.log(res.result.data)
      that.setData({
        temperature: res.result.data[0].Temperature,
        humidity: res.result.data[0].Humidity,
        PH: res.result.data[0].pH,
        Led: res.result.data[0].light,
        time: res.result.data[0].Time
      })
    })
  },  // if revision is needed, both echarts and index should be revised

  updateCommand(event) {
    const that = this
    that.setData({Led:event.detail.value})
    db.collection("test")
    .add({
      data:{
        light:event.detail.value,
        mositure: this.data.Humidity,
        ph: this.data.pH,
        temperature: this.data.Temperature,
        time: Date.now(),
      }
    })
    console.log("Now the light is set to "+event.detail.value)
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData();
    // setTimeout(() => {
    //   this.updateCommand();
    // }, 500);
    //下面为时间格式转换效果
    //console.log(appUtil(this.data.time,"Y-M-D h:m:s"));



    this.updateRecentImage();
    setInterval(this.updateRecentImage, 3000);
  },

  updateRecentImage() {
    const that = this;
    db.collection("image")
      .orderBy('timestamp', 'desc') // sort in descending order
      .limit(1) // limit to the 1 most recent documents
      .get({
        success: res => {
          console.log(res.data)
          that.setData({
            testList: res.data,
          })
        },
        fail: console.error
      })
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
    this.getData();
    wx.showToast({
      title: 'Data Refreshed'
    })
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

  },


  


  
})

