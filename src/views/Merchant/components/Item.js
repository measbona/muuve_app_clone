import React from 'react';
import {get} from 'lodash'
import styled from 'styled-components/native';

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  padding-horizontal: 20px;
  justify-content: space-between;
`;

const InfoWrapper = styled.View`
  justify-content: space-between;
`;

const Text = styled.Text`
  font-weight: 600;
  font-size: ${(props) => (props.price ? 12 : 14)}px;
`;

const ItemImage = styled.Image`
  width: 70px;
  height: 70px;
`;

export default (props) => {
  const {item, onPress} = props

  const name = get(item, 'name', 'N/A')
  const price = get(item, 'current_price', 'N/A')
  const logo = get(item, 'images.thumb', '')

  return (
    <Wrapper activeOpacity={0.5} onPress={onPress}>
      <InfoWrapper>
        <Text>{name}</Text>
        <Text price>{`$${price}`}</Text>
      </InfoWrapper>
      <ItemImage source={{ uri:logo }} />
    </Wrapper>
  );
};
