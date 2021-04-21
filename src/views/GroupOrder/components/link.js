import React from 'react';
import styled from 'styled-components';

const LinkWrapper = styled.View`
  margin-top: 5px;
  flex-direction: row;
`;

const LinkText = styled.View`
  width: 310px;
  height: 40px;
  align-items: flex-start;
  justify-content: center;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  background-color: lightgrey;
`;

const Text = styled.Text`
  margin-horizontal: 10px;
`;

const BtnCopy = styled.TouchableOpacity`
  width: 75px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #fcbd3e;
`;
const TextBtn = styled.Text`
  font-weight: 700;
`;
export default class Link extends React.PureComponent {
  render() {
    return (
      <LinkWrapper>
        <LinkText>
          <Text>https://www.google.com/</Text>
        </LinkText>
        <BtnCopy>
          <TextBtn>Copy</TextBtn>
        </BtnCopy>
      </LinkWrapper>
    );
  }
}
