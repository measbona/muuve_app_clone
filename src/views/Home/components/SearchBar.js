import React from 'react';
import styled from 'styled-components/native';
import FontAwsomeIcon from 'react-native-vector-icons/FontAwesome';

import Colors from '../../../utils/colors';

const Wrapper = styled.View`
  align-items: center;
  height: 30px;
  border-radius: 50px;
  flex-direction: row;
  background-color: white;
  margin-horizontal: 16px;
`;

const TextInput = styled.TextInput`
  flex: 1;
  font-size: 13px;
`;

const Icon = styled(FontAwsomeIcon)`
  color: ${Colors.blue};
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
