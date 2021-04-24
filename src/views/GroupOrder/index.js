import React from 'react';
import styled from 'styled-components';

import Header from './components/Header';
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
  color: #fcbd3e;
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
  background-color: rgba(0, 78, 162, 1);
`;

const ShareLink = styled.Text`
  color: white;
  font-size: 13px;
  font-weight: bold;
`;

export default class GroupOrder extends React.PureComponent {
  render() {
    return (
      <Container>
        <Header />
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
          <ShareLinkWrapper activeOpacity={0.7}>
            <ShareLink>SHARE LINK</ShareLink>
          </ShareLinkWrapper>
        </ContentWrapper>
      </Container>
    );
  }
}
