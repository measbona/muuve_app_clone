import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
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
  return (
    <Wrapper>
      <InfoWrapper>
        <Text>Caramel Machiato Frappe</Text>
        <Text price>$2.35</Text>
      </InfoWrapper>
      <ItemImage
        source={{
          uri:
            'https://cdn.auntieannes.com/-/media/auntie-annes/cards/featured/celebratehappiness_pretzel-buckets_450x430.jpg?v=1&d=20200102T163436Z&h=430&w=450&la=en&hash=84C9C95CC159D72D7E2F149D749F5B16',
        }}
      />
    </Wrapper>
  );
};
