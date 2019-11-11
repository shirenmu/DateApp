import React, { Component } from 'react'
import { View, StyleSheet,TouchableOpacity,Text } from 'react-native'
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <Text style={styles.title_style} >{this.props.title}</Text>
          <Text style={styles.info_style} >{this.props.info}</Text>
          <Text style={styles.role_style} >我的角色：{this.props.role}</Text>
        </View>
        <View style={styles.itemRight}>
          <Text style={styles.time_style} >{this.props.time}</Text>
          <Text style={styles.more_style} >...</Text>
        </View>
      </View>
     );
  }
}
 
export default TodoList;

const styles = StyleSheet.create({
  item:{
    flexDirection:'row',height:88,borderBottomWidth:1,borderColor:'#eee',
    padding:12
  },
  itemLeft:{
    flex:7,flexDirection:'column'
  },
  itemRight:{
    flex:1,
  },
  title_style:{
    flex:7,fontWeight:'700',fontSize:16,color:'#333',paddingBottom:4
  },
  info_style:{
    flex:5,color:'#999',fontWeight:'700',fontSize:12,paddingBottom:2
  },
  role_style:{
    flex:5,color:'skyblue',fontWeight:'700',fontSize:12
  },

  time_style:{
    flex:1,color:'#999'
  },
  more_style:{
    flex:2,color:'#999',fontWeight:'700',fontSize:26,marginLeft:10
  },
})