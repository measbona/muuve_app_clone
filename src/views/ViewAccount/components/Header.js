import React from 'react';
import styled from 'styled-components/native';
import {popBack} from '../../../navigation/screen';

import utils from '../../../utils';

import MTIcon from 'react-native-vector-icons/MaterialIcons';

const Wrapper = styled.View`
  padding-top: 60px;
  align-items: center;
  padding-left: 20px;
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-left-radius: 17px;
  border-bottom-right-radius: 17px;
  background-color: ${utils.colors.yellow};
`;

const BackButtonWrapper = styled.TouchableOpacity``;

const Text = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
  color: ${utils.colors.black};
`;

export default ({componentId}) => {
  return (
    <Wrapper>
      <BackButtonWrapper
        activeOpacity={0.7}
        onPress={() => popBack(componentId)}>
        <MTIcon name="arrow-back" size={23} color={utils.colors.black} />
      </BackButtonWrapper>
      <Text>Profile</Text>
    </Wrapper>
  );
};
