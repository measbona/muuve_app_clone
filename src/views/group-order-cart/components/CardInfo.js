import React from 'react';
import styled from 'styled-components/native';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../../utils/colors';

const Wrapper = styled.View`
  margin-vertical: 16px;
  min-height: 110px;
  background-color: ${Colors.lightGrey};
  justify-content: space-between;
  border-radius: 17px;
  margin-horizontal: 16px;
  padding-horizontal: 16px;
  flex-direction: row;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MerchantNameWrapper = styled.View``;

const Column = styled.View`
  margin-vertical: 15px;
  justify-content: space-between;
`;

const InfoHealine = styled.Text`
  font-weight: bold;
  font-size: 15px;
  color: ${Colors.blue};
  margin-bottom: 3px;
`;

const Initiator = styled.Text`
  font-size: 12px;
  font-weight: 300;
`;

const ParticipantsWrapper = styled.View`
  margin-bottom: 5px;
`;

const Text = styled.Text`
  font-size: 12px;
  font-weight: 300;
`;

const ButtonWrapper = styled.View`
  margin-vertical: 15px;
  justify-content: space-between;
`;

const Button = styled.TouchableOpacity`
  background-color: ${Colors.grey};
  padding-horizontal: 20px;
  padding-vertical: 3px;
  border-radius: 50px;
`;

export default (props) => {
  const {onAddMoreParticipant, onEndSession} = props;

  return (
    <Wrapper>
      <Column>
        <Row>
          <MIcon
            name="group"
            size={35}
            color={Colors.blue}
            style={{marginRight: 10}}
          />
          <MerchantNameWrapper>
            <InfoHealine>Auntie Anne's Cambodia</InfoHealine>
            <Initiator>Group Order by Phom Leang Hy</Initiator>
          </MerchantNameWrapper>
        </Row>
        <ParticipantsWrapper>
          <Text>3 Items | 3 Participants</Text>
        </ParticipantsWrapper>
      </Column>
      <ButtonWrapper>
        <Button activeOpacity={0.7} onPress={onAddMoreParticipant}>
          <MIcon name="person-add" size={23} color={Colors.blue} />
        </Button>
        <Button activeOpacity={0.7} onPress={onEndSession}>
          <MIcon name="exit-to-app" size={23} color={Colors.blue} />
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};
