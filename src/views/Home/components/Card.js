import React from 'react';
import { get } from 'lodash'
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
  color: ${Colors.red};
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const PromotionRow = styled.View`
  align-items: center;
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

const DiscountRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PromotionSeperator = styled.Text`
  font-size: 18px;
  margin-horizontal: 5px;
  color: ${Colors.red};
`;

export default class Card extends React.PureComponent {
  render() {
    const { onPress, restaurant} = this.props;

    const name = get(restaurant, 'name', 'N/A')
    const discount = get(restaurant, 'discount_rate', 0)
    const hasDiscount = discount > 0
    const cartBased = get(restaurant, 'cart_based', false)
    const logo = get(restaurant, 'images.logo')

    const reviewer = get(restaurant, 'reviewers', 0)
    const ratingCount = get(restaurant, 'rating_count', 0)
    const rating = Math.floor(ratingCount/reviewer)

    const cookingDuration = get(restaurant, 'cooking_duration')

    return (
      <Wrapper activeOpacity={0.5} onPress={onPress}>
        <MerchantLogo source={{ uri: logo }} />
        <Content>
          <Row>
            <MerchantInfo>
              <Name>{name}</Name>
              <Category>Snack, Juice, Noodle, Tea</Category>
              <PromotionRow>
                {hasDiscount ? (
                  <DiscountRow>
                    <MCIcon name="brightness-percent" color={Colors.red} size={15} style={{ marginRight: 2 }}/>
                    <Discount>{`${discount}% Discount`}</Discount>
                  </DiscountRow>
                ) : null}
                {hasDiscount && cartBased && <PromotionSeperator>{'\u2022'}</PromotionSeperator>}
                {cartBased ? (
                  <FAW5Icon
                    name="gift"
                    color={Colors.red}
                    size={14}
                    style={{marginRight: 4}}
                  />
                ) : null}
              </PromotionRow>
            </MerchantInfo>
          </Row>

          <Row>
            <Rating>
              <MCIcon
                name="star"
                color={Colors.yellow}
                size={16}
                style={{marginRight: 2}}
              />
              <Text>{`${rating}/${ratingCount}`}</Text>
            </Rating>
            <DeliveryFee>
              <MCIcon name="motorbike" color={Colors.blue} size={17} />
              <Text>FREE</Text>
              <Space />
              <MCIcon name="clock-outline" color={Colors.blue} size={15} />
              <Text>{`~${cookingDuration} min`}</Text>
            </DeliveryFee>
          </Row>
        </Content>
      </Wrapper>
    );
  }
}
