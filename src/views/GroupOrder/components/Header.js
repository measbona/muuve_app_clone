import React from 'react';
import styled from 'styled-components';

import MTIcon from 'react-native-vector-icons/MaterialIcons';

const Wrapper = styled.View`
  padding-top: 60px;
  align-items: center;
  padding-left: 20px;
  flex-direction: row;
  padding-bottom: 20px;
  background-color: #fcbd3e;
  border-bottom-left-radius: 17px;
  border-bottom-right-radius: 17px;
`;

const BackButtonWrapper = styled.TouchableOpacity``;

const Text = styled.Text`
  font-size: 18px;
  margin-left: 10px;
  font-weight: bold;
`;

export default class header extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <BackButtonWrapper activeOpacity={0.7}>
          <MTIcon name="arrow-back" size={23} />
        </BackButtonWrapper>
        <Text>Group Order</Text>
      </Wrapper>
    );
  }
}
