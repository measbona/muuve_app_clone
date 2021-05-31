import React from 'react';
import styled from 'styled-components/native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {
  goToGroupOrder,
  showModalChoice,
  goToCheckout,
} from '../../navigation/screen';

import Device from '../../utils/device';
import Colors from '../../utils/colors';

import NavigationBack from '../../lib/NavigationBack';
import SearchBar from './components/SearchBar';
import Item from './components/Item';
import CheckoutBottomSheet from './components/CheckoutBottomSheet';

const Container = styled.View`
  flex: 1;
  position: relative;
`;

const ScrollView = styled.ScrollView``;

const Content = styled.View`
  flex: 1;
`;

const Divider = styled.View`
  border-width: 1px;
  margin-vertical: 15px;
  margin-horizontal: 20px;
  border-color: ${Colors.grey};
`;

const GroupOrderWrapper = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 16px;
  align-items: flex-start;
`;

const CategoryWrapper = styled.View`
  margin-left: 16px;
  flex-direction: row;
`;

const Button = styled.TouchableOpacity`
  margin-right: 10px;
  border-radius: 50px;
  flex-direction: row;
  align-items: center;
  padding-vertical: 7px;
  padding-horizontal: 15px;
  background-color: ${Colors.grey};
`;

const ButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${Colors.blue};
`;

const BannerWrapper = styled.View`
  position: relative;
`;

const Image = styled.Image`
  height: ${150}px;
  resize-mode: cover;
  width: ${Device.screenWidth}px;
`;

export default class Merchant extends React.PureComponent {
  state = {
    groupOrderStatred: false,
  };

  onEndSession = () => {
    showModalChoice({
      headline: 'End Session',
      description: `Your participants is ordering their items. Are you sure to terminate this session?`,
      no: 'Cancel',
      yes: 'Continue',
      onPress: () => this.setState({groupOrderStatred: false}),
    });
  };

  onCheckoutPress = () => {
    const {componentId} = this.props;

    goToCheckout(componentId);
  };

  onGroupOrderPress = () => {
    const {componentId} = this.props;
    showModalChoice({
      headline: 'Group Order',
      description: `Share your group order link with others. They can add their favorite items. Checkout and get it all delivered together.`,
      no: 'Cancel',
      yes: 'Start Group Order',
      onPress: () => {
        this.setState({groupOrderStatred: true}, () => {
          goToGroupOrder(componentId);
        });
      },
    });
  };

  render() {
    const {groupOrderStatred} = this.state;
    const {componentId} = this.props;

    return (
      <Container>
        <NavigationBack
          title="Merchant Name"
          navigate
          componentId={componentId}
        />
        <BannerWrapper>
          <Image
            source={{
              uri:
                'https://cdn.auntieannes.com/-/media/auntie-annes/newsroom/pretzel_nation_creation_winner.jpg?v=1&d=20181114T183106Z',
            }}
          />
        </BannerWrapper>
        <GroupOrderWrapper>
          {!groupOrderStatred ? (
            <Button activeOpacity={0.5} onPress={this.onGroupOrderPress}>
              <MIcon
                name="group-add"
                size={20}
                color={Colors.blue}
                style={{marginRight: 5}}
              />
              <ButtonText>Group Order</ButtonText>
            </Button>
          ) : (
            <Button activeOpacity={0.5} onPress={this.onEndSession}>
              <MIcon
                name="exit-to-app"
                size={18}
                color={Colors.blue}
                style={{marginRight: 5}}
              />
              <ButtonText>End Session</ButtonText>
            </Button>
          )}
        </GroupOrderWrapper>
        <CategoryWrapper>
          <ScrollView horizontal showHorizontalScrollIndicator={false}>
            <Button activeOpacity={0.5}>
              <ButtonText>Menu</ButtonText>
              <MIcon name="keyboard-arrow-down" color={Colors.blue} size={20} />
            </Button>
            <Button activeOpacity={0.5}>
              <ButtonText>Editor's Choice</ButtonText>
            </Button>
            <Button activeOpacity={0.5}>
              <ButtonText>Drink</ButtonText>
            </Button>
            <Button activeOpacity={0.5}>
              <ButtonText>Other</ButtonText>
            </Button>
          </ScrollView>
        </CategoryWrapper>
        <Content>
          <SearchBar />
          <ScrollView showVerticalScrollIndicator={false}>
            <Item />
            <Divider />
            <Item />
            <Divider />
            <Item />
            <Divider />
            <Item />
            <Divider />
            <Item />
            <Divider />
            <Item />
          </ScrollView>
        </Content>
        <CheckoutBottomSheet onPress={this.onCheckoutPress} />
      </Container>
    );
  }
}
