import React from 'react';
import styled from 'styled-components/native';
import firebase from '@react-native-firebase/database'
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import utils from '../../utils';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${utils.colors.yellow};
`;

const ActivityIndicator = styled.ActivityIndicator``;

export default class Loading extends React.PureComponent {
  componentDidMount() {
    const { resolve } = this.props

    this.fetchMerchant()
    this.fetchUser()

    resolve(true)
  }

  fetchUser = async () => {
    try {
      const userUid = auth().currentUser.uid
      const ref = await firebase().ref(`users/${userUid}`).once('value')
      const data = await ref.val() || {}

      if (data) {
        const user = JSON.stringify(data)

        return await AsyncStorage.setItem('user', user)
      }

      return await AsyncStorage.setItem('user', {})
    } catch (error) {
      //
    }
  }

  fetchMerchant = async () => {
    try {
      const ref = await firebase().ref('restaurants').once('value')
      const data = await ref.val()
      const restaurants = JSON.stringify(data)

      return await AsyncStorage.setItem('restaurants', restaurants)
    } catch (error) {
      throw new Error('Error fetching merchant')
    }
  }

  render() {
    return (
      <Container>
        <ActivityIndicator size="small" color="black" animating />
      </Container>
    ); 
  }
}
