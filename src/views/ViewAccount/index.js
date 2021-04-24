import React from 'react';
import {Keyboard} from 'react-native';
import styled from 'styled-components/native';

import utils from '../../utils';

import Header from './components/Header';
import NameInput from './components/NameInput';
import DateBirthInput from './components/BirthDate';

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
    day: 0,
    year: 0,
    month: '',
    firstName: '',
    familyName: '',
  };

  render() {
    const {componentId} = this.props;

    return (
      <Container>
        <Header componentId={componentId} />
        <ContentWrapper activeOpacity={1} onPress={() => Keyboard.dismiss()}>
          <HeadlineWrapper>
            <Headline>Edit your profile</Headline>
          </HeadlineWrapper>
          <NameInput
            name="Family Name"
            placeholder="Enter Family Name"
            onChange={(val) => this.setState({familyName: val})}
          />
          <NameInput
            name="First Name"
            placeholder="Enter First Name"
            onChange={(val) => this.setState({familyName: val})}
          />
          <DateBirthInput
            name="Date of birth"
            onDayChange={(val) => this.setState({day: val})}
            onMonthChange={(val) => this.setState({month: val})}
            onYearChange={(val) => this.setState({year: val})}
          />
          <ButtonWrapper activeOpacity={0.7} onPress={() => {}}>
            <ButtonText>SAVE</ButtonText>
          </ButtonWrapper>
        </ContentWrapper>
      </Container>
    );
  }
}
