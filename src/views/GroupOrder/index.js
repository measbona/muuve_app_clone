import React from 'react';
import {Share} from 'react-native';
import styled from 'styled-components';

import Colors from '../../utils/colors';

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
  color: ${Colors.yellow};
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
  background-color: ${Colors.blue};
`;

const ShareLink = styled.Text`
  color: white;
  font-size: 13px;
  font-weight: bold;
`;

export default class GroupOrder extends React.PureComponent {
  onSharePress = async () => {
    try {
      const result = await Share.share({
        url: 'https://stgmuuve.page.link/5SFGTV78SSKJ23',
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
          <LinkBox />
          <ShareLinkWrapper activeOpacity={0.7} onPress={this.onSharePress}>
            <ShareLink>SHARE LINK</ShareLink>
          </ShareLinkWrapper>
        </ContentWrapper>
      </Container>
    );
  }
}
