import React from 'react';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const Wrapper = styled.View`
  margin-top:7px;
`;
const BunttonLogout = styled.TouchableOpacity`
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

const TextLogout = styled.Text`
  width: ${SCREEN_WIDTH - 115}px;
  margin-left: 15px;
  font-size: 14px;
  color: #FA5D68;
`;

export default class Logout extends React.Component {
  render() {
    return (
      <Wrapper>
        <BunttonLogout
          activeOpacity={0.7}
          onPress={() => alert('Log out')}
        >
          <IconWrapper>
            <MaterialCommunityIcons style={{color: '#FA5D68'}} name="logout" size={18}/>
          </IconWrapper>
          <TextLogout>Log out</TextLogout>
        </BunttonLogout>
      </Wrapper>
    );
  }
}