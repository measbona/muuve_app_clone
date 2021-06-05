import React from 'react';
import styled from 'styled-components/native';

import Device from '../../utils/device';
import Colors from '../../utils/colors';

import Content from './components/Content';

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const HeaderWrapper = styled.View`
  padding-top: ${Device.hasNotch ? 40 : 15}px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.yellow};
  border-bottom-left-radius: 17px;
  border-bottom-right-radius: 17px;
`;

const Image = styled.Image``;

const Row = styled.View`
  flex-direction: row;
`;

const FooterWrapper = styled.View`
  align-items: center;
  padding-bottom: 10px;
  padding-top: 20px;
  justify-content: center;
  border-top-left-radius: 17px;
  border-top-right-radius: 17px;
  background-color: ${Colors.yellow};
  padding-bottom: ${Device.isIphoneX ? 30 : 20}px;
`;

const Text = styled.Text`
  font-size: 11px;
  font-weight: bold;
  color: ${Colors.black};
  ${(props) => props.color && `color: blue; text-decoration: underline`}
`;

export default class PhoneLogin extends React.PureComponent {
  render() {
    return (
      <Container>
        <HeaderWrapper>
          <Image
            style={{width:120, height: 120}}
            source={require('../../assets/images/muuve_logo.png')}
          />
        </HeaderWrapper>
        <Content />
        <FooterWrapper>
          <Text>By continuing your agree to our</Text>
          <Row>
            <Text color onPress={() => {}}>
              Terms of Service
            </Text>
            <Text> and</Text>
            <Text color onPress={() => {}}>
              {' '}
              Privacy Policy
            </Text>
          </Row>
        </FooterWrapper>
      </Container>
    );
  }
}
