import React from 'react';
import {get} from 'lodash';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

import utils from '../../../utils'

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

const ImageWrapper = styled.View`
  align-items: flex-end;
`;

const ItemImage = styled.Image`
  width: 70px;
  height: 70px;
`;

const SelectedBadge = styled.View`
  position: absolute;
`;

export default (props) => {
  const {item, onPress, isSelectedItem} = props;

  const name = get(item, 'name', 'N/A');
  const price = get(item, 'current_price', 'N/A');
  const logo = get(item, 'images.thumb', '');

  return (
    <Wrapper activeOpacity={0.5} onPress={onPress}>
      <InfoWrapper>
        <Text>{name}</Text>
        <Text price>{`$${price}`}</Text>
      </InfoWrapper>
      <ImageWrapper>
        <ItemImage source={{uri: logo}} />
        {isSelectedItem ? (
          <SelectedBadge>
            <MCIcon
              name="checkbox-marked-circle"
              size={20}
              color={utils.colors.blue}
            />
          </SelectedBadge>
        ) : null}
      </ImageWrapper>
    </Wrapper>
  );
};
