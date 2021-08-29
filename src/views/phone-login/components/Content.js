/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import * as Navigator from '../../../navigation/screen';

import Modules from '../../../modules';
import utils from '../../../utils';

import Loading from '../../../lib/Loading';
import PhoneInput from './PhoneInput';

import ProfileActions from '../../../redux/ProfileRedux';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 40,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: utils.colors.black,
  },
  button: {
    minHeight: 40,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: utils.colors.yellow,
  },
  boxesWrapper: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  boxWrapper: {
    width: 55,
    height: 55,
    borderRadius: 17,
    justifyContent: 'center',
    backgroundColor: utils.colors.grey,
  },
  didNotReceiveCode: {
    marginTop: 20,
    alignSelf: 'center',
  },
});

class Content extends React.PureComponent {
  state = {
    code: '',
    confirm: null,
    visibleOtpCode: true,
    loading: false,
    phoneNumber: '',
  };

  contentRef = React.createRef();

  async componentDidUpdate() {
    const {code} = this.state;

    if (code.split('').length === 6) {
      await this.contentRef.onClose();
    }
  }

  onMounted = (ref) => {
    this.contentRef = ref;
  };

  onChangeText = (num, type) => {
    const {phoneNumber, code} = this.state;
    let newNum = type === 'phoneNumber' ? phoneNumber : code;

    newNum += num;

    this.setState({[type]: newNum});
  };

  onDelete = (type) => {
    const {phoneNumber, code} = this.state;
    let data = type === 'phoneNumber' ? phoneNumber : code;

    const newNum = data.slice(0, -1);

    this.setState({[type]: newNum});
  };

  onPress = () => {
    const {visibleOtpCode, phoneNumber} = this.state;

    if (visibleOtpCode) {
      const number = utils.helpers.removeLeadZeroNumber(phoneNumber);

      return Navigator.showModalChoice({
        headline: 'Confirmation',
        description: `A confirmation code will send to your via SMS or Notification. Please check your number is correct.\n\n+855${number}`,
        no: 'NO',
        yes: 'YES',
        onPress: () => {
          this.setState({loading: true}, () => {
            this.onPhoneAuth();
          });
        },
      });
    } else {
      this.codeVerification();
    }
  };

  onPhoneAuth = async () => {
    const {phoneNumber} = this.state;

    Keyboard.dismiss();

    try {
      const number = utils.helpers.removeLeadZeroNumber(phoneNumber);
      const confirmation = await Modules.Profile.phoneAuth(`+855${number}`);

      if (confirmation) {
        this.setState({
          loading: false,
          confirm: confirmation,
          visibleOtpCode: false,
        });
      }
    } catch (error) {
      alert(error.message);
      this.setState({loading: false});
    }
  };

  codeVerification = async () => {
    const {confirm, code} = this.state;
    const {handleUserProfile, componentId} = this.props;

    try {
      this.setState({loading: true});

      const isCorrect = await confirm.confirm(code);

      if (isCorrect) {
        await handleUserProfile({componentId});

        return this.setState({loading: false});
      }
    } catch (error) {
      this.setState({loading: false});

      Navigator.showModalNotice({
        headline: 'Invalid Code',
        description: 'Your code is invalid. Please try again.',
        buttonName: 'Confirm',
      });
    }
  };

  renderVerificationInput = () => {
    let {code} = this.state;

    const arrayCode = code.split('');

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() =>
          Navigator.showNumpad({
            type: 'enter-otp-code',
            onMounted: this.onMounted,
            onDelete: () => this.onDelete('code'),
            onChangeText: (num) => this.onChangeText(num, 'code'),
          })
        }
        style={styles.boxesWrapper}>
        <View style={styles.boxWrapper}>
          <Text style={[styles.text, {fontSize: 20, alignSelf: 'center'}]}>
            {arrayCode[0]}
          </Text>
        </View>
        <View style={styles.boxWrapper}>
          <Text style={[styles.text, {fontSize: 20, alignSelf: 'center'}]}>
            {arrayCode[1]}
          </Text>
        </View>
        <View style={styles.boxWrapper}>
          <Text style={[styles.text, {fontSize: 20, alignSelf: 'center'}]}>
            {arrayCode[2]}
          </Text>
        </View>
        <View style={styles.boxWrapper}>
          <Text style={[styles.text, {fontSize: 20, alignSelf: 'center'}]}>
            {arrayCode[3]}
          </Text>
        </View>
        <View style={styles.boxWrapper}>
          <Text style={[styles.text, {fontSize: 20, alignSelf: 'center'}]}>
            {arrayCode[4]}
          </Text>
        </View>
        <View style={styles.boxWrapper}>
          <Text style={[styles.text, {fontSize: 20, alignSelf: 'center'}]}>
            {arrayCode[5]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {phoneNumber, visibleOtpCode, loading, code} = this.state;

    const buttonText = visibleOtpCode ? 'NEXT' : 'GET STARTED';
    const disabled = visibleOtpCode
      ? phoneNumber.split('').length <= 7
      : code.split('').length !== 6;

    return (
      <TouchableOpacity style={styles.wrapper} activeOpacity={1}>
        <View>
          <Text style={styles.text}>Login with your phone number</Text>
        </View>

        {visibleOtpCode ? (
          <PhoneInput
            phoneNumber={phoneNumber}
            onDelete={() => this.onDelete('phoneNumber')}
            onChangeText={(num) => this.onChangeText(num, 'phoneNumber')}
          />
        ) : (
          this.renderVerificationInput()
        )}

        <TouchableOpacity
          style={styles.button}
          disabled={disabled || loading}
          activeOpacity={0.7}
          onPress={this.onPress}>
          {loading ? (
            <Loading style={{width: 40, height: 40}} />
          ) : (
            <Text style={[styles.text, {fontSize: 14}]}>{buttonText}</Text>
          )}
        </TouchableOpacity>

        {!visibleOtpCode ? (
          <TouchableOpacity
            style={styles.didNotReceiveCode}
            activeOpacity={0.7}
            onPress={() =>
              this.setState({visibleOtpCode: true, confirm: null, code: ''})
            }>
            <Text style={styles.text}>Did not receiver a code?</Text>
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
    );
  }
}

const mapDispatch = {
  handleUserProfile: ProfileActions.handleUserProfile,
};

export default connect(null, mapDispatch)(Content);
