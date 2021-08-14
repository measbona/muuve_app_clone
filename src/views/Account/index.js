import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components/native';
import IOIcon from 'react-native-vector-icons/Ionicons';
import ATIcon from 'react-native-vector-icons/AntDesign';
import FTOIcon from 'react-native-vector-icons/Fontisto';
import MDICon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {showModalChoice} from '../../navigation/screen';

import Header from './components/Header';
import Row from './components/Row';

import Modules from '../../modules';
import utils from '../../utils';

const Container = styled.View``;

const Divider = styled.View`
  height: 5px;
  background-color: ${utils.colors.lightGrey};
`;

class Account extends React.Component {
  constructor(props) {
    super(props);

    const {profile} = props;

    this.state = {
      user: profile || {},
    };
  }

  componentDidUpdate(prevProps) {
    const {profile} = this.props;
    const {profile: prevProfile} = prevProps;

    if (prevProfile !== profile) {
      this.setState({user: profile});
    }
  }

  onLogOutPress = () => {
    return showModalChoice({
      headline: 'LOG OUT',
      description: 'Are you sure you want to logout?',
      no: 'Cancel',
      yes: 'Log out',
      onPress: () => Modules.Profile.signOut(),
    });
  };

  render() {
    const {user} = this.state;
    const {componentId} = this.props;

    return (
      <Container>
        <Header user={user} componentId={componentId} />
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

const mapState = ({profile}) => ({
  profile: profile.data,
});

export default connect(mapState)(Account);
