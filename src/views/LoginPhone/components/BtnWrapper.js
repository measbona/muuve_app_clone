import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.TouchableOpacity`
  height: 45px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  flex-direction: row;
  margin-horizontal: 5px;
  margin-vertical: 5px;
  background-color: #fcbd3e;
`;

const Text = styled.Text`
  font-weight: bold;
`;

export default class Button extends React.PureComponent {
  render() {
    return (
      <ButtonWrapper activeOpacity={0.7}>
        <Text> GET STARTED </Text>
      </ButtonWrapper>
    );
  }
}
