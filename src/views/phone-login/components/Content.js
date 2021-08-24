/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Keyboard,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
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
    code: [],
    confirm: null,
    mounted: true,
    loading: false,
    phoneNumber: '',
  };

  componentDidUpdate() {
    const {code} = this.state;

    if (code.length === 6) {
      Keyboard.dismiss();
    }
  }

  onPress = () => {
    const {mounted, phoneNumber} = this.state;

    Keyboard.dismiss();

    if (mounted) {
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

    try {
      const number = utils.helpers.removeLeadZeroNumber(phoneNumber);
      const confirmation = await Modules.Profile.phoneAuth(`+855${number}`);

      if (confirmation) {
        this.setState({confirm: confirmation, loading: false, mounted: false});
      }
    } catch (error) {
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
        this.setState({loading: false});

        return handleUserProfile({componentId});
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
    const {code} = this.state;

    return (
      <View style={styles.boxesWrapper}>
        <View style={styles.boxWrapper}>
          <TextInput
            style={[styles.text, {fontSize: 20, alignSelf: 'center'}]}
            autoFocus
            caretHidden
            defaultValue={code[0]}
            textAlign="center"
            maxLength={6}
            keyboardType="number-pad"
            onChangeText={(val) => this.setState({code: val})}
          />
        </View>
        <View style={styles.boxWrapper}>
          <Text style={[styles.text, {fontSize: 20, alignSelf: 'center'}]}>
            {code[1]}
          </Text>
        </View>
        <View style={styles.boxWrapper}>
          <Text style={[styles.text, {fontSize: 20, alignSelf: 'center'}]}>
            {code[2]}
          </Text>
        </View>
        <View style={styles.boxWrapper}>
          <Text style={[styles.text, {fontSize: 20, alignSelf: 'center'}]}>
            {code[3]}
          </Text>
        </View>
        <View style={styles.boxWrapper}>
          <Text style={[styles.text, {fontSize: 20, alignSelf: 'center'}]}>
            {code[4]}
          </Text>
        </View>
        <View style={styles.boxWrapper}>
          <Text style={[styles.text, {fontSize: 20, alignSelf: 'center'}]}>
            {code[5]}
          </Text>
        </View>
      </View>
    );
  };

  render() {
    const {phoneNumber, mounted, loading, code} = this.state;

    const buttonText = mounted ? 'NEXT' : 'GET STARTED';
    const disabled = mounted ? phoneNumber.length <= 7 : code.length !== 6;

    return (
      <TouchableOpacity
        style={styles.wrapper}
        activeOpacity={1}
        onPress={() => Keyboard.dismiss()}>
        <View>
          <Text style={styles.text}>Login with your phone number</Text>
        </View>

        {mounted ? (
          <PhoneInput
            onChangeText={(num) => this.setState({phoneNumber: num})}
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

        {!mounted ? (
          <TouchableOpacity
            style={styles.didNotReceiveCode}
            activeOpacity={0.7}
            onPress={() =>
              this.setState({mounted: true, confirm: null, code: ''})
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
