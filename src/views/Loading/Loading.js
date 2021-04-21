import React from 'react';
import { Dimensions, Image, Text, View, ActivityIndicator, StyleSheet, } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
`;

const ViewContent = styled.View`
  background-color: #fcbd3e;
  width: 100%;
  height: 100%;
  justifyContent: center;
`;





export default class Loading extends React.PureComponent {
    render() {
        return (
            <Container>

                <ViewContent>
                    <View >

                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>
                </ViewContent>

            </Container>
        );
    }
}