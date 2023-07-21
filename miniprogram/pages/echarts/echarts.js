import * as echarts from '../../utils/ec-canvas/echarts';
import appUtil from '../../utils/time'
let chart = null;
Page({
  data: {
    temperature: [],
    humidity: [],
    PH: [],
    CO2: [],
    time: [],
    lazyEc: {
      lazyLoad: true
    },
    timer:''
  },

  getData(){
    const that = this;
    wx.cloud.callFunction({
      name:"read",
      data:{
        num:5 // display nearest 5 data in the database
      }
    }).then(res=>{
      console.log(res.result.data)
      for (var i=0; i<5; i++){
        that.setData({
          [`temperature[${i}]`]: res.result.data[i].Temperature,
          [`humidity[${i}]`]: res.result.data[i].Humidity,
          [`PH[${i}]`]: res.result.data[i].pH,
          [`CO2[${i}]`]: res.result.data[i].CO2,
          [`time[${i}]`]: appUtil(res.result.data[i].Time,"h:m")
        })
        //console.log(this.data.humidity[i])
      }
    })
  }, // if revision is needed, both echarts and index should be revised

  onLoad: function(options) {
    var that = this;
    this.getData();
      let option = this.getOption()
      setTimeout(() => this.init(option), 500)

    this.setData({                    //每隔十秒刷新一次
      timer: setInterval(function () {
              that.getOption();
              that.init(option)
          }, 10000)
    });

    //setInterval(() => this.init(option), 10000)
  },
  onReady: function() {
    this.lazyComponent = this.selectComponent('#myechart')
  },
  onUnload: function () {
    clearInterval(this.data.timer)
  },
  init(option) {
    this.lazyComponent.init((canvas, width, height, dpr) => {
      chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      })

      chart.setOption(option)

      this.chart = chart

      return chart
    }
    )
  },
  getOption: function() {
    //console.log(this.data.humidity[3])
    //console.log(this.data.temperature[3])
    return{
      title: {
        text: '' //existence of title will conflict with content
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['temperature', 'humidity', 'PH', 'CO2']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.data.time //modify here
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'temperature',
          type: 'line',
          stack: 'Total',
          data: this.data.temperature //modify here
        },
        {
          name: 'humidity',
          type: 'line',
          stack: 'Total',
          data: this.data.humidity //modify here
        },
        {
          name: 'PH',
          type: 'line',
          stack: 'Total',
          data: this.data.PH //modify here
        },
        {
          name: 'CO2',
          type: 'line',
          stack: 'Total',
          data: this.data.CO2 //modify here
        },
      ]
    }
  }
})