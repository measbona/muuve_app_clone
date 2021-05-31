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
`;

const DateBirthWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const TextInputWrapper = styled.View`
  flex: 1;
  height: 40px;
  margin-top: 10px;
  border-radius: 17px;
  margin-horizontal: 2px;
  background-color: ${utils.colors.grey};
`;

const Skeleton = styled.View`
  margin-horizontal: 3px;
`;

const TextInput = styled.TextInput`
  flex: 1;
  font-size: 13px;
  font-weight: bold;
  align-self: center;
  color: ${utils.colors.black};
`;

export default ({name, onDayChange, onMonthChange, onYearChange}) => {
  return (
    <Wrapper>
      <TitleWrapper>
        <Title>{name}</Title>
      </TitleWrapper>
      <DateBirthWrapper>
        <TextInputWrapper>
          <TextInput
            keyboardType="number-pad"
            textAlign="right"
            placeholder="Day"
            onChangeText={(text) => onDayChange(text)}
          />
        </TextInputWrapper>
        <Skeleton />
        <TextInputWrapper>
          <TextInput
            keyboardType="default"
            textAlign="right"
            placeholder="Month"
            onChangeText={(text) => onMonthChange(text)}
          />
        </TextInputWrapper>
        <Skeleton />
        <TextInputWrapper>
          <TextInput
            keyboardType="number-pad"
            textAlign="right"
            placeholder="Year"
            onChangeText={(text) => onYearChange(text)}
          />
        </TextInputWrapper>
      </DateBirthWrapper>
    </Wrapper>
  );
};
