import React from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
const SCREEN_WIDTH = Dimensions.get('screen').width;

const InputTextWrapper = styled.View`
  margin-bottom: 5px;
`;
const TextHeaderWrapper = styled.Text``;
const TextHeader = styled.Text``;
const TexHeaderValidation = styled.Text`
  color: red;
`;
const Wrapper = styled.View`
  border-radius: 50px;
  justify-content: center;
  background-color: #EEEDF2;
  margin-vertical : 10px;
  height:38px;
`;

const TextInput = styled.TextInput`
  padding-horizontal: 15px;
  width: ${SCREEN_WIDTH /2}px;
`;

const WrapperDob = styled.View`
  width: ${SCREEN_WIDTH}px;
  flex-direction: row;
`;
const WrapperDayMonYear = styled.View`
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  background-color: #EEEDF2;
  margin-vertical : 10px;
  margin-horizontal: 5px
  height:38px;
  width: ${(SCREEN_WIDTH / 3) - 20}px;
`;

const TextInputDayMonYear = styled.TextInput`
  justify-content: center;
  align-items: center;
  padding-horizontal: 10px;
`;

export default class InputText extends React.PureComponent {
  render() {
    return (
      <>
        <InputTextWrapper>
          <TextHeaderWrapper>
            <TextHeader>Family Name</TextHeader>
            <TexHeaderValidation>  *</TexHeaderValidation>
          </TextHeaderWrapper>
          <Wrapper>
              <TextInput placeholder="Enter your family name" />
          </Wrapper>
        </InputTextWrapper>

        <InputTextWrapper>
          <TextHeaderWrapper>
            <TextHeader>First Name</TextHeader>
            <TexHeaderValidation>  *</TexHeaderValidation>
          </TextHeaderWrapper>
          <Wrapper>
            <TextInput placeholder="Enter your first name" />
          </Wrapper>
        </InputTextWrapper>

        <InputTextWrapper>
          <TextHeaderWrapper>
            <TextHeader>Date of Birth</TextHeader>
          </TextHeaderWrapper>
          <WrapperDob>
            <WrapperDayMonYear>
              <TextInputDayMonYear keyboardType="numeric" placeholder="Day" />
            </WrapperDayMonYear>
            <WrapperDayMonYear>
              <TextInputDayMonYear keyboardType="numeric" placeholder="Month" />
            </WrapperDayMonYear>
            <WrapperDayMonYear>
              <TextInputDayMonYear keyboardType="numeric" placeholder="Year" />
            </WrapperDayMonYear>
          </WrapperDob>
        </InputTextWrapper>
      </>
    );
  }
}
