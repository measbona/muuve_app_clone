import React from 'react';
import styled from 'styled-components/native';
import MTIcon from 'react-native-vector-icons/MaterialIcons';
import {popBack} from '../navigation/screen';

import Colors from '../utils/colors';
import Device from '../utils/device';

const Wrapper = styled.View`
  padding-top: ${Device.isIphoneX ? 68 : 42}px;
  padding-bottom: 15px;
  padding-left: 10px;
  border-bottom-left-radius: 17px;
  border-bottom-right-radius: 17px;
  align-items: center;
  flex-direction: row;
  background-color: ${Colors.yellow};
`;

const TitleName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
`;

export default class NavigationBack extends React.PureComponent {
  render() {
    const {title, navigate, componentId} = this.props;

    return (
      <Wrapper>
        {navigate ? (
          <MTIcon
            name="arrow-back"
            size={23}
            color={Colors.black}
            onPress={() => popBack(componentId)}
            style={{paddingHorizontal: 5}}
          />
        ) : null}
        <TitleName>{title}</TitleName>
      </Wrapper>
    );
  }
}
