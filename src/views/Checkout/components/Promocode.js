import React from 'react';
import styled from 'styled-components/native';

import Colors from '../../../utils/colors';

const Wrapper = styled.View`
  padding-top: 5px;
  margin-horizontal: 16px;
`;

const HealineWrapper = styled.View`
  margin-bottom: 5px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const Headline = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${Colors.blue};
  padding-vertical: 10px;
`;

const Button = styled.TouchableOpacity`
  border-radius: 50px;
  padding-vertical: 4px;
  padding-horizontal: 15px;
  background-color: ${Colors.grey};
`;

const ButtonText = styled.Text`
  font-size: 11px;
  font-weight: 700;
  color: ${Colors.blue};
`;

export default (props) => {
  return (
    <Wrapper>
      <HealineWrapper>
        <Headline>Promo Code</Headline>
        <Button activeOpacity={0.7}>
          <ButtonText>Apply Promo Code</ButtonText>
        </Button>
      </HealineWrapper>
    </Wrapper>
  );
};
