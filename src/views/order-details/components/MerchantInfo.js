import React from 'react';
import styled from 'styled-components/native';

import Colors from '../../../utils/colors';

const MerchantWrapper = styled.View`
  margin-top: 20px;
  margin-bottom: 10px;
  margin-horizontal: 16px;
`;

const MerchantName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.blue};
`;

const MerchantPlaceName = styled.Text`
  font-size: 14px;
  font-weight: 300;
`;

export default (props) => {
  return (
    <MerchantWrapper>
      <MerchantName>Sukiyaki Express</MerchantName>
      <MerchantPlaceName>Chip Mong Noromal 3rd floor</MerchantPlaceName>
    </MerchantWrapper>
  );
};
