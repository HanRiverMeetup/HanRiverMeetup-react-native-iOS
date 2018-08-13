import { StackNavigator, SwitchNavigator } from 'react-navigation';
import Launch from '../screens/Launch';
import Login from '../screens/Login';
import MainTabbar from './tabNavi';
import HomeDetail from '../screens/HomeDetail';
import RoomIn from '../screens/RoomIn';
import MakeRoom from '../screens/MakeRoom';
import SignIn from '../screens/SignIn';

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

const SignInStack = StackNavigator(
  { SignIn, MainTabbar, HomeDetail, RoomIn },
  { headerMode: 'none' }
);

const AppWithModalStack = StackNavigator(
  { AppStack, MakeRoom },
  { headerMode: 'none', mode: 'modal' }
);

const SignInWithModalStack = StackNavigator(
  { SignInStack, MakeRoom },
  { headerMode: 'none', mode: 'modal' }
);

export default SwitchNavigator({
  Launch,
  App: AppWithModalStack,
  SignIn: SignInWithModalStack,
  Login: LoginStack,
});
