import React from 'react';
import styled from 'styled-components/native';
import Header from './components/Header';
import InputText from './components/InputText';
import ButtonLogin from './components/ButtonLogin';

const Container = styled.View`
  flex: 1;
  background-color: #f3f3f3;
`;

const ContentWrapper = styled.View`
  margin-horizontal: 16px;
`;

const HeadlineWrapper = styled.View`
  margin-vertical: 20px;
`;

const Headline = styled.Text`
  font-size: 17px;
  font-weight: 700;
  color: #004da6;
`;


export default class Profile extends React.Component {
  render() {
    return (
      <Container>
        <Header/>
        <ContentWrapper>
          <HeadlineWrapper>
              <Headline>Edit your profile</Headline>
          </HeadlineWrapper>
        </ContentWrapper>
        <ContentWrapper>
          <InputText/>
        </ContentWrapper>
        <ContentWrapper>
          <ButtonLogin/>
        </ContentWrapper>
      </Container>
      
    );
  }
}