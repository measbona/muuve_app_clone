import React, {useState, useEffect} from 'react';
import {forEach} from 'lodash'
import styled from 'styled-components/native';
import firebase from '@react-native-firebase/database'
import AsyncStorage from '@react-native-async-storage/async-storage';

import utils from '../../utils';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${utils.colors.yellow};
`;

const Loading = styled.ActivityIndicator``;

export default props => {
  const {resolve} = props

  useEffect(() => {
    fetchMerchant()

    resolve(true)
  });

  const fetchMerchant = async () => {
    try {
      const ref = await firebase().ref('restaurants').once('value')
      const data = await ref.val()
      const restaurants = JSON.stringify(data)

      await AsyncStorage.setItem('restaurants', restaurants)
    } catch (error) {
      throw new Error('Error fetching merchant')
    }
  }

  return (
    <Container>
      <Loading size="small" color="black" animating />
    </Container>
  ); 
};
