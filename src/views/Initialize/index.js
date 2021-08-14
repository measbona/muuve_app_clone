import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import styled from 'styled-components/native';
import {delay} from 'lodash';

import utils from '../../utils';

import ProfileActions from '../../redux/ProfileRedux';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${utils.colors.yellow};
`;

const ActivityIndicator = styled.ActivityIndicator``;

export default () => {
  const dispatch = useDispatch();

  useEffect(() => {
    delay(() => {
      dispatch(ProfileActions.initialProfile());
    });
  });

  return (
    <Container>
      <ActivityIndicator size="small" color="black" animating />
    </Container>
  );
};
