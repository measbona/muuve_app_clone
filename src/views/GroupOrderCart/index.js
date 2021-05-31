import React from 'react';
import {Share} from 'react-native';
import styled from 'styled-components/native';
import {showModalChoice} from '../../navigation/screen';

import Colors from '../../utils/colors';

import NavigationBack from '../../lib/NavigationBack';
import CardInfo from './components/CardInfo';
import Participant from './components/Participant';

const Container = styled.View`
  flex: 1;
`;

const Content = styled.View`
  flex: 1;
`;

const ScrollView = styled.ScrollView``;

const Divider = styled.View`
  border-width: 1px;
  margin-vertical: 15px;
  margin-horizontal: 20px;
  border-color: ${Colors.grey};
`;

export default class GroupOrderCart extends React.PureComponent {
  onAddMoreParticipant = async () => {
    try {
      const result = await Share.share({
        url: 'https://stgmuuve.page.link/5SFGTV78SSKJ23',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  onEndSession = () => {
    showModalChoice({
      headline: 'End Session',
      description: `Your participants is ordering their items. Are you sure to terminate this session?`,
      no: 'Cancel',
      yes: 'Continue',
      onPress: () => {},
    });
  };

  render() {
    const {componentId} = this.props;

    return (
      <Container>
        <NavigationBack
          title="Group Order Cart"
          navigate
          componentId={componentId}
        />
        <Content>
          <CardInfo
            onAddMoreParticipant={this.onAddMoreParticipant}
            onEndSession={this.onEndSession}
          />
          <ScrollView>
            <Participant />
            <Divider />
            <Participant />
          </ScrollView>
        </Content>
      </Container>
    );
  }
}
