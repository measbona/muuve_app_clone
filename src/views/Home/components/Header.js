import React from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import SearchBar from './SearchBar';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const Wrapper = styled.View`
  height: 100px;
  padding-top: 30px;
  flex-direction: row;
  background-color: #fcbd3e;
  align-items: center;
  justify-content: center;
  width: ${SCREEN_WIDTH}px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

const CartButton = styled.TouchableOpacity`
  margin-left: 12px;
`;

export default class Header extends React.PureComponent {
  render() {
    const {onCartPress} = this.props;

    return (
      <Wrapper>
        <SearchBar />
        <CartButton
          hitSlop={{top: 12, bottom: 12, left: 12, right: 12}}
          activeOpacity={0.7}
          onPress={() => onCartPress('PropsPress')}>
          <FontAwesomeIcon name="shopping-basket" size={20} />
        </CartButton>
      </Wrapper>
    );
  }
}
