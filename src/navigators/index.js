import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Launch from '../screens/Launch';
import Login from '../screens/Login';
import MainTabbar from './tabNavi';
import HomeDetail from '../screens/HomeDetail';
import RoomIn from '../screens/RoomIn';
import MakeRoom from '../screens/MakeRoom';
import SignIn from '../screens/SignIn';
import JoinRoom from '../screens/JoinRoom';
import MakeTimeLine from '../screens/MakeTimeLine';
import MemberDetail from '../screens/MemberDetail';

const LoginStack = createStackNavigator(
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

//Base
const AppStack = createStackNavigator({ MainTabbar, HomeDetail, RoomIn }, { headerMode: 'none' });

const SignInStack = createStackNavigator(
  { SignIn, MainTabbar, HomeDetail, RoomIn },
  { headerMode: 'none' }
);

// Main
const AppWithModalStack = createStackNavigator(
  { AppStack, MakeRoom, JoinRoom, MakeTimeLine, MemberDetail },
  { headerMode: 'none', mode: 'modal' }
);

const SignInWithModalStack = createStackNavigator(
  { SignInStack, MakeRoom, JoinRoom, MakeTimeLine, MemberDetail },
  { headerMode: 'none', mode: 'modal' }
);

export default createSwitchNavigator({
  Launch,
  App: AppWithModalStack,
  SignIn: SignInWithModalStack,
  Login: LoginStack,
});
