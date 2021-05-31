import React from 'react';
import styled from 'styled-components/native';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../../utils/colors';

const Wrapper = styled.View`
  padding-top: 5px;
  padding-bottom: 15px;
  margin-horizontal: 16px;
`;

const HealineWrapper = styled.View`
  margin-bottom: 5px;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

const Button = styled.TouchableOpacity`
  border-radius: 50px;
  padding-vertical: 4px;
  padding-horizontal: 15px;
  background-color: ${Colors.grey};
`;

const Headline = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${Colors.blue};
  padding-vertical: 10px;
`;

const ButtonText = styled.Text`
  font-size: 11px;
  font-weight: 700;
  color: ${Colors.blue};
`;

const Location = styled.View`
  flex-direction: row;
`;

const Column = styled.View``;

const LocationName = styled.Text`
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const PlaceName = styled.Text`
  font-size: 11px;
  font-weight: 300;
`;

export default (props) => {
  return (
    <Wrapper>
      <HealineWrapper>
        <Headline>Delivery Location</Headline>
        <Button activeOpacity={0.7}>
          <ButtonText>Change</ButtonText>
        </Button>
      </HealineWrapper>
      <Location>
        <MIcon name="my-location" size={18} style={{marginRight: 10}} />
        <Column>
          <LocationName>Current Location</LocationName>
          <PlaceName>Street 67 5A, 120020 Doun Penh, Cambodia</PlaceName>
        </Column>
      </Location>
    </Wrapper>
  );
};
