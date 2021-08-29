/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity, Keyboard, StyleSheet, ScrollView, KeyboardAvoidingView} from 'react-native';
import moment from 'moment';
import * as Navigator from '../../navigation/screen';
import * as Animatable from 'react-native-animatable';
import firebase from '@react-native-firebase/app';

import utils from '../../utils';

import NavBar from '../../lib/NavBar';
import Loading from '../../lib/Loading';
import AppActions from '../../redux/AppRedux';
import NameInput from './components/NameInput';
import DateBirthInput from './components/BirthDate';

import ProfileActions from '../../redux/ProfileRedux';

const styles = StyleSheet.create({
  conatiner: {flex: 1},
  headlineWrapper: {
    marginBottom: 25,
    marginVertical: 15,
  },
  contentWrapper: {
    marginHorizontal: 16,
  },
  text: {
    fontSize: 17,
    fontWeight: 'bold',
    color: utils.colors.blue,
  },
  button: {
    minHeight: 40,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: utils.colors.yellow,
  },
});

class AccountForm extends React.Component {
  state = {
    day: '',
    year: '',
    month: '',
    firstName: '',
    familyName: '',
    loading: false,
  };

  componentDidMount() {
    const {profile} = this.props;

    if (profile) {
      const day = profile.dob.split('-')[0];
      const month = profile.dob.split('-')[1];
      const year = profile.dob.split('-')[2];

      this.setState({
        day: day,
        year: year,
        month: month,
        firstName: profile.first_name,
        familyName: profile.family_name,
      });
    }
  }

  validationData = () => {
    const {familyName, firstName} = this.state;

    return new Promise((resolve) => {
      if (familyName.length === 0 || firstName.length === 0) {
        const isFamilyNameError = familyName.length === 0;

        return Navigator.showModalNotice({
          headline: 'Invalid Input',
          description: `${
            isFamilyNameError ? 'Family Name' : 'Frist Name'
          } can't be blank.`,
          buttonName: 'Continue',
        });
      }

      resolve(true);
    });
  };

  onSavePress = async () => {
    const {day, year, month, firstName, familyName} = this.state;
    const {
      profile,
      isNewUser,
      setProfile,
      componentId,
      handleDynamicLink,
    } = this.props;

    const uid = firebase.auth().currentUser.uid;
    const phoneNumber = firebase.auth().currentUser.phoneNumber;
    const dob =
      (day > 0 &&
        month.length !== 0 &&
        year > 0 &&
        `${day}-${month}-${year}`) ||
      '';

    try {
      await this.validationData();
      this.setState({loading: true});

      const updates = {};
      const data = {
        uid,
        dob,
        region: 'pnh',
        language: 'kh',
        first_name: firstName,
        family_name: familyName,
        phone_number: phoneNumber,
        ...(profile && {updated_at: Number(moment().format('x'))}),
        created_at: profile ? profile.created_at : Number(moment().format('x')),
      };

      updates[`users/${uid}`] = data;

      setProfile(data);
      await firebase.database().ref().update(updates);
      this.setState({loading: false});

      if (isNewUser) {
        return handleDynamicLink();
      } else {
        return Navigator.popBack(componentId);
      }
    } catch (error) {
      this.setState({loading: false});
      alert(`Error: ${error.message}`);
    }
  };

  render() {
    const {day, year, month, firstName, familyName, loading} = this.state;
    const {componentId, isNewUser} = this.props;

    return (
      <View style={styles.conatiner}>
        <NavBar
          title="Profile"
          noneNavigate={isNewUser}
          componentId={componentId}
          style={{backgroundColor: utils.colors.yellow, paddingLeft: 10}}
        />

        <Animatable.View animation="fadeIn" delay={500} duration={300}>
          <TouchableOpacity
            style={styles.contentWrapper}
            activeOpacity={1}
            onPress={() => Keyboard.dismiss()}>
            <View style={styles.headlineWrapper}>
              <Text style={styles.text}>Edit your profile</Text>
            </View>

            <NameInput
              name="Family Name"
              placeholder="Enter Family Name"
              value={familyName}
              onChange={(val) => this.setState({familyName: val})}
            />
            <NameInput
              name="First Name"
              value={firstName}
              placeholder="Enter First Name"
              onChange={(val) => this.setState({firstName: val})}
            />
            <DateBirthInput
              name="Date of birth"
              day={day}
              month={month}
              year={year}
              onDayChange={(val) => this.setState({day: val})}
              onYearChange={(val) => this.setState({year: val})}
              onMonthChange={(val) => this.setState({month: val})}
            />

            <TouchableOpacity
              activeOpacity={0.7}
              disabled={loading}
              style={styles.button}
              onPress={this.onSavePress}>
              {loading ? (
                <Loading style={{width: 40, height: 40}} />
              ) : (
                <Text
                  style={[
                    styles.text,
                    {fontSize: 14, color: utils.colors.black},
                  ]}>
                  SAVE
                </Text>
              )}
            </TouchableOpacity>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    );
  }
}

const mapState = ({profile}) => ({
  profile: profile.data,
});

const mapDispatch = {
  setProfile: ProfileActions.setProfile,
  handleDynamicLink: AppActions.handleDynamicLink,
};

export default connect(mapState, mapDispatch)(AccountForm);
