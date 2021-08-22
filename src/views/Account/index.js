/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import * as Navigator from '../../navigation/screen';
import ADIcon from 'react-native-vector-icons/AntDesign';
import FIcon from 'react-native-vector-icons/Fontisto';
import MDICon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Row from './components/Row';
import Header from './components/Header';

import utils from '../../utils';
import Modules from '../../modules';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: utils.colors.lightGrey,
  },
  divider: {
    paddingVertical: 4,
    backgroundColor: utils.colors.lightGrey,
  },
});

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
    return Navigator.showModalChoice({
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
      <View style={styles.container}>
        <Header user={user} componentId={componentId} />

        <Row
          name="Language"
          icon={ADIcon}
          iconName="earth"
          iconSize={18}
          value="EN"
          onPress={() => {}}
        />
        <Row
          name="Currency"
          icon={FIcon}
          iconName="dollar"
          iconSize={18}
          value="USD"
          onPress={() => {}}
        />
        <Row
          name="Notification"
          icon={MCIcon}
          iconName="bell"
          iconSize={20}
          onPress={() => {}}
        />
        <View style={styles.divider} />
        <Row
          logout
          name="Log out"
          icon={MDICon}
          iconName="exit-to-app"
          iconSize={20}
          onPress={this.onLogOutPress}
        />
      </View>
    );
  }
}

const mapState = ({profile}) => ({
  profile: profile.data,
});

export default connect(mapState)(Account);
