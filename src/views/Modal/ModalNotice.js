import React from 'react';
import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';

import {dismissOverLay} from '../../navigation/screen';

import Colors from '../../utils/colors';
import Device from '../../utils/device';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

const AnimateContainer = Animatable.createAnimatableComponent(Container);

const Modal = styled.View`
  align-items: center;
  border-radius: 15px;
  padding-vertical: 15px;
  background-color: white;
  width: ${Device.screenWidth - 32}px;
`;

const Headline = styled.View`
  padding-bottom: 15px;
  align-items: center;
`;

const HeadlineText = styled.Text`
  font-weight: bold;
  font-size: 15px;
  color: ${Colors.yellow};
`;

const Border = styled.View`
  border-width: 1px;
  border-color: ${Colors.grey};
  width: ${Device.screenWidth - 64}px;
`;

const Content = styled.View`
  padding-top: 10px;
  align-items: center;
  padding-bottom: 25px;
  margin-horizontal: 20px;
`;

const ContentText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  text-align: center;
`;

const Action = styled.View`
  flex-direction: row;
  margin-horizontal: 15px;
  justify-content: space-between;
`;

const Button = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  border-radius: 15px;
  padding-vertical: 10px;
  background-color: ${Colors.yellow};
`;

const ButtonText = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: ${Colors.black};
`;

export default class ModalNotice extends React.PureComponent {
  containerRef = React.createRef();

  onCancelButton = async () => {
    try {
      await this.containerRef.fadeOut(300);
      await dismissOverLay();
    } catch (err) {
      //
    }
  };

  render() {
    const {headline, description, buttonName} = this.props;

    return (
      <AnimateContainer
        ref={(ref) => (this.containerRef = ref)}
        animation="fadeIn"
        duration={300}>
        <Modal>
          <Headline>
            <HeadlineText>{headline}</HeadlineText>
          </Headline>
          <Border />
          <Content>
            <ContentText>{description}</ContentText>
          </Content>
          <Action>
            <Button activeOpacity={0.5} onPress={this.onCancelButton}>
              <ButtonText>{buttonName}</ButtonText>
            </Button>
          </Action>
        </Modal>
      </AnimateContainer>
    );
  }
}
