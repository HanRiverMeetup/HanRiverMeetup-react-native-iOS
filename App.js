import React, { Component } from "react"
import { Platform, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { LoginManager, LoginButton, AccessToken } from "react-native-fbsdk"

export default class FBLogin extends Component {
  _fbAuth = () => {
    LoginManager.logInWithReadPermissions(["public_profile"]).then(
      function(result) {
        if (result.isCancelled) {
          console.log("Login Cancelled")
        } else {
          console.log("Login Success permission granted:" + result.grantedPermissions)
        }
      },
      function(error) {
        console.log("some error occurred!!")
      }
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <TouchableOpacity onPress={this._fbAuth}>
          <Text>Login With Facebook</Text>
        </TouchableOpacity> */}
        <LoginButton
          readPermissions={["email", "public_profile"]}
          // publishPermissions={["publish_actions"]}
          onLoginFinished={(error, result) => {
            if (error) {
              alert("login has error: " + result.error)
            } else if (result.isCancelled) {
              alert("login is cancelled.")
            } else {
              AccessToken.getCurrentAccessToken().then(data => {
                console.log("fb data: ", data)
                alert(data.accessToken.toString())
              })
            }
          }}
          onLogoutFinished={() => alert("logout.")}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
})
