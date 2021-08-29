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
import * as Navigator from '../../navigation/screen';
import * as Animatable from 'react-native-animatable';

import utils from '../../utils';
import Modules from '../../modules';

import NavBar from '../../lib/NavBar';
import Loading from '../../lib/Loading';
import LinkBox from './components/LinkBox';

import OrderActions from '../../redux/OrderRedux';

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
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
});

class GroupOrder extends React.PureComponent {
  state = {
    url: null,
    mounted: false,
    urlLoaded: false,
  };

  componentDidMount() {
    this.createGroupOrderLink();

    Navigator.bindComponent(this);
  }

  componentDidAppear() {
    this.setState({mounted: true});
  }

  createGroupOrderLink = async () => {
    const {profile, setGroupOrderData} = this.props;

    try {
      const {id: gcid} = firebase.firestore().collection('group_orders').doc();
      const deepLink = `https://muuveclone.page.link/grouporder?gcid=${gcid}`;

      const linkParams = {
        deepLink,
        domain: 'https://muuveclone.page.link',
        title: 'Group Order',
        description: `${profile.family_name} ${profile.first_name} would like to invite you to join the order`,
      };

      const url = await Modules.DynamicLinks.buildShortLink(linkParams);
      const groupOrderData = await Modules.Order.createGroupOrder({
        url,
        ...this,
        groupKey: gcid,
      });

      await setGroupOrderData(groupOrderData);

      this.setState({url, urlLoaded: true});
    } catch (error) {
      Navigator.showModalNotice({
        headline: 'Oops!!',
        description:
          'Something went wrong while creating group order.\nPlease try again.',
        buttonName: 'Continue',
      });
    }
  };

  onSharePress = async () => {
    const {url} = this.state;
    const {profile} = this.props;

    try {
      await Share.share({
        message: `${profile.family_name} ${profile.first_name} would like to invite you to join the order.\n${url}`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const {url, mounted, urlLoaded} = this.state;
    const {componentId} = this.props;

    return (
      <View style={styles.conatiner}>
        <NavBar
          title="Group Order"
          componentId={componentId}
          style={{backgroundColor: utils.colors.yellow}}
        />

        {urlLoaded && mounted ? (
          <Animatable.View
            style={styles.contentWrapper}
            animation="fadeIn"
            duration={300}>
            <View>
              <Text style={[styles.text, {marginBottom: 10, fontSize: 18}]}>
                Start a group order
              </Text>
              <Text
                style={[
                  styles.text,
                  {fontSize: 14, color: utils.colors.black},
                ]}>
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
                style={[
                  styles.text,
                  {fontSize: 14, color: utils.colors.white},
                ]}>
                SHARE LINK
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        ) : (
          <View style={styles.loading}>
            <Loading color="yellow" style={{alignSelf: 'center'}} />
          </View>
        )}
      </View>
    );
  }
}

const mapState = ({profile, cart}) => ({
  cart: cart.data,
  profile: profile.data,
});

const mapDispatch = {
  setGroupOrderData: OrderActions.setGroupOrderData,
};

export default connect(mapState, mapDispatch)(GroupOrder);
