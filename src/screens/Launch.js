import React, { Component } from "react"
import { Platform, StyleSheet, Text, View, TouchableOpacity } from "react-native"

export default class Launch extends Component {
  componentDidMount() {
    // this.props.navigation.navigate("Login")
    this.props.navigation.navigate("App")
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>LaunchScreen</Text>
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
