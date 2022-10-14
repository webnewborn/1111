// pages/home/index.js
var that;
Page({
  data: {
    lists:[
      {
      name:'喝 8 杯水',
      www:0,
      hhh:0,
      size:0,
      },
      {
        name:'23 点之前睡觉',
        www:0,
        hhh:0,
        size:0,
        },
        {
          name:'步行超过 1 千米',
          www:0,
          hhh:0,
          size:0,
          },
          {
            name:'不久坐',
            www:0,
            hhh:0,
            size:0,
            },
            {
              name:'不吃外卖',
              www:0,
              hhh:0,
              size:0,
              }
    ],
    windowWidth:0,
    windowHeight:0,
    shows:false,
    index:0
  },
  onLoad: function(options) {
    that =this;
    wx.getSystemInfo({
      success (res) {
        console.log(res.model)
        that.setData({
          windowWidth:res.windowWidth,
          windowHeight:res.windowHeight
        })
      }
    })
    },
 
  onReady: function() {
    this.buildLocation()
  },
  buildLocation(){
    console.time('11111')
    var arr = [];
    let y=0
    for (let i = 0; i < this.data['lists'].length; i++) {
      y++
      var www = Math.floor(Math.random() * (this.data['windowHeight']-100));
      var hhh = Math.floor(Math.random() * (this.data['windowWidth']-100));
      var size = 100 +(i*5)
      var name = this.data['lists'][i].name
      let obj ={
        size:size,
        www:www,
        hhh: hhh,
        name:name
      };
      if (arr.length == 0) {
        arr.push(obj)
      } else {
        if (that.if_Availability(www, hhh, arr,size)) {
          arr.push(obj)
        } else {
          if(y>200){
            return this.buildLocation()
          }
            i--;
        }
      }
    }
    console.log(arr)
    console.timeEnd('11111')
    this.setData({
      lists:arr
    })
  },
  if_Availability(www, hhh, arr,size){
    let status =true
    for (let i = 0; i < arr.length; i++) {
      let y_www = Math.abs((arr[i].www ) - (www ))
      let y_hhh = Math.abs((arr[i].hhh) - (hhh ))
      if (y_www < size && y_hhh < size) {
        status = false
      }
    }
    return status
  },  
  close(){
    this.setData({
      shows:false
    })
  },
  show(e){
    let arr = this.data['lists']
    arr.splice(e.currentTarget.dataset.index,1)
    this.setData({
      shows:true,
      index:e.currentTarget.dataset.index,
      lists:arr
    })
  },
  onShow: function() {
 
  },
 
})