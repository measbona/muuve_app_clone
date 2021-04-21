import React from 'react';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const Wrapper = styled.View``;
const BunttonNotification = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height:46px;
  background-color: white;
  padding-horizontal : 15px;
`;

const IconWrapper = styled.View`
  width: 20px;
  align-items: center;
`;

const TextNotification = styled.Text`
  width: ${SCREEN_WIDTH - 115}px;
  margin-left: 15px;
  font-size: 14px;
`;

export default class Notification extends React.Component {
  render() {
    return (
      <Wrapper>
        <BunttonNotification
          activeOpacity={0.7}
          onPress={() => alert('Notification')}
        >
          <IconWrapper>
            <Ionicons name="notifications" size={18}/>
          </IconWrapper>
          <TextNotification>Notification</TextNotification>
        </BunttonNotification>
      </Wrapper>
    );
  }
}