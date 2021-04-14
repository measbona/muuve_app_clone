import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  height: 100px;
  border-radius: 17px;
  background-color: white;
  flex-direction: row;
  margin-bottom: 15px;
`;

const ImageView = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 17px;
`;

const MerchantInfoWrapper = styled.View``;

const NameWrapper = styled.View`
  margin-left: 5px;
  margin-vertical: 8px;
`;

const Name = styled.Text`
  font-size: 17px;
  font-weight: 500;
`;

const InfoName = styled.Text`
  color: grey;
  margin-vertical: 5px;
  font-weight: 700;
`;

const Discount = styled.Text`
  font-weight: 700;
  color: #004da6;
`;

export default class Card extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <ImageView
          source={{
            uri:
              'https://www.focusbrands.com/wp-content/uploads/2020/05/auntie-annes_logo.png',
          }}
        />
        <MerchantInfoWrapper>
          <NameWrapper>
            <Name>Auntie Anne's Cambodia</Name>
            <InfoName>Snack</InfoName>
            <Discount>20% discount</Discount>
          </NameWrapper>
        </MerchantInfoWrapper>
      </Wrapper>
    );
  }
}
