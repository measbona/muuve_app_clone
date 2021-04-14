import React from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import FontAwsomeIcon from 'react-native-vector-icons/FontAwesome';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const Wrapper = styled.View`
  align-items: center;
  border-radius: 50px;
  flex-direction: row;
  background-color: white;
`;

const TextInput = styled.TextInput`
  height: 35px;
  width: ${SCREEN_WIDTH / 1.4}px;
`;

const Icon = styled(FontAwsomeIcon)`
  color: #004da6;
  margin-horizontal: 15px;
`;

export default class SearchBar extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <Icon name="search" size={16} />
        <TextInput placeholder="Search stores or dishes" />
      </Wrapper>
    );
  }
}
