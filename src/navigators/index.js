//input main navigator sources here
import { StackNavigator, SwitchNavigator, NavigationActions } from "react-navigation"
import Launch from "../screens/Launch"
import Login from "../screens/Login"
import MainTabbar from "./tabNavi"

const LoginStack = StackNavigator(
  {
    Login,
    MainTabbar
  },
  {
    headerMode: "none"
  }
)

const AppStack = StackNavigator({ MainTabbar }, { headerMode: "none" })

export default SwitchNavigator({
  Launch,
  App: AppStack,
  Login: LoginStack
})
