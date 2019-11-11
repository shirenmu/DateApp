import React, { Component } from 'react'
import { View,Text,Button, StyleSheet, ScrollView, Image, StatusBar, Alert,TouchableOpacity } from 'react-native'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>更多内容。。</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Tab')}
        />
      </View>
      );
  }
}
 
export default Home;