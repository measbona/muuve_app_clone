import React from 'react';
import {Keyboard} from 'react-native';
import styled from 'styled-components/native';

import {setRootHome, showModalChoice} from '../../../navigation/screen';

import utils from '../../../utils';

const Wrapper = styled.TouchableOpacity`
  flex: 1;
  padding-top: 40px;
  margin-horizontal: 20px;
`;

const HeadTextWrapper = styled.View``;

const HeadText = styled.Text`
  font-weight: bold;
  color: ${utils.colors.black};
`;

const TextInputWrapper = styled.View`
  height: 40px;
  border-radius: 17px;
  flex-direction: row;
  margin-vertical: 10px;
  justify-content: space-between;
  background-color: ${utils.colors.grey};
`;

const TextInput = styled.TextInput`
  flex: 1;
  font-size: 13px;
  font-weight: bold;
  margin-left: 10px;
`;

const Head = styled.View`
  align-items: center;
  flex-direction: row;
`;

const CambodiaFlagIcon = styled.Image`
  width: 27px;
  height: 17px;
  margin-left: 20px;
`;

const PrefixNumber = styled.Text`
  font-size: 13px;
  font-weight: bold;
  margin-left: 10px;
`;

const ButtonWrapper = styled.TouchableOpacity`
  height: 40px;
  align-items: center;
  border-radius: 17px;
  justify-content: center;
  background-color: ${utils.colors.yellow};
`;

const ButtonText = styled.Text`
  font-size: 13px;
  font-weight: bold;
  color: ${utils.colors.black};
`;

const CodeWrapper = styled.View`
  flex-direction: row;
  margin-vertical: 10px;
  justify-content: space-between;
`;

const CodeBoxWrapper = styled.View`
  width: 50px;
  height: 50px;
  justify-content: center;
  border-radius: 15px;
  background-color: ${utils.colors.grey};
`;

const CodeBox = styled.TextInput`
  flex: 1;
  font-size: 17px;
  font-weight: bold;
  text-align: center;
`;

const Code = styled.Text`
  font-size: 17px;
  font-weight: bold;
  align-self: center;
`;

const DidNotReceiveCode = styled.TouchableOpacity`
  margin-top: 20px;
`;

const Text = styled.Text`
  font-size: 13px;
  font-weight: bold;
  align-self: center;
`;

export default class Content extends React.PureComponent {
  state = {
    phoneNumber: '',
    mounted: true,
    code: '',
  };

  componentDidUpdate() {
    const {code} = this.state;

    if (code.length === 6) {
      setRootHome();
    }
  }

  renderPhoneNumberInput = () => {
    return (
      <TextInputWrapper>
        <Head>
          <CambodiaFlagIcon
            source={require('../../../assets/icons/flag_icon.png')}
          />
          <PrefixNumber>+855</PrefixNumber>
        </Head>
        <TextInput
          caretHidden
          maxLength={10}
          keyboardType="number-pad"
          placeholder="Enter phone number"
          onChangeText={(num) => this.setState({phoneNumber: num})}
        />
      </TextInputWrapper>
    );
  };

  renderVerificationInput = () => {
    const {code} = this.state;

    return (
      <CodeWrapper>
        <CodeBoxWrapper>
          <CodeBox
            autoFocus
            caretHidden
            defaultValue={code[0]}
            maxLength={6}
            keyboardType="number-pad"
            onChangeText={(code) => this.setState({code})}
          />
        </CodeBoxWrapper>
        <CodeBoxWrapper>
          <Code>{code[1]}</Code>
        </CodeBoxWrapper>
        <CodeBoxWrapper>
          <Code>{code[2]}</Code>
        </CodeBoxWrapper>
        <CodeBoxWrapper>
          <Code>{code[3]}</Code>
        </CodeBoxWrapper>
        <CodeBoxWrapper>
          <Code>{code[4]}</Code>
        </CodeBoxWrapper>
        <CodeBoxWrapper>
          <Code>{code[5]}</Code>
        </CodeBoxWrapper>
      </CodeWrapper>
    );
  };

  handleVerifyCode = () => {
    const {mounted, code, phoneNumber} = this.state;

    Keyboard.dismiss();

    if (!mounted && code.length === 6) {
      setRootHome();
    } else {
      showModalChoice({
        headline: 'Confirmation',
        description: `A confirmation code will send to your via SMS or Notification. Please check your number is correct.\n\n+855${phoneNumber}`,
        no: 'NO',
        yes: 'YES',
        onPress: () => this.setState({mounted: false}),
      });
    }
  };

  render() {
    const {phoneNumber, mounted} = this.state;

    return (
      <Wrapper activeOpacity={1} onPress={() => Keyboard.dismiss()}>
        <HeadTextWrapper>
          <HeadText>Login with your phone number</HeadText>
        </HeadTextWrapper>
        {mounted
          ? this.renderPhoneNumberInput()
          : this.renderVerificationInput()}
        <ButtonWrapper
          activeOpacity={0.8}
          onPress={this.handleVerifyCode}
          disabled={phoneNumber.length < 1}>
          <ButtonText>{mounted ? `GET STARTED` : `NEXT`}</ButtonText>
        </ButtonWrapper>
        {!mounted && (
          <DidNotReceiveCode
            activeOpacity={0.5}
            onPress={() => this.setState({mounted: true})}>
            <Text>Did not receiver a code?</Text>
          </DidNotReceiveCode>
        )}
      </Wrapper>
    );
  }
}
