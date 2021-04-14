import React from 'react';
import {View, Text} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Entry Page</Text>
        <AntDesignIcon name="stepforward" />
      </View>
    );
  }
}
