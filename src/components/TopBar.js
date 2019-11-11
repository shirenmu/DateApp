import React, { Component } from 'react'
import { View, StyleSheet,TouchableOpacity,Text,DeviceEventEmitter } from 'react-native'


export default class TopBar extends Component { //头导航
  constructor(props){
    super(props)
    this.state = {
      count: 9, // 消息总数量
      search: '',
      isShow:true
    }
  }

  topShow=()=>{
    this.setState({
      isShow: false
    })
  }

  searchClose=()=>{
    this.setState({
      isShow: true
    })
  }

  updateSearch=search=>{
    this.setState({
      search
    })
  }

  render(){
      return(
          <View style={styles.headerSty} >
            <Text style={styles.headerTit}>{this.props.dateText}</Text>
            <TouchableOpacity onPress={this.handleClick}>
              <Text style={styles.add} >今天</Text>
            </TouchableOpacity>
          </View>
      )
  }
  handleClick=()=>{
    DeviceEventEmitter.emit('reset')
  }
}


const styles = StyleSheet.create({
  headerSty: {
    height:70, backgroundColor: '#333', flexDirection: 'row',
  },

  headerTit: {
    color: '#fff',fontSize: 20,
    lineHeight: 70,marginLeft: 60,
    flex: 1,  textAlign: 'center' 

  },
  add: {
    fontSize: 20,color: '#fff',textAlign: 'right',
    lineHeight: 72,marginRight: 26,flex: 1,
  },

});


