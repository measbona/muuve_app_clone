import React from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const SCREEN_WIDTH = Dimensions.get('screen').width;

const HeaderWrapper = styled.View`
  height: 100px;
  width: ${SCREEN_WIDTH}px;
  padding-top: 30px;
  justify-content: center;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  background-color: #fcbd3e;
`;

const WrapperArrowBack = styled.View`
  width: 150px;
  margin-left: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

const BtnArrowBack = styled.TouchableOpacity``;

const Text = styled.Text`
  margin-left: 20px;
  font-size: 18px;
  font-weight: 700;
`;

export default class header extends React.PureComponent {
  render() {
    return (
      <HeaderWrapper>
        <WrapperArrowBack>
          <BtnArrowBack>
            <FontAwesomeIcon name="arrow-left" size={18} />
          </BtnArrowBack>
          <Text>Group Order</Text>
        </WrapperArrowBack>
      </HeaderWrapper>
    );
  }
}
