import React, { Component, Fragment } from 'react';
import { View, StyleSheet, TouchableOpacity, Text,PanResponder,DeviceEventEmitter } from 'react-native'
import { renderArr,whatDay } from '../tools/weekC'
import { Icon } from '@ant-design/react-native';

class CalendarComponent extends Component {
  constructor(props) {
    super(props);
    let dt = new Date();
    let y = dt.getFullYear();
    let m = dt.getMonth() + 1;
    let d = dt.getDate()
    
    
    
    this.state = {
      isOpen: false,
      year:y,
      month:m,
      newYear:y,
      newMonth:m,
      day:d,
      calendarList:renderArr(),// 默认为当前年月的日历数组
      wDay:whatDay(), // 0 表示星期日 ，1表示星期一 以此类推


      selected:null,

      calendarWeekList:[],
      num:0,
    }

    

  



  }

  changeOpenState() {
    this.setState({
      isOpen: !this.state.isOpen
    }, () => {
      console.log(this.state.isOpen)
    })
  }

  nextMonth =async()=>{
    if(this.state.newMonth<12){
      await this.setState({
        newMonth:this.state.newMonth+1
      })
    }else{
      await this.setState({
        newMonth:1,
        newYear:(this.state.newYear)+1
      })
    }
    

    this.setState({
      calendarList:renderArr(this.state.newYear,this.state.newMonth,whatDay(this.state.newYear,this.state.newMonth,1))
    }) 
  }
  lastMonth=async()=>{
    if(this.state.newMonth>1){
      await this.setState({
        newMonth:this.state.newMonth-1
      })
    }else{
      await this.setState({
        newMonth:12,
        newYear:this.state.newYear-1
      })
    }

    this.setState({
      calendarList:renderArr(this.state.newYear,this.state.newMonth,whatDay(this.state.newYear,this.state.newMonth,1))
    },()=>{
      this.setState({
        selected:null
      })
    }) 
  }


  selection(index){
    this.setState({
      selected:index
    })
  }

  calendarWeekSplice(num){
    let arr = []
    let list = this.state.calendarList
    for(let i = num ; i<num+7 ;i++){
      arr.push(list[i])
    }
    return arr
  }

  lastWeek(){
    if(this.state.num>=7){
      this.setState({
        num:this.state.num-=7
      },()=>{
        this.setState({
          calendarWeekList:this.calendarWeekSplice(this.state.num)
        })
      })
    }
  }
  nextWeek(){
    if(this.state.calendarList.length ==35 && this.state.num<28 ){
      this.setState({
        num:this.state.num+=7
      },()=>{
        this.setState({
          calendarWeekList:this.calendarWeekSplice(this.state.num)
        })
      })
    }else if(this.state.calendarList.length ==40 && this.state.num<33){
      this.setState({
        num:this.state.num+=7
      },()=>{
        this.setState({
          calendarWeekList:this.calendarWeekSplice(this.state.num)
        })
      })
    }
  }


  componentWillUnmount() {
    // 移除监听
    if (this.listener) { this.listener.remove(); }
  }
 
  


