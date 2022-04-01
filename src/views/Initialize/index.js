import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import {delay} from 'lodash';

import utils from '../../utils';
import Loading from '../../lib/Loading';
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

  // useEffect(() => {
  //   delay(() => {
  //     dispatch(AppActions.appInitial());
  //   });
  // });

  return (
    <View style={styles.container}>
      <Loading />
    </View>
  );
};
