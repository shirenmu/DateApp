import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Easing,
} from 'react-native'



class Move extends Component {
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0)
  }

  UNSAFE_componentWillMount () {
    this.spin()
  }
 //旋转方法
 spin = () => {
  this.spinValue.setValue(0)
  Animated.timing(this.spinValue,{
    toValue: 1, // 最终值 为1，这里表示最大旋转 360度
    duration: 8000,
    easing: Easing.linear
 }).start(() => this.spin())
}

  render () {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    const spinTwo = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['360deg', '0deg']
    })
    return (
      <View style={styles.container}>
        <Animated.Image
        style={[styles.circle,{transform:[{rotate: spin }]}]}
        source={require('./../assets/ava.png')}  
        />
        <Animated.Image
        style={[styles.circleTwo,{transform:[{rotate: spinTwo }]}]}
        source={require('./../assets/avaW.png')}  
        />
      </View>
    )
  }
}
 
export default Move;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#111'
  },
  circle:{
    position:'absolute',
    width: 200,
    height: 200,
    borderRadius:100,
    borderWidth:8,
    borderColor:'#000',
},
   circleTwo:{
    position:'absolute',
    top:90,
    left:200,
    width: 100,
    height: 100,
    borderRadius:100,
    borderWidth:4,
    borderColor:'#000'
}

})