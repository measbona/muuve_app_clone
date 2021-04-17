import React from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';


const SCREEN_WIDTH = Dimensions.get('screen').width;

const Wrapper = styled.View`
  height: 100px;
  padding-top: 30px;
  padding-horizontal : 13px;
  flex-direction: row;
  background-color: #fcbd3e;
  align-items: center;
  width: ${SCREEN_WIDTH}px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

const ProfileName = styled.Text`
  font-weight: 900;
  padding-left:15px;
  font-size:22px;
`;

const FontAwsomeIconWrapper = styled.TouchableOpacity``;

export default class Header extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <FontAwsomeIconWrapper
          hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
          activeOpacity={0.5}
          onPress={() => alert('Here is back Button')}
        >
          <FontAwesomeIcon name="arrow-left" size={20}/>
        </FontAwsomeIconWrapper>
        
        <ProfileName>Profile</ProfileName>
      </Wrapper>
    );
  }
}
