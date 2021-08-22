/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Image,
  Share,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import firebase from '@react-native-firebase/app';

import utils from '../../utils';
import Modules from '../../modules';

import NavBar from '../../lib/NavBar';
import LinkBox from './components/LinkBox';

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: utils.colors.white,
  },
  contentWrapper: {
    marginTop: 15,
    marginHorizontal: 16,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    color: utils.colors.yellow,
  },
  imageWrapper: {
    alignItems: 'center',
  },
  image: {
    width: 220,
    height: 220,
  },
  button: {
    borderRadius: 15,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: utils.colors.blue,
  },
});

class GroupOrder extends React.PureComponent {
  state = {
    url: null,
  };

  componentDidMount() {
    this.createGroupOrderLink();
  }

  createGroupOrderLink = async () => {
    const {user} = this.props;

    const {id: gcid} = firebase.firestore().collection('group_orders').doc();

    const deepLink = `https://muuveclone.page.link/grouporder?gcid=${gcid}`;

    const linkParams = {
      deepLink,
      domain: 'https://muuveclone.page.link',
      title: 'Group Order',
      description: `${user.family_name} ${user.first_name} would like to invite you to join the order`,
    };

    const dynamicLink = await Modules.DynamicLinks.buildShortLink(linkParams);

    this.setState({url: dynamicLink});
  };

  onSharePress = async () => {
    const {url} = this.state;

    try {
      const result = await Share.share({
        url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const {url} = this.state;
    const {componentId} = this.props;

    return (
      <View style={styles.conatiner}>
        <NavBar
          title="Group Order"
          componentId={componentId}
          style={{backgroundColor: utils.colors.yellow}}
        />

        <View style={styles.contentWrapper}>
          <View>
            <Text style={[styles.text, {marginBottom: 10}]}>
              Start a group order
            </Text>
            <Text
              style={[styles.text, {fontSize: 14, color: utils.colors.black}]}>
              Allow participants to add items to your order. Large orders many
              take longer to prepare.
            </Text>
          </View>
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={require('../../assets/images/friends.png')}
            />
          </View>

          <LinkBox url={url} />

          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            onPress={this.onSharePress}>
            <Text
              style={[styles.text, {fontSize: 14, color: utils.colors.white}]}>
              SHARE LINK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapState = ({profile}) => ({
  user: profile.data,
});

export default connect(mapState)(GroupOrder);
