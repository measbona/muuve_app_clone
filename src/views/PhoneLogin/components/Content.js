import React from 'react';
import {Keyboard} from 'react-native';
import styled from 'styled-components/native';

import Auth from '@react-native-firebase/auth';

import utils from '../../../utils';
import PhoneInput from './PhoneInput';

import {setRootHome, showModalChoice, showModalNotice} from '../../../navigation/screen';

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

const ActivityIndicator = styled.ActivityIndicator``;

export default class Content extends React.PureComponent {
  state = {
    code: [],
    confirm: null,
    mounted: true,
    loading: false,
    phoneNumber: '',
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

  handleVerifyCode = async () => {
    const {mounted, phoneNumber} = this.state;

    Keyboard.dismiss();

    if (mounted) {
      return showModalChoice({
        headline: 'Confirmation',
        description: `A confirmation code will send to your via SMS or Notification. Please check your number is correct.\n\n+855${phoneNumber}`,
        no: 'NO',
        yes: 'YES',
        onPress: this.onPhoneAuth,
      });
    } else {
      this.codeVerification()
    } 
  };

  onPhoneAuth = async () => {
    const { phoneNumber } = this.state

    try {
      const confirmation = await Auth().signInWithPhoneNumber(`+855${phoneNumber}`);

      if (confirmation) {
        this.setState({confirm: confirmation, mounted: false});
      }
    } catch (error) {
      //
    }
  }

  codeVerification = async () => {
    const { confirm, code } = this.state

    try {
      this.setState({ loading: true })

      const isCorrect = await confirm.confirm(code)

      if (isCorrect) {
        this.setState({ loading: false })

        setRootHome()
      }
    } catch (error) {
      showModalNotice({
        headline: 'Invalid Code',
        description: 'Your code is invalid. Please try again.',
        buttonName: 'Confirm',
      });

      this.setState({ loading: false })
    }
  }

  render() {
    const {phoneNumber, mounted, loading, code} = this.state;

    const buttonText = mounted ? 'NEXT' : 'GET STARTED'
    const disabled = mounted ? phoneNumber.length <= 7 : code.length !== 6

    return (
      <Wrapper activeOpacity={1} onPress={() => Keyboard.dismiss()}>
        <HeadTextWrapper>
          <HeadText>Login with your phone number</HeadText>
        </HeadTextWrapper>

        {mounted
          ? <PhoneInput onChangeText={(num) => this.setState({phoneNumber: num})} />
          : this.renderVerificationInput()}

        <ButtonWrapper disabled={disabled} activeOpacity={0.8} onPress={this.handleVerifyCode}>
          {loading ? (
            <ActivityIndicator size="small" color="black" />
          ) : (
            <ButtonText>{buttonText}</ButtonText>
          )}
        </ButtonWrapper>

        {!mounted ? (
          <DidNotReceiveCode
            activeOpacity={0.5}
            onPress={() => this.setState({ mounted: true, confirm: null, code: '' })}>
            <Text>Did not receiver a code?</Text>
          </DidNotReceiveCode>
        ) : null}
      </Wrapper>
    );
  }
}
