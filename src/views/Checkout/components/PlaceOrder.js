import React from 'react';
import styled from 'styled-components/native';

import Colors from '../../../utils/colors';

const Wrapper = styled.View`
  padding-bottom: 15px;
  justify-content: center;
  border-top-left-radius: 17px;
  border-top-right-radius: 17px;
  background-color: ${Colors.lightGrey};
`;

const Button = styled.TouchableOpacity`
  align-items: center;
  border-radius: 15px;
  margin-vertical: 16px;
  padding-vertical: 10px;
  margin-horizontal: 16px;
  background-color: ${Colors.yellow};
`;

const ButtonText = styled.Text`
  font-weight: bold;
`;

export default (props) => {
  const {onPress} = props;

  return (
    <Wrapper>
      <Button activeOpacity={0.7} onPress={onPress}>
        <ButtonText>PLACE ORDER</ButtonText>
      </Button>
    </Wrapper>
  );
};
