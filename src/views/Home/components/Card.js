import React from 'react';
import styled from 'styled-components/native';
import FAW5Icon from 'react-native-vector-icons/FontAwesome5';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../../utils/colors';

const Wrapper = styled.TouchableOpacity`
  border-radius: 17px;
  flex-direction: row;
  margin-bottom: 15px;
  background-color: ${Colors.white};
`;

const MerchantLogo = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 17px;
`;

const Content = styled.View`
  flex: 1;
  margin-vertical: 8px;
  margin-horizontal: 8px;
  justify-content: space-between;
`;

const MerchantInfo = styled.View`
`;

const Name = styled.Text`
  font-size: 13px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Category = styled.Text`
  font-size: 11px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Discount = styled.Text`
  font-size: 11px;
  font-weight: bold;
  margin-bottom: 5px;
  color: ${Colors.blue};
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Promotions = styled.View`
  flex-direction: row;
`;

const Text = styled.Text`
  font-size: 11px;
  font-weight: bold;
  color: ${Colors.blue};
`;

const Rating = styled.View`
  align-items: center;
  flex-direction: row;
`;

const DeliveryFee = styled.View`
  align-items: center;
  flex-direction: row;
`;

const Space = styled.View`
  margin-horizontal: 2px;
`;

export default class Card extends React.PureComponent {
  render() {
    const {onPress} = this.props;

    return (
      <Wrapper activeOpacity={0.5} onPress={onPress}>
        <MerchantLogo
          source={{
            uri:
              'https://www.focusbrands.com/wp-content/uploads/2020/05/auntie-annes_logo.png',
          }}
        />
        <Content>
          <Row>
            <MerchantInfo>
              <Name>Auntie Anne's Cambodia</Name>
              <Category>Snack, Juice, Noodle, Tea</Category>
              <Discount>20% discount</Discount>
            </MerchantInfo>
            <Promotions>
              <FAW5Icon
                name="gift"
                color={Colors.blue}
                size={14}
                style={{marginRight: 4}}
              />
              <MCIcon name="brightness-percent" color={Colors.blue} size={15} />
            </Promotions>
          </Row>

          <Row>
            <Rating>
              <MCIcon
                name="star"
                color={Colors.yellow}
                size={16}
                style={{marginRight: 2}}
              />
              <Text>4/24 Ratings</Text>
            </Rating>
            <DeliveryFee>
              <MCIcon name="motorbike" color={Colors.blue} size={17} />
              <Text>FREE</Text>
              <Space />
              <MCIcon name="clock-outline" color={Colors.blue} size={15} />
              <Text>~25 min</Text>
            </DeliveryFee>
          </Row>
        </Content>
      </Wrapper>
    );
  }
}
