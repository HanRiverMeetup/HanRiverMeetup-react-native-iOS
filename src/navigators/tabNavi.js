// import { StackNavigator, SwitchNavigator, NavigationActions } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation';
import Home from '../screens/Home';
import Join from '../screens/Join';
import Map from '../screens/Map';
import MyPage from '../screens/MyPage';

export default createBottomTabNavigator(
  {
    Home,
    Join,
    Map,
    MyPage,
  },
  {
    tabBarOptions: {
      allowFontScaling: false,
      activeTintColor: '#2186f8',
      showIcon: true,
    },
  }
);
