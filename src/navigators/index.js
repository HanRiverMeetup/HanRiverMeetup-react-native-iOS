//input main navigator sources here
import { StackNavigator, SwitchNavigator, NavigationActions } from "react-navigation"
import 

export default SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: MainStack
  },
  { initialRouteName: "AuthLoading" }
)
