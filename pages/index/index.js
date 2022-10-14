let than = null
Page({
  data: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    nowMonth: new Date().getMonth() + 1,
    nowDay: new Date().getDate(), 
    weeksArr: ['日', '一', '二', '三', '四', '五', '六'],
    lastMonthDays: [], 
    nowMonthDays: [], 
    nextMonthDays: [], 
    addGreenDotList:[],
    timeDate: new Date().toLocaleDateString(), 
    lastType: "nowMonthDays", 
  },
  onShow() {
    than =this
    var ctx = wx.createCanvasContext('firstCanvas')
                    var circleArr=[];
                for (var i = 0; i < 5;i++) {
                        var circle = {};
                    //坐标
                    circle.x = Math.random() * 250;
                        // console.log('circleArraaaaa',circle.x/400);
                    circle.y = Math.random() * 150;
                    circle.r = 10+(i*2);  //半径
                    circle.red = Math.random() * 255;
                    circle.green = Math.random() * 255;
                    circle.blue = Math.random() * 255;
                    circle.opacity = 1;  //透明度
                    circleArr.push(circle);
                }
                console.log('circleArr',circleArr);
                                for (var i = 0; i < circleArr.length; i++) {
                                          var circle = circleArr[i];
                                          circle.r ++;  //半径不断变大
                                          // circle.opacity -=0.01;//透明度不短减小
                                          //点透明度少于0  直接清除
                                          if(circle.opacity<=0){
                                                  circleArr.splice(i,1);
                                          }
                                // context.beginPath(); 
                                ctx.fillStyle = 'rgba('+circle.red+','+circle.green+','+circle.blue+','+circle.opacity+')';
                                ctx.moveTo(circle.x,circle.y)
                                ctx.arc(circle.x,circle.y,circle.r,0,2*Math.PI);
                                // console.log('context',circle.x,circle.y,circle.r,0,Math.PI*2);
                                ctx.fill();
                                }
                                ctx.stroke()
                                ctx.draw()
    let {
      year,
      month
    } = this.data
    this.createDays(year, month)
  },
  createDays(year, month) {
    this.getLastMonthDays(year, month)
    this.getNowMonthDays(year, month)
    this.getNextMonthDays(year, month)
  },
  addRedDot(list){
    list.map((item,index)=>{
      if(item.week == '一'|| item.week == '三'|| item.week == '五'){
        item.reddot = true
      }
    })
  },
  addGreenDot(type,index,is){
    let addGreenDotLists = {
      type,
      index
    }
    let {
      addGreenDotList,
    } = this.data
    if(this.data[type][index].greendot == false){
      addGreenDotList.push(addGreenDotLists)
    }else if(is == false){
      addGreenDotList.forEach((item,ids)=>{
        if(type ==item.type && index ==item.index){
          addGreenDotList.splice(ids,1);
        }
      })
    }
    this.data[type][index].greendot =is
    this.setData({
      addGreenDotList
    })
  },
  determines(){
    let {
      addGreenDotList,
    } = this.data
    let lists=''
    // console.log(addGreenDotList)
    addGreenDotList.forEach((item, idx) => {
    //console.log('this.data[item.type][item.index]',this.data[item.type][item.index].time.split('/'))
      let list = this.data[item.type][item.index].time.split('/')
      lists += `${list[0]}年${list[1]}月${list[2]}日,`
    })
    wx.showToast({
      title: `已选择:${lists}`,
      icon: 'none',
      duration: 2000
    })
  },
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getLastMonthDays(year, month) {
    let nowMonthFirstDays = new Date(year, month - 1, 1).getDay()
    let lastMonthDays = []
    if (nowMonthFirstDays) { 
      let lastMonthNums = month - 1 < 0 ? this.getThisMonthDays(year - 1, 12) : this.getThisMonthDays(year, month - 1);
      for (let i = lastMonthNums - nowMonthFirstDays + 1; i <= lastMonthNums; i++) {
        let time = new Date(year, month - 2, i).toLocaleDateString() 
        lastMonthDays.push({
          date: i, 
          week: this.data.weeksArr[new Date(year, month - 2, i).getDay()], //星期几
          time,
          isNowMonthDay: '',
          reddot:false,
          greendot:false
        });
      }
    }
    this.addRedDot(lastMonthDays)
    this.setData({
      lastMonthDays
    })
  },
  getNowMonthDays(year, month) {
    let {
      nowMonth,
      nowDay
    } = this.data
    let nowMonthDays = []
    let days = this.getThisMonthDays(year, month);
    for (let i = 1; i <= days; i++) {
      let time = new Date(year, month - 1, i).toLocaleDateString()
      nowMonthDays.push({
        date: i, 
        week: this.data.weeksArr[new Date(year, month - 1, i).getDay()], //星期几
        time,//last-days-item
        isNowMonthDay: "",
        reddot:false,
        greendot:false
      });
    }
    this.addRedDot(nowMonthDays)
    this.setData({
      nowMonthDays
    })
  },
  getNextMonthDays(year, month) {
    let {
      lastMonthDays,
      nowMonthDays,
    } = this.data
    let nextMonthDays = []
    let nextMonthNums = (lastMonthDays.length + nowMonthDays.length) > 35 ? 42 - (lastMonthDays.length + nowMonthDays.length) : 35 - (lastMonthDays.length + nowMonthDays.length)
    let nowYear = (parseInt(month) + 1) > 12 ? year + 1 : year 
    let nowMonth = (parseInt(month) + 1) > 12 ? 1 : parseInt(month) + 1 
    if (nextMonthNums) { 
      for (let i = 1; i <= nextMonthNums; i++) {
        let time = new Date(year, month - 1, i).toLocaleDateString()
        nextMonthDays.push({
          date: i, 
          week: this.data.weeksArr[new Date(nowYear, nowMonth - 1, i).getDay()], 
          time,
          isNowMonthDay: '',
          reddot:false,
          greendot:false
        });
      }
    }
    this.addRedDot(nextMonthDays)
    this.setData({
      nextMonthDays
    })
  },
  changeMonth(e) {
    let {
      year,
      month
    } = this.data
    let type = e.currentTarget.dataset.type
    if (type == 'pre') { 
      year = month - 1 > 0 ? year : year - 1
      month = month - 1 > 0 ? month - 1 : 12
    } else { 
      year = (parseInt(month) + 1) > 12 ? year + 1 : year
      month = (parseInt(month) + 1) > 12 ? 1 : parseInt(month) + 1
    }
    this.setData({
      year,
      month,
      lastType: "nowMonthDays", 
    })
    this.createDays(year, month)
  },
  selectDate(e) {
    let type = e.currentTarget.dataset.type 
    let index = e.currentTarget.dataset.index 
    let {
      lastType
    } = this.data
    this.data[type]?.forEach((item, idx) => {
      if (index == idx) {
        if(item.isNowMonthDay == "isNowMonthDay"){
          item.isNowMonthDay = ''
          this.addGreenDot(type,idx,false)
        }else{
          item.isNowMonthDay = 'isNowMonthDay'
          this.addGreenDot(type,idx,true)
        }
      } else {
        item.isNowMonthDay = ''
      }
    })
    this.setData({
      [lastType]: this.data[lastType],
      [type]: this.data[type],
      lastType: type
    })
  }
})