import React from 'react';
import styled from 'styled-components/native';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../../utils/colors';

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: 30px;
  padding-horizontal: 15px;
  justify-content: space-between;
`;

const Icon = styled(MIcon)`
  margin-top: 2px;
  margin-horizontal: 15px;
`;

const InfoWrapper = styled.View`
  flex-direction: row;
`;

const Info = styled.View``;

const MerchantName = styled.Text`
  font-size: 15px;
  font-weight: 700;
  color: ${Colors.blue};
`;

const Items = styled.Text`
  font-size: 13px;
  font-weight: 600;
`;

const Status = styled.Text`
  font-size: 13px;
  font-weight: 300;
`;

const ArrowWrapper = styled.View`
  align-self: center;
`;

const Arrow = styled(MIcon)`
  color: ${Colors.blue};
`;

export default (props) => {
  const {onPress} = props;

  return (
    <Wrapper activeOpacity={0.5} onPress={onPress}>
      <InfoWrapper>
        <Icon name="restaurant" size={20} />
        <Info>
          <MerchantName>Mere Cafe</MerchantName>
          <Items>1 Item - $2.25</Items>
          <Status>Arriving Soon</Status>
        </Info>
      </InfoWrapper>
      <ArrowWrapper>
        <Arrow name="arrow-forward-ios" size={13} />
      </ArrowWrapper>
    </Wrapper>
  );
};
