import React from 'react';
import styled from 'styled-components/native';

import utils from '../../../utils';

const Wrapper = styled.View`
  margin-top: 15px;
`;

const TitleWrapper = styled.View`
  flex-direction: row;
`;

const Title = styled.Text`
  font-size: 14px;
  color: ${utils.colors.black};
`;

const Require = styled.Text`
  color: red;
  margin-left: 7px;
`;

const TextInputWrapper = styled.View`
  height: 40px;
  margin-top: 10px;
  border-radius: 17px;
  margin-horizontal: 2px;
  background-color: ${utils.colors.lightGrey};
`;

const TextInput = styled.TextInput`
  flex: 1;
  font-size: 13px;
  font-weight: bold;
  margin-left: 15px;
  color: ${utils.colors.black};
`;

export default ({name, placeholder, onChange}) => {
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{name}</Title>
        <Require>*</Require>
      </TitleWrapper>
      <TextInputWrapper>
        <TextInput
          placeholder={placeholder}
          onChangeText={(text) => onChange(text)}
        />
      </TextInputWrapper>
    </Wrapper>
  );
};
