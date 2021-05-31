import React from 'react';
import styled from 'styled-components/native';
import MTIcon from 'react-native-vector-icons/MaterialIcons';
import {popBack} from '../navigation/screen';
//ios 30px;
import Colors from '../utils/colors';

const Wrapper = styled.View`
  padding-top: 40px;
  padding-left: 10px;
  min-height: 105px;
  border-radius: 17px;
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
