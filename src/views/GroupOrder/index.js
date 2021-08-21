import React from 'react';
import {connect} from 'react-redux';
import {Share} from 'react-native';
import styled from 'styled-components';
import firebase from '@react-native-firebase/app';

import Modules from '../../modules';
import utils from '../../utils';

import NavigationBack from '../../lib/NavigationBack';
import LinkBox from './components/LinkBox';

const Container = styled.View`
  flex: 1;
`;

const ContentWrapper = styled.View`
  margin-top: 30px;
  margin-horizontal: 25px;
`;

const HeadlineWrapper = styled.View``;

const Headline = styled.Text`
  color: ${utils.colors.yellow};
  font-size: 17px;
  font-weight: bold;
`;

const Info = styled.Text`
  font-size: 13px;
  margin-top: 5px;
  font-weight: 300;
`;

const ImageWrapper = styled.View`
  align-items: center;
`;

const Image = styled.Image`
  width: 250px;
  height: 250px;
`;

const ShareLinkWrapper = styled.TouchableOpacity`
  height: 35px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  border-radius: 10px;
  flex-direction: row;
  background-color: ${utils.colors.blue};
`;

const ShareLink = styled.Text`
  color: white;
  font-size: 13px;
  font-weight: bold;
`;

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
      <Container>
        <NavigationBack
          title="Group Order"
          navigate
          componentId={componentId}
        />
        <ContentWrapper>
          <HeadlineWrapper>
            <Headline>Start a group order</Headline>
            <Info>
              Allow participants to add items to your order. Large orders many
              take longer to prepare.
            </Info>
          </HeadlineWrapper>
          <ImageWrapper>
            <Image source={require('../../assets/images/friends.png')} />
          </ImageWrapper>
          <LinkBox url={url} />
          <ShareLinkWrapper activeOpacity={0.7} onPress={this.onSharePress}>
            <ShareLink>SHARE LINK</ShareLink>
          </ShareLinkWrapper>
        </ContentWrapper>
      </Container>
    );
  }
}

const mapState = ({profile}) => ({
  user: profile.data,
});

export default connect(mapState)(GroupOrder);
