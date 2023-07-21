const db=wx.cloud.database();
var realtime = require('../../utils/util.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    temperature: 0,
    humidity: 0,
    PH: 0,
    CO2: 0,
    Led: false,
    Pump: false,
    Nutr: false,
    auto: true,
    time: realtime.formatTime(new Date())
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
        CO2: res.result.data[0].CO2,
        Pump: res.result.data[0].pump,
        Nutr: res.result.data[0].nutr,
        auto: res.result.data[0].auto,
        time: res.result.data[0].Time
      })
    })
  },  // if revision is needed, both echarts and index should be revised

  updateLight(event) {
    if (!this.data.auto){
      const that = this
    that.setData({Led:event.detail.value})
    db.collection("iot")
    .add({
      data:{
        Humidity: this.data.humidity,
        pH: this.data.PH,
        Temperature: this.data.temperature,
        CO2: this.data.CO2,
        Time: realtime.formatTime(new Date()),
        light: this.data.Led,
        pump: this.data.Pump,
        nutr: this.data.Nutr,
        auto: this.data.auto
      }
    })
    console.log("Now the light is set to "+event.detail.value)
    }
    else{
      wx.showToast({
        title: 'Unauthorized!',
        icon: 'error'
      })
      console.log("No change is permitted when auto mode is running!")
    }
  },
  updatePump(event) {
    if (!this.data.auto){
      const that = this
    that.setData({Pump:event.detail.value})
    db.collection("iot")
    .add({
      data:{
        Humidity: this.data.humidity,
        pH: this.data.PH,
        Temperature: this.data.temperature,
        CO2: this.data.CO2,
        Time: realtime.formatTime(new Date()),
        light: this.data.Led,
        pump: this.data.Pump,
        nutr: this.data.Nutr,
        auto: this.data.auto
      }
    })
    console.log("Now the pump is set to "+event.detail.value)
    }else{
      wx.showToast({
        title: 'Unauthorized!',
        icon: 'error'
      })
      console.log("No change is permitted when auto mode is running!")
    }
    
  },
  updateNutrition(event) {
    if (!this.data.auto){
      const that = this
    that.setData({Nutr:event.detail.value})
    db.collection("iot")
    .add({
      data:{
        Humidity: this.data.humidity,
        pH: this.data.PH,
        Temperature: this.data.temperature,
        CO2: this.data.CO2,
        Time: realtime.formatTime(new Date()),
        light: this.data.Led,
        pump: this.data.Pump,
        nutr: this.data.Nutr,
        auto: this.data.auto
      }
    })
    console.log("Now nutrition pump is set to "+event.detail.value)
    }else{
      wx.showToast({
        title: 'Unauthorized!',
        icon: 'error'
      })
      console.log("No change is permitted when auto mode is running!")
    }
    
  },
  updateAuto(event) {
    const that = this
    that.setData({auto:event.detail.value})
    db.collection("iot")
    .add({
      data:{
        Humidity: this.data.humidity,
        pH: this.data.PH,
        Temperature: this.data.temperature,
        CO2: this.data.CO2,
        Time: realtime.formatTime(new Date()),
        light: this.data.Led,
        pump: this.data.Pump,
        nutr: this.data.Nutr,
        auto: this.data.auto
      }
    })
    console.log("Now auto is set to "+event.detail.value)
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getData();
    // setTimeout(() => {
    //   this.updateAuto();
    //   if (!this.data.auto){
    //     this.updateLight();
    //   this.updatePump();
    //   this.updateNutrition();
    //   }
    // }, 500);
    //下面为时间格式转换效果
    //console.log(appUtil(this.data.time,"Y-M-D h:m:s"));

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

