import React from 'react';
import styled from 'styled-components/native';

import utils from '../../utils';

import Content from './components/Content';

const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const HeaderWrapper = styled.View`
  padding-top: 50px;
  align-items: center;
  justify-content: center;
  background-color: ${utils.colors.yellow};
  border-bottom-left-radius: 17px;
  border-bottom-right-radius: 17px;
`;

const Image = styled.Image``;

const Row = styled.View`
  flex-direction: row;
`;

const FooterWrapper = styled.View`
  height: 85px;
  align-items: center;
  padding-bottom: 10px;
  justify-content: center;
  background-color: ${utils.colors.yellow};
  border-top-left-radius: 17px;
  border-top-right-radius: 17px;
`;

const Text = styled.Text`
  font-size: 11px;
  color: ${utils.colors.black};
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
