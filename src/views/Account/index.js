import React from 'react';
import styled from 'styled-components/native';
import Auth from '@react-native-firebase/auth';
import { showModalChoice } from '../../navigation/screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import utils from '../../utils';

import IOIcon from 'react-native-vector-icons/Ionicons';
import ATIcon from 'react-native-vector-icons/AntDesign';
import FTOIcon from 'react-native-vector-icons/Fontisto';
import MDICon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from './components/Header';
import Row from './components/Row';

const Container = styled.View``;

const Divider = styled.View`
  height: 5px;
  background-color: ${utils.colors.lightGrey};
`;

export default class Account extends React.Component {
  state = {
    user: null
  }

  componentDidMount() {
    this.getCurrentUserData()
  }

  getCurrentUserData = async () => {
    const userStorage = await AsyncStorage.getItem('user')
    const user = JSON.parse(userStorage)

    this.setState({ user })
  }

  onLogOutPress = () => {
    showModalChoice({
      headline: 'LOG OUT',
      description: 'Are you sure you want to logout?',
      no: 'Cancel',
      yes: 'Log out',
      onPress: () => Auth().signOut(),
    });
  };

  onViewAccountSavePress = (data) => {
    return this.setState({ user: data })
  }

  render() {
    const { user } = this.state
    const { componentId } = this.props;

    return (
      <Container>
        <Header user={user} componentId={componentId} onSavePress={this.onViewAccountSavePress}/>
        <Row
          name="Language"
          icon={ATIcon}
          iconName="earth"
          iconSize={16}
          value="EN"
          onPress={() => {}}
        />
        <Row
          name="Currency"
          icon={FTOIcon}
          iconName="dollar"
          iconSize={16}
          value="USD"
          onPress={() => {}}
        />
        <Row
          name="Help Center"
          icon={IOIcon}
          iconName="help-circle-outline"
          iconSize={19}
          onPress={() => {}}
        />
        <Row
          name="Notification"
          icon={MCIcon}
          iconName="bell"
          iconSize={18}
          onPress={() => {}}
        />
        <Divider />
        <Row
          logout
          name="Log out"
          icon={MDICon}
          iconName="exit-to-app"
          iconSize={18}
          onPress={this.onLogOutPress}
        />
      </Container>
    );
  }
}
