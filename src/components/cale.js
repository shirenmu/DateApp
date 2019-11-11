

import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Dimensions } from 'react-native'
import moment from 'moment'

const width = Dimensions.get('window').width
const now = new Date()
export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      nowDate: new Date()
    }
  }

  _onPressButton(nowDate) {
    this.setState({
      nowDate
    })
  }

  render() {
    let { nowDate } = this.state
    let content = []
    for (let i = 0; i < this.props.monthNum; i++) { // 月数循环
      let date = new Date(now.getFullYear(), now.getMonth() + i, 1);
      let week = date.getDay(); // 当月从星期几开始
      let days = new Date(now.getFullYear(), now.getMonth() + i + 1, 0).getDate();  // 当月的天数
      let dayList = [];
      for (let y = 0; y < week; y++) { // 前面补空占位
        dayList.push(
          <View style={styles.day}>
            <Text style={styles.dayText}></Text>
          </View>
        )
      }

      for (let x = 1; x <= days; x++) { // 循环天数
        let toDay = new Date(now.getFullYear(), now.getMonth() + i, x); // 今天
        let g = this.props.goliday[moment(toDay).format('YYYY-MM-DD')];
        if (!g) { // 节假日
          g = x;
        }
        let node = <View style={styles.day}><TouchableOpacity onPress={this._onPressButton.bind(this, toDay)} activeOpacity={0.5}><Text style={[styles.dayText, { color: '#000' }]}>{g}</Text></TouchableOpacity></View>
        if (i == 0 && x < now.getDate()) { // 今天以前的日期置灰 ，无事件
          if ((week + x) % 7 == 1 || (week + x) % 7 == 0) { // 周末 蓝色
            node = <View style={styles.day}><Text style={[styles.dayText, { color: '#105eae' }]}>{g}</Text></View>
          } else {
            node = <View style={styles.day}><Text style={[styles.dayText, { color: '#999' }]}>{g}</Text></View>
          }
        } else if (i == 0 && x == now.getDate()) { // 今天
          node = <View style={styles.day}><TouchableOpacity onPress={this._onPressButton.bind(this, toDay)} activeOpacity={0.5}><Text style={[styles.dayText, { color: '#000' }]}>今天</Text></TouchableOpacity></View>
        } else if ((week + x) % 7 == 1 || (week + x) % 7 == 0) { // 周末 蓝色
          node = <View style={styles.day}><TouchableOpacity onPress={this._onPressButton.bind(this, toDay)} activeOpacity={0.5}><Text style={[styles.dayText, { color: '#105eae' }]}>{g}</Text></TouchableOpacity></View>
        }
        if (moment(toDay).format('YYYY-MM-DD') === moment(nowDate).format('YYYY-MM-DD')) { // 选中日期
          node = <View style={[styles.day, styles.curr]}><TouchableOpacity onPress={this._onPressButton.bind(this, toDay)} activeOpacity={0.5}><Text style={[styles.dayText, { color: '#fff' }]}>{g}</Text></TouchableOpacity></View>
        }
        dayList.push(node)
      }
      content.push( // 添加节点
        <View>
          <View style={styles.head}><Text>{moment(date).format('YYYY年MM月')}</Text></View>
          <View style={styles.content}>
            {dayList}
          </View>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.weekContainer}>
          <Text style={[styles.weekText]}>日</Text>
          <Text style={styles.weekText}>一</Text>
          <Text style={styles.weekText}>二</Text>
          <Text style={styles.weekText}>三</Text>
          <Text style={styles.weekText}>四</Text>
          <Text style={styles.weekText}>五</Text>
          <Text style={[styles.weekText]}>六</Text>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}    // 隐藏垂直指示器
        >
          {content}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#fff'
  },
  weekContainer: {
    width: width,
    height: 35,
    backgroundColor: '#105eae',
    flexDirection: 'row',
    alignItems: 'center'
  },
  weekText: {
    width: width / 7,
    lineHeight: 35,
    textAlign: 'center',
    color: '#fff'
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  day: {
    width: width / 7 - 0.1,
  },
  dayText: {
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: ((width / 7) - 20) * 0.5
  },
  startdayText: {
    textAlign: 'center',
    fontSize: 14
  },
  curr: {
    backgroundColor: '#105eae',
  },
  range: {
    backgroundColor: '#6CAFF5'
  },
  head: {
    alignItems: 'center',
    margin: 10
  },
  start: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14
  },
  btn: {
    width: width,
    height: 45,
    backgroundColor: '#105eae',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  }
})

App.defaultProps = {
  monthNum: 6, // 显示的月数
  goliday: { // 节假日在这里添加
    '2018-04-05': '清明',
    '2018-05-01': '劳动',
    '2018-06-18': '端午',
    '2018-09-24': '中秋',
    '2018-10-01': '国庆'
  }
}