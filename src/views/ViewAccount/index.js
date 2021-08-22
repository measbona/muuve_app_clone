import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import * as Navigator from '../../navigation/screen';
import firebase from '@react-native-firebase/app';

import utils from '../../utils';

import NavBar from '../../lib/NavBar';
import NameInput from './components/NameInput';
import DateBirthInput from './components/BirthDate';

import ProfileActions from '../../redux/ProfileRedux';

const styles = StyleSheet.create({
  conatiner: {flex: 1},
  headlineWrapper: {
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
    borderRadius: 15,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: utils.colors.yellow,
  },
});

class ViewAccount extends React.Component {
  constructor(props) {
    super(props);

    const {profile} = props;

    const day = profile.dob.split('-')[0];
    const month = profile.dob.split('-')[1];
    const year = profile.dob.split('-')[2];

    this.state = {
      day: day || '',
      year: year || '',
      month: month || '',
      firstName: profile.first_name || '',
      familyName: profile.family_name || '',
      loading: false,
    };
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
    const {componentId, setProfile} = this.props;

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
        family_name: familyName,
        first_name: firstName,
        dob,
        UUID: uid,
        region: 'pnh',
        language: 'kh',
        phone_number: phoneNumber,
        created_at: Number(moment().format('x')),
      };

      updates[`users/${uid}`] = data;

      setProfile(data);
      await firebase.database().ref().update(updates);
      this.setState({loading: false});

      return Navigator.popBack(componentId);
    } catch (error) {
      this.setState({loading: false});
      alert(`Error: ${error.message}`);
    }
  };

  render() {
    const {day, year, month, firstName, familyName, loading} = this.state;
    const {componentId} = this.props;

    return (
      <View style={styles.conatiner}>
        <NavBar
          title="Profile"
          componentId={componentId}
          style={{backgroundColor: utils.colors.yellow}}
        />

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
              <ActivityIndicator size="small" color="black" />
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
      </View>
    );
  }
}

const mapState = ({profile}) => ({
  profile: profile.data,
});

const mapDispatch = {
  setProfile: ProfileActions.setProfile,
};

export default connect(mapState, mapDispatch)(ViewAccount);
