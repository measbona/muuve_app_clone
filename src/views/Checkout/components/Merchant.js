import React from 'react';
import styled from 'styled-components/native';
import MDIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../../utils/colors';

const Wrapper = styled.View`
  margin-top: 15px;
  flex-direction: row;
  padding-bottom: 15px;
  margin-horizontal: 16px;
  justify-content: space-between;
`;

const HeadlineWrapper = styled.View`
  margin-bottom: 15px;
`;

const Headline = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: ${Colors.blue};
`;

const SubHeadline = styled.Text`
  font-size: 12px;
  font-weight: 300;
`;

const EtaWrapper = styled.View``;

const Column = styled.View``;

const Row = styled.View`
  align-items: center;
  flex-direction: row;
`;

const Time = styled.Text`
  font-size: 30px;
  font-weight: 600;
  color: ${Colors.blue};
`;

const Period = styled.Text`
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 4px;
  align-self: flex-end;
  color: ${Colors.blue};
`;

const EtaLabel = styled.Text`
  font-size: 12px;
  font-weight: 300;
`;

const ClockWrapper = styled.View`
  align-items: center;
  align-self: flex-end;
`;

const Asap = styled.Text`
  font-weight: 700;
  color: ${Colors.blue};
`;

const Button = styled.TouchableOpacity`
  background-color: ${Colors.grey};
  border-radius: 50px;
  padding-vertical: 5px;
  padding-horizontal: 10px;
`;

const ButtonText = styled.Text`
  font-size: 11px;
  font-weight: 700;
  color: ${Colors.blue};
`;

export default (props) => {
  return (
    <Wrapper>
      <Column>
        <HeadlineWrapper>
          <Headline>Anntie Annie's Cambodia</Headline>
          <SubHeadline>Sorya Super Market</SubHeadline>
        </HeadlineWrapper>
        <EtaWrapper>
          <Row>
            <Time>7:47</Time>
            <Period>PM</Period>
          </Row>
          <EtaLabel>Estimate Arrival</EtaLabel>
        </EtaWrapper>
      </Column>

      <ClockWrapper>
        <Row>
          <MDIcon
            name="clock-fast"
            color={Colors.blue}
            size={55}
            style={{marginRight: 2}}
          />
          <Asap>ASAP</Asap>
        </Row>
        <Button activeOpacity={0.7}>
          <ButtonText>Change delivery time</ButtonText>
        </Button>
      </ClockWrapper>
    </Wrapper>
  );
};
