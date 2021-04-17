import React from 'react';
import {Dimensions, Image} from 'react-native';
import styled from 'styled-components';
const SCREEN_WIDTH = Dimensions.get('screen').width;
import FontAwsomeIcon from 'react-native-vector-icons/FontAwesome';

const Wrapper = styled.View`
  height: 45px;
  align-items: center;
  border-radius: 50px;
  flex-direction: row;
  margin-horizontal: 5px;
  margin-vertical: 5px;
  background-color: lightgrey;
`;

const TextInput = styled.TextInput`
  height: 35px;
  margin-horizontal: 10px;
  width: ${SCREEN_WIDTH / 1.4}px;
`;

const Text = styled.Text``;

export default class InputNumber extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <Image
          style={{width: 30, height: 20, marginHorizontal: 15}}
          source={require('/Users/macbook/muuve_app_clone/assets/cambodia_flag.png')}
        />
        <Text>+ 855</Text>
        <TextInput placeholder="Enter your phone number" />
      </Wrapper>
    );
  }
}
