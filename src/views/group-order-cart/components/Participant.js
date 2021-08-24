import React from 'react';
import styled from 'styled-components/native';

import Colors from '../../../utils/colors';

const Wrapper = styled.View`
  margin-horizontal: 16px;
`;

const HeadlineWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Healine = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${Colors.blue};
`;

const PriceWrapper = styled.View`
  flex-direction: row;
`;

const Amount = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${Colors.black};
`;

const Price = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: ${Colors.blue};
`;

const ItemWrapper = styled.View`
  padding: 10px;
  position: relative;
  margin-vertical: 10px;
  background-color: ${Colors.grey};
  flex-direction: row;
  justify-content: space-between;
`;

const ItemNameWrapper = styled.View`
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

const DoneWrapper = styled.View`
  left: 0px;
  right: 0px;
  position: absolute;
  align-self: center;
  align-items: center;
  justify-content: center;
`;

const Done = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: ${Colors.blue};
`;

export default (props) => {
  const {} = props;

  return (
    <Wrapper>
      <HeadlineWrapper>
        <Healine>Your Order</Healine>
        <PriceWrapper>
          <Amount>1 x </Amount>
          <Price>$1.5</Price>
        </PriceWrapper>
      </HeadlineWrapper>
      <ItemWrapper>
        <ItemNameWrapper>
          <Text>Pretzel Almond Crush</Text>
          <Text price>$1.5</Text>
        </ItemNameWrapper>
        <ItemImage
          source={{
            uri:
              'https://cdn.auntieannes.com/-/media/auntie-annes/cards/featured/celebratehappiness_pretzel-buckets_450x430.jpg?v=1&d=20200102T163436Z&h=430&w=450&la=en&hash=84C9C95CC159D72D7E2F149D749F5B16',
          }}
        />
        <DoneWrapper>
          <Done>Done</Done>
        </DoneWrapper>
      </ItemWrapper>
    </Wrapper>
  );
};
