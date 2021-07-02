import React from 'react';
import {Keyboard} from 'react-native';
import moment from 'moment';
import styled from 'styled-components/native';
import firebase from '@react-native-firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

import utils from '../../utils';
import { showModalNotice, popBack } from '../../navigation/screen'

import NameInput from './components/NameInput';
import DateBirthInput from './components/BirthDate';
import NavigationBack from '../../lib/NavigationBack';

const Container = styled.View`
  flex: 1;
`;

const HeadlineWrapper = styled.View`
  margin-top: 25px;
`;

const ContentWrapper = styled.TouchableOpacity`
  margin-horizontal: 20px;
`;

const Headline = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: ${utils.colors.blue};
`;

const ButtonWrapper = styled.TouchableOpacity`
  height: 40px;
  margin-top: 15px;
  align-items: center;
  border-radius: 17px;
  justify-content: center;
  background-color: ${utils.colors.yellow};
`;

const ButtonText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${utils.colors.black};
`;

export default class ViewAccount extends React.Component {
  state = {
    day: '',
    year: '',
    month: '',
    firstName: '',
    familyName: '',
  };

  componentDidMount() {
    this.getUserFromStorage()
  }

  getUserFromStorage = async () => {
    const userStorage = await AsyncStorage.getItem('user')
    const user = JSON.parse(userStorage)

    const { family_name: familyName, first_name: firstName, dob  } = user
    const day = dob && dob.split('-')[0] || ''
    const month = dob && dob.split('-')[1] || ''
    const year = dob && dob.split('-')[2] || ''

    this.setState({
      familyName,
      firstName,
      day,
      month,
      year
    })
  }

  validationData = () => {
    const { familyName, firstName } = this.state

    return new Promise((resolve) => {

      if (familyName.length === 0 || firstName.length === 0) {
        const isFamilyNameError = familyName.length === 0

        return showModalNotice({
          headline: 'Invalid Input',
          description: `${isFamilyNameError ? 'Family Name' : 'Frist Name'} can't be blank.`,
          buttonName: 'Continue',
        });
      }

      resolve(true)
    })
  }

  onSavePress = async () => {
    const { day, year, month, firstName, familyName } = this.state
    const { componentId, onSavePress } = this.props

    const uid = firebase.auth().currentUser.uid
    const phoneNumber = firebase.auth().currentUser.phoneNumber
    const dob = day > 0 && month.length !== 0 && year > 0 && `${day}-${month}-${year}` || ''

    try {
      await this.validationData()

      const updates = {}
      const data = {
        family_name: familyName,
        first_name: firstName,
        dob,
        UUID: uid,
        region: 'pnh',
        language: 'kh',
        phone_number: phoneNumber,
        created_at: Number(moment().format('x')),
      }

      updates[`users/${uid}`] = data

      onSavePress(data)
      await AsyncStorage.setItem('user', JSON.stringify(data))
      await firebase.database().ref().update(updates)

      return popBack(componentId)
    } catch (error) {
      alert(`Error: ${error.message}`)
    }
  }

  render() {
    const { day, year, month, firstName, familyName } = this.state
    const { componentId } = this.props;

    return (
      <Container>
        <NavigationBack title="Profile" navigate componentId={componentId} />
        <ContentWrapper activeOpacity={1} onPress={() => Keyboard.dismiss()}>
          <HeadlineWrapper>
            <Headline>Edit your profile</Headline>
          </HeadlineWrapper>
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
            onMonthChange={(val) => this.setState({month: val})}
            onYearChange={(val) => this.setState({year: val})}
          />
          <ButtonWrapper activeOpacity={0.7} onPress={this.onSavePress}>
            <ButtonText>SAVE</ButtonText>
          </ButtonWrapper>
        </ContentWrapper>
      </Container>
    );
  }
}
