import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {delay} from 'lodash';

import utils from '../../utils';

import AppActions from '../../redux/AppRedux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: utils.colors.yellow,
  },
});

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    delay(() => {
      dispatch(AppActions.appInitial());
    });
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="black" animating />
    </View>
  );
};