  UNSAFE_componentWillMount() {

    

    this.setState({
      num:this.state.day+this.state.wDay-1
    },()=>{
      this.setState({
        calendarWeekList:this.calendarWeekSplice(this.state.num)
      })
    })

    this.listener = DeviceEventEmitter.addListener('reset',()=>{
      this.setState({
        calendarList:renderArr(this.state.year,this.state.month,whatDay(this.state.year,this.state.month)),
        newYear:this.state.year,
        newMonth:this.state.month,
        num:this.state.day+this.state.wDay-1
      },()=>{
        this.setState({
          selected:null,
          calendarWeekList:this.calendarWeekSplice(this.state.num)
        })
      }) 
    }
    )


    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

        // gestureState.{x,y} 现在会被设置为0
      },
      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}
        // console.log(`gestureState.dx : ${gestureState.dx}   gestureState.dy : ${gestureState.dy}`);
        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
        
        
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
        // 打开
        if(gestureState.dy >40){
          this.changeOpenState()
        // 合上
        }else if(gestureState.dy <-40){
          this.changeOpenState()
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    });


    this._leftOrRight= PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
        // gestureState.{x,y} 现在会被设置为0
      },
      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}
        
       
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
        if(gestureState.dx >20){
          // 上个月
          this.lastMonth()
        }else if(gestureState.dx <-10){
          // 下个月
          this.nextMonth()
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    })



    this._weekChange= PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
        // gestureState.{x,y} 现在会被设置为0
      },
      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}
        
       
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
        if(gestureState.dx >20){
          // 上个月
          this.lastWeek()
        }else if(gestureState.dx <-10){
          // 下个月
          this.nextWeek()
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    })
  }

  

  render() {
    const week = ['日', '一', '二', '三', '四', '五', '六']
    const { isOpen,calendarList,year,month,newYear,newMonth,day,wDay,selected,calendarWeekList } = this.state
  
    if (isOpen) {

      return (
        <Fragment>
          <View style={styles.packing}>
            <View style={styles.titlePadding}>
              {week.map(w => {
                return <Text style={styles.title} key={w}>{w}</Text>
              })}
              <View style={styles.dateInfo}>
              <Text style={styles.dateInfoText}>{this.state.newYear}年{this.state.newMonth}月</Text>
            </View>
            </View>
   

            <View {...this._leftOrRight.panHandlers} style={styles.dayStyle}>
              {calendarList.map((item,index)=>{
                    return (<TouchableOpacity onPress={this.selection.bind(this,index)}  key={index} style={selected==index?styles.selected:''}>
                                 <Text 
                                    style={[styles.dayItem,item==day&&newYear==year&&newMonth==month?styles.today:'']}
                                    key={index}>{item}</Text>
                           </TouchableOpacity>
                )
                        })}
            </View>

            <View  {...this._panResponder.panHandlers}>
              <Text style={styles.upOrDown}>
              <Icon name="double-right" color="#a11111"/>
              </Text>
              
            </View>

          </View>


        </Fragment>
      )


      
    }


    if (!isOpen) {
      return (
        <Fragment>
          <View style={styles.packing}>
            <View style={styles.titlePadding}>
              {week.map(w => {
                return <Text style={styles.title} key={w}>{w}</Text>
              })}
            </View>



            <View {...this._weekChange.panHandlers} style={styles.dayStyle}>
              {calendarWeekList.map((item,index)=>{
                    return (<TouchableOpacity key={index} 
                    // style={this.state.selected==index?styles.selected:''}
                    >
                                 <Text 
                                    style={[styles.dayItem,item==day?styles.today:'']}
                                    key={index}>{item}</Text>
                           </TouchableOpacity>
                )
                        })}
            </View>

            


            <View {...this._panResponder.panHandlers}>
              <Text style={styles.downOrUp}>
              <Icon name="double-right" color="blue"/>
              </Text>
            </View>
          </View>
        </Fragment>
      )
    }




  }
}

export default CalendarComponent;

const styles = StyleSheet.create({
  packing: {

  },

  titlePadding: {
    flexDirection: 'row', padding: 10,
  },
  title: {
    flex: 1, textAlign: 'center', color: '#999', fontWeight: '500'
  },

  dayStyle:{
    flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',padding:10
  },
  dayItem:{
    height:36,width:36,textAlign:'center',lineHeight:32,margin:5
  },
  downOrUp:{
    textAlign:'center',
    transform: [{rotate:'90deg'}]
  },
  upOrDown:{
    textAlign:'center',
    transform: [{rotate:'-90deg'}]
  },
  today:{
    backgroundColor:'#a11111',color:'#fff',borderRadius:50,
    
  },


  dateInfo:{
    position:'absolute',
    top:36,left:20,
    height:20,width:90,
    borderRadius:4,
  },
  dateInfoText:{
    textAlign:'center',color:'#a11111'
  },

  selected:{
    borderBottomColor:'#a33333',color:'#a33333',borderBottomWidth:2
  }

 


})