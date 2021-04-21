import React from 'react';
import { Dimensions, Text, Image, Button, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import styled from 'styled-components/native';
import FontAwsomeIcon from 'react-native-vector-icons/FontAwesome';

const Container = styled.View`
  flex: 1;
`;
const Header = styled.View`
  height: 200px;
  background-color: #fcbd3e;
  borderBottomLeftRadius: 20;
  borderBottomRightRadius: 20;
`;
const Content = styled.View`
  flex: 1;
  background-color: white;  
`;
const Footer = styled.View`
  height: 100px;
  background-color: #fcbd3e;
  borderTopLeftRadius: 20;
  borderTopRightRadius: 20;
`;
const TextContent = styled.Text`
  height: 100px;
  margin-top: 80px;
  margin-left: 10px;
  font-size: 16px;
`;
// const TextInput = styled.TextInput`
//   height: 60px;
//   width: 60px;
//   margin-top: -65px;
//   margin-left: 15px;
//   background-color: whitesmoke;
//   borderTopLeftRadius: 20;
//   borderTopRightRadius: 20;
//   borderBottomLeftRadius: 20;
//   borderBottomRightRadius: 20;
// `;
const ImageLogo = styled.Image`
  height: 100px;
  width: 150px;
  margin: auto;
  margin-top: 80px;
 
`;

const TextContent1 = styled.Text`
  height: 100px;
  margin-top: 50px;
  font-size: 14px;
  font-weight: bold;
  textAlign: center;
`;

const TextContent2 = styled.Text`
  height: 100px;
  margin-top: px;
  font-size: 12px;
  textAlign: center;
  margin: auto;
  margin-top: 30px;
`;
const Text1 = styled.Text`
  margin-left: 100px;
  padding-left:100px;
`;
const ButtonWrapper = styled.TouchableOpacity`
  height: 45px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  flex-direction: row;
  margin-horizontal: 20px;
  margin-vertical: 5px;
  background-color: #fcbd3e;
  margin-top: 10px;
`;

const TextButton = styled.Text`
  font-weight: bold;
  font-size: 15px;
`;


const url = "https://google.com"

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: -65px;
`;

const InputWrapper = styled.View`
  width: 55px;
  height: 55px;
  border-radius: 18px;
  align-items: center;
  justify-content: center;
  margin-horizontal: 5px;
  background-color: whitesmoke;
`;

const InputText = styled.TextInput`
  margin-horizontal: 8px;
`;

const Text2 = styled.Text`
  color: blue;
  textDecorationLine: underline;
`;
const Text3 = styled.Text`
  color: blue;
  textDecorationLine: underline;
`;





export default class Verification extends React.PureComponent {
  render() {
    return (
      <Container>
        <Header>
          <ImageLogo source={require('../../../assets/muuve.png')} />
        </Header>
        <Content >

          <TextContent>
            Login with your phone number
                </TextContent>

          <Wrapper>
            <InputWrapper>
              <InputText hitSlop={{ top: 20, bottom: 20, left: 25, right: 25 }} />
            </InputWrapper>
            <InputWrapper>
              <InputText hitSlop={{ top: 20, bottom: 20, left: 25, right: 25 }} />
            </InputWrapper>
            <InputWrapper>
              <InputText hitSlop={{ top: 20, bottom: 20, left: 28, right: 25 }} />
            </InputWrapper>
            <InputWrapper>
              <InputText hitSlop={{ top: 20, bottom: 20, left: 25, right: 25 }} />
            </InputWrapper>
            <InputWrapper>
              <InputText hitSlop={{ top: 20, bottom: 20, left: 25, right: 25 }} />
            </InputWrapper>
            <InputWrapper>
              <InputText hitSlop={{ top: 20, bottom: 20, left: 25, right: 25 }} />
            </InputWrapper>
          </Wrapper>




          <ButtonWrapper activeOpacity={0.7}>
            <TextButton> Next </TextButton>
          </ButtonWrapper>


          <TextContent1>
            Did not receive a code?
                </TextContent1>



        </Content>

        <Footer>
          <TextContent2>
            <Text1>By continuing you agree to our </Text1>
            <Text2 onPress={() => Linking.openURL(url)}> {'\n'} Terms of Services </Text2>
            <Text> and</Text>
            <Text3 onPress={() => Linking.openURL(url)}> Privacy Policy</Text3>
          </TextContent2>
        </Footer>

      </Container>
    );
  }
}