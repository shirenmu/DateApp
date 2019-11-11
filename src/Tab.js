import React, { Component,Fragment } from 'react'
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { View,Text,Button,StatusBar,ScrollView} from 'react-native'
import TopBar from './components/TopBar' // 头导航
import TodoList from './components/TodoList' // 待办列表

import { Icon } from '@ant-design/react-native';
import CalendarComponent from './components/Calendar'
import DateTime from './tools/DateTime'

import Move from './components/Move'
import Clock from './components/Clock'



	//#region tab页
	class Work extends Component {
    constructor(props) {
      super(props);
      this.state = { }
    }
    render() { 
      return ( 
        <Fragment>
          <StatusBar backgroundColor="#333" barStyle="light-content" />
         <TopBar dateText={DateTime()}></TopBar>
         <Move></Move>
        </Fragment>
       );
    }
  }
  
  class Role extends Component {
    constructor(props) {
      super(props);
      this.state = {  }
    }
    render() { 
      return ( <Text>角色</Text> );
    }
  }
  
  class EventCircle extends Component {
    constructor(props) {
      super(props);
      this.state = {  }
    }
    render() { 
      return ( <Clock></Clock> );
    }
  }
  
  class Colleague extends Component {
    constructor(props) {
      super(props);
      this.state = {  }
    }
    render() { 
      return ( <Text>同事</Text> );
    }
  }
  
  class Calendar extends Component {
    constructor(props) {
      super(props);
      this.state = {  
        list:[
          {
            title:'227市场',
            info:'定价依据和客户判断',
            role:'经办人',
            time:'16:24',
          },
          {
            title:'新软件',
            info:'定价依据和客户判断',
            role:'经办人',
            time:'16:24',
          },
          {
            title:'2-3-6手提项目',
            info:'定价依据和客户判断',
            role:'经办人',
            time:'16:24',
          },
          {
            title:'消防考试资格',
            info:'定价依据和客户判断',
            role:'经办人',
            time:'16:24',
          },
          {
            title:'总裁办招新',
            info:'定价依据和客户判断',
            role:'经办人',
            time:'16:24',
          },
          {
            title:'吃饭吃饭吃饭',
            info:'定价依据和客户判断',
            role:'经办人',
            time:'16:24',
          },
          {
            title:'睡觉睡觉',
            info:'定价依据和客户判断',
            role:'经办人',
            time:'16:24',
          },
          {
            title:'0000000',
            info:'定价依据和客户判断',
            role:'经办人',
            time:'16:24',
          },
          {
            title:'999999',
            info:'定价依据和客户判断',
            role:'经办人',
            time:'16:24',
          },
          {
            title:'7777777',
            info:'定价依据和客户判断',
            role:'经办人',
            time:'16:24',
          },
          {
            title:'11111',
            info:'定价依据和客户判断',
            role:'经办人',
            time:'16:24',
          },
          {
            title:'222222',
            info:'定价依据和客户判断',
            role:'经办人',
            time:'16:24',
          },
          {
            title:'3333333',
            info:'定价依据和客户判断',
            role:'经办人',
            time:'16:24',
          },
        ]
      }
    }
    render() { 
      return ( 
        <>
        <TopBar dateText={DateTime()}></TopBar>
        <View >
        <CalendarComponent></CalendarComponent>
        <ScrollView>
          {
           this.state.list.map(item=>
             <TodoList {...item} key={item.title}></TodoList>
            )
          } 
          <View style={{height:110}}></View>
        </ScrollView>
         
        
        {/* <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Home')}
        /> */}
        </View>
        </>
      );
    }
  }
	//#endregion


 

const Router = createMaterialTopTabNavigator({

  Work: {
      screen: Work, 
      navigationOptions: {
          tabBarLabel: '工作',
          // tabBarIcon:(obj)=>(<Icon type="antdesign" name="wechat" color={obj.tintColor} size={22} />) ,
          tabBarIcon:(obj)=>(<Icon name="area-chart" color={obj.tintColor}/>) 
      }
     
      
  },
  Role: {
      screen: Role,
      navigationOptions: {
          tabBarLabel: '角色',
          labelStyle: {
            fontSize: 8,
          },
          // tabBarIcon:(obj)=>(<Icon  name="contacts" color={obj.tintColor} size={22}/>) ,
          tabBarIcon:(obj)=>(<Icon name="woman" color={obj.tintColor}/>) 
      }
  },
  EventCircle: {
      screen: EventCircle,
      navigationOptions: {
          tabBarLabel: '事项圈',
          // tabBarIcon:(obj)=>(<Icon  name="explore" color={obj.tintColor} size={22}/>) ,
          tabBarIcon:(obj)=>(<Icon name="compass" color={obj.tintColor}/>) 
      }
  },
  Colleague: {
      screen: Colleague,
      navigationOptions: {
          tabBarLabel: '同事',
          // tabBarIcon: <Icon name="accessibility"/>
          // tabBarIcon:(obj)=>(<Icon type="antdesign" name="user" color={obj.tintColor} size={22}/>) ,
          tabBarIcon:(obj)=>(<Icon name="team" color={obj.tintColor}/>) 

      }
  },
  Calendar: {
      screen: Calendar,
      navigationOptions: {
          tabBarLabel: '日历',
          // tabBarIcon: <Icon name="accessibility"/>
          // tabBarIcon:(obj)=>(<Icon type="antdesign" name="user" color={obj.tintColor} size={22}/>) ,
          tabBarIcon:(obj)=>(<Icon name="carry-out" color={obj.tintColor}/>) 
      }
  },
  

},
{
  initialRouteName: 'Work',//第一次加载时初始选项卡路由的 routeName
  swipeEnabled: true, // 是否允许滑动切换tabs 默认是true
  animationEnabled: true, // 点击tab label切换tab时是否开启动画 默认为true
  // order: ['Settings', 'Home'],
  tabBarPosition: 'bottom', // tab bar显示的位置，默认是 'top'
  tabBarOptions: {
    activeTintColor: '#43AF35',
    inactiveTintColor: '#555',
    labelStyle: {
      fontSize: 8,
    },
    style: {
      backgroundColor: '#f2f2f2',
      // borderTopWidth: 0.5,
      borderTopColor: 'fff',
      height:60
      
    },
    indicatorStyle: {
      height: 0, // 不显示indicator
    },
    showIcon: true, // 是否显示图标, 默认为false
    showLabel: true, // 是否显示label
  },
}
)



const AppContainer = createAppContainer(Router);

// Now AppContainer is the main component for React to render
export default AppContainer;
 
