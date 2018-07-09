import React, { Component } from "react"
import { Platform, StyleSheet, Text, View, TouchableOpacity } from "react-native"

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Join</Text>
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
