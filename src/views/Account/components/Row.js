import React from 'react';
import styled from 'styled-components/native';

import utils from '../../../utils';

const Wrapper = styled.TouchableOpacity`
  height: 50px;
  align-items: center;
  flex-direction: row;
  padding-horizontal: 20px;
  justify-content: space-between;
`;

const IconWrapper = styled.View`
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
`;

const IconAndName = styled.View`
  align-items: center;
  flex-direction: row;
`;

const Text = styled.Text`
  margin-left: 20px;
  font-weight: 600;
  color: ${utils.colors.black};
`;

const Value = styled.Text`
  font-weight: bold;
  color: ${utils.colors.blue};
`;

export default ({name, icon, iconName, iconSize, value, onPress, logout}) => {
  const Icon = icon;

  return (
    <Wrapper activeOpacity={1} onPress={onPress}>
      <IconAndName>
        <IconWrapper>
          <Icon
            name={iconName}
            size={iconSize}
            color={logout ? 'red' : utils.colors.black}
          />
        </IconWrapper>
        <Text style={logout && {color: 'red'}}>{name}</Text>
      </IconAndName>
      {value && <Value>{value}</Value>}
    </Wrapper>
  );
};
