import React from 'react';
import styled from 'styled-components/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';

import Colors from '../../../utils/colors';
import Device from '../../../utils/device';

import SearchBar from './SearchBar';

const Wrapper = styled.View`
  padding-bottom: 15px;
  border-bottom-left-radius: 17px;
  border-bottom-right-radius: 17px;
  background-color: ${Colors.yellow};
  padding-top: ${Device.hasNotch ? 40 : 10}px;
`;

const CartButton = styled.TouchableOpacity`
  align-self: flex-end;
`;

const LocationWrapper = styled.View`
  margin-bottom: 5px;
  flex-direction: row;
  padding-vertical: 12px;
  margin-horizontal: 20px;
  justify-content: space-between;
`;

const LocationName = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${Colors.blue};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PlaceName = styled.Text`
  font-size: 10px;
`;

const Column = styled.View`
  align-items: center;
`;

const BlankSpace = styled.View`
  margin-right: 25px;
`;

export default class Header extends React.PureComponent {
  render() {
    const {onCartPress} = this.props;

    return (
      <Wrapper>
        <LocationWrapper>
          <BlankSpace />
          <Column>
            <Row>
              <MIcon name="my-location" size={17} style={{marginRight: 3}} />
              <LocationName>Current Location</LocationName>
              <MIcon name="keyboard-arrow-down" color={Colors.blue} size={20} />
            </Row>
            <PlaceName>Street 76 A, 1202002 Doun Penh, C...</PlaceName>
          </Column>
          <CartButton
            hitSlop={{top: 12, bottom: 12, left: 12, right: 12}}
            activeOpacity={0.7}
            onPress={onCartPress}>
            <FontAwesomeIcon name="shopping-basket" size={20} />
          </CartButton>
        </LocationWrapper>
        <SearchBar />
      </Wrapper>
    );
  }
}
