import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.View`
  flex-direction: row;
`;

const Button = styled.TouchableOpacity`
  margin-horizontal: 5px;
`;

const BtnText = styled.Text`
  color: blue;
  text-decoration-line: underline;
`;

const Text = styled.Text``;

export default class TermCondition extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <Button>
          <BtnText>Term of Service </BtnText>
        </Button>
        <Text>and</Text>
        <Button>
          <BtnText>Privacy Policy</BtnText>
        </Button>
      </Wrapper>
    );
  }
}
