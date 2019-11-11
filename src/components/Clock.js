import React, { Component } from 'react';
import { View,Text,StyleSheet,Animated,Easing,Image } from 'react-native'
  
class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
    this.spinValue = new Animated.Value(0)
    this.spinValue2 = new Animated.Value(0)
    this.spinValue3 = new Animated.Value(0)
  }

  UNSAFE_componentWillMount () {
    this.spin()
    this.spinTwo()
    this.spinThree()
  }
 //旋转方法
 spin = () => {
  this.spinValue.setValue(0)
  Animated.timing(this.spinValue,{
    toValue: 1, // 最终值 为1，这里表示最大旋转 360度
    duration: 60000,
    easing: Easing.linear
 }).start(() => this.spin())
}

 spinTwo = () => {
  this.spinValue2.setValue(0)
  Animated.timing(this.spinValue2,{
    toValue: 1, // 最终值 为1，这里表示最大旋转 360度
    duration: 3600000,
    easing: Easing.linear
 }).start(() => this.spinTwo())
}

 spinThree = () => {
  this.spinValue3.setValue(0)
  Animated.timing(this.spinValue3,{
    toValue: 1, // 最终值 为1，这里表示最大旋转 360度
    duration: 86400000,
    easing: Easing.linear
 }).start(() => this.spinTwo())
}






  render() { 
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    const spinTwo = this.spinValue2.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    const spinThree = this.spinValue3.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })

    
    return ( 
      <View style={styles.container}>

        <View style={styles.clockIn}>

        <View style={styles.dashed}>

        
        <Animated.Image
        style={[styles.secondHand,{transform:[{rotate: spin }]}]}
        source={require('./../assets/secondHand.png')}  
        />
        <Animated.Image
        style={[styles.minuteHand,{transform:[{rotate: spinTwo }]}]}
        source={require('./../assets/minuteHand.png')}  
        />
        <Animated.Image
        style={[styles.hourHand,{transform:[{rotate: spinThree }]}]}
        source={require('./../assets/hourHand.png')}  
        />
       

        </View>
        </View>
        <View style={styles.clock}>

        </View>
        <Image
         source={require('./../assets/degNum.png')}  
         style={styles.degNum}
         ></Image>

        
        
      </View>
     );
  }
}


 
export default Clock;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#ddd',
    
  },
  clock:{
    height:240,
    width:240,
    position:'absolute',
    borderRadius:200,
    borderWidth:8,
    borderColor:'red',
    
  },
  clockIn:{
    height:240,
    width:240,
    position:'absolute',
    borderRadius:200,
    borderWidth:14,
    borderColor:'#a11111',
    backgroundColor:'#fff',
    position:'relative',
    overflow:'hidden'
  },

  dashed:{
    borderStyle:'dotted',
    height:211,
    width:211,
    borderRadius:200,
    borderWidth:4,
    borderColor:'#ccc',
    top:.5,
    left:.5,
  },
  secondHand:{
    position:'absolute',
    zIndex:200,
    top:20,
    left:99,
  },
  minuteHand:{
    position:'absolute',
    zIndex:100,
    top:22,
    left:99,
  },
  hourHand:{
    position:'absolute',
    zIndex:50,
    top:92,
    left:22,
  },
  degNum:{
    position:'absolute',
    width:226,
    top:167,
    left:67
  }
 
})
