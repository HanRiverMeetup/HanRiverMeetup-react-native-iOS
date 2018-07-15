import { StackNavigator, SwitchNavigator } from 'react-navigation';
import Launch from '../screens/Launch';
import Login from '../screens/Login';
import MainTabbar from './tabNavi';
import HomeDetail from '../screens/HomeDetail';

const LoginStack = StackNavigator(
  {
    Login,
    MainTabbar,
    HomeDetail,
  },
  {
    headerMode: 'none',
  }
);

const AppStack = StackNavigator({ MainTabbar, HomeDetail }, { headerMode: 'none' });

export default SwitchNavigator({
  Launch,
  App: AppStack,
  Login: LoginStack,
});
