import React from 'react';
import styled from 'styled-components/native';

import utils from '../../utils';

import IOIcon from 'react-native-vector-icons/Ionicons';
import ATIcon from 'react-native-vector-icons/AntDesign';
import FTOIcon from 'react-native-vector-icons/Fontisto';
import MDICon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Header from './components/Header';
import Row from './components/Row';

const Container = styled.View`
  flex: 1;
`;

const Divider = styled.View`
  height: 10px;
  background-color: ${utils.colors.lightGrey};
`;

export default class Account extends React.Component {
  render() {
    const {componentId} = this.props;

    return (
      <Container>
        <Header componentId={componentId} />
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
          onPress={() => {}}
        />
      </Container>
    );
  }
}
