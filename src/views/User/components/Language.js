import React from 'react';
import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/AntDesign';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const Wrapper = styled.View``;
const WhiteSpace = styled.View`
  height: 10px;
  width: ${SCREEN_WIDTH}px;
  background-color: white;
`;
const BunttonLanguage = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height:46px;
  background-color: white;
  padding-horizontal : 15px;
`;
const TextLanguage = styled.Text`
  width: ${SCREEN_WIDTH - 115}px;
  margin-left: 15px;
  font-size: 14px;
`;

const IconWrapper = styled.View`
  width: 20px;
  align-items: center;
`;

const TextLanguageChange = styled.Text`
  width: 50px;
  color: #0A5BB2;
  font-weight: 700;
  text-align: right;
  font-size: 14px;
`;

export default class Profile extends React.Component {
  render() {
    return (
      <Wrapper>
        <WhiteSpace />
        <BunttonLanguage
          activeOpacity={0.7}
          onPress={() => alert('language')}
        >
          <IconWrapper>
            <FontAwesomeIcon name="earth" size={18}/>
          </IconWrapper>
          
          <TextLanguage>Language</TextLanguage>
          <TextLanguageChange>KH</TextLanguageChange>
        </BunttonLanguage>
      </Wrapper>
    );
  }
}