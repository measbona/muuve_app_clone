import React, {PureComponent} from 'react';
import styled from 'styled-components';
import {Navigation} from 'react-native-navigation';

import Colors from '../utils/colors';

const Container = styled.View`
  flex: 1;
`;

const ToastWrapper = styled.View`
  position: absolute;
  bottom: 10px;
  margin: 10px;
  padding: 5px;
  align-items: center;
  align-self: center;
  background: ${Colors.grey};
  border-radius: 10px;
`;

const Text = styled.Text`
  font-size: 10px;
`;

class Toast extends PureComponent {
  componentDidMount() {
    const {componentId} = this.props;

    setTimeout(() => {
      Navigation.dismissOverlay(componentId);
    }, 1000);
  }

  render() {
    const {message} = this.props;

    return (
      <Container>
        <ToastWrapper>
          <Text>{message}</Text>
        </ToastWrapper>
      </Container>
    );
  }
}

export default Toast;
