import React from 'react';
import styled from 'styled-components/native';
import FontAwsomeIcon from 'react-native-vector-icons/FontAwesome';

import Colors from '../../../utils/colors';

const Wrapper = styled.View`
  padding: 9px;
  margin-vertical: 15px;
  border-radius: 50px;
  flex-direction: row;
  margin-horizontal: 16px;
  background-color: ${Colors.grey};
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 13px;
`;

export default (props) => {
  return (
    <Wrapper>
      <FontAwsomeIcon
        name="search"
        size={14}
        style={{paddingHorizontal: 10, alignSelf: 'center', color: Colors.blue}}
      />
      <Input placeholder="Search" autoCapitalize="none" />
    </Wrapper>
  );
};
