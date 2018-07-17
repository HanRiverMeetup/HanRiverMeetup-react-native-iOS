import { StackNavigator, SwitchNavigator } from 'react-navigation';
import Launch from '../screens/Launch';
import Login from '../screens/Login';
import MainTabbar from './tabNavi';
import HomeDetail from '../screens/HomeDetail';
import RoomIn from '../screens/RoomIn';

const LoginStack = StackNavigator(
  {
    Login,
    MainTabbar,
    HomeDetail,
    RoomIn,
  },
  {
    headerMode: 'none',
  }
);

const AppStack = StackNavigator({ MainTabbar, HomeDetail, RoomIn }, { headerMode: 'none' });

export default SwitchNavigator({
  Launch,
  App: AppStack,
  Login: LoginStack,
});
