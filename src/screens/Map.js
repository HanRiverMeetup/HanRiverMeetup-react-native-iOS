import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import styled from 'styled-components';
import Images from '@assets';

const TabIcon = styled.Image`
  width: 20px;
  height: 20px;
`;

export default class Home extends Component {
  static navigationOptions = () => ({
    title: '어디로강',
    tabBarIcon: ({ tintColor }) => <TabIcon source={Images.flag_icon} style={{ tintColor }} />,
  });

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
