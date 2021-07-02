import React from 'react';
import {map, get} from 'lodash'
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import firebase from '@react-native-firebase/database'
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
    items: {},
  };

  componentDidMount() {
    this.getItems()
  }

  getItems = async () => {
    const { restaurant } = this.props
    
    try {
      const ref = await firebase().ref(`items/${restaurant.key}`).once('value')
      const items = await ref.val()
      
      this.setState({ items })
    } catch (error) {
      throw new Error('Fail getting items')
    }
  }

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
  
  onItemPress = async (item, itemKey) => {
    const { restaurant: { key } } = this.props
    // const data = {}

    // data[itemKey] = {
    //   name: item.name,
    //   price: item.current_price,
    //   images: item.images,
    // }
  }

  render() {
    const {groupOrderStatred, items} = this.state;
    const {componentId, restaurant} = this.props;

    const merchantName = get(restaurant, 'name', 'N/A')
    const banner = get(restaurant, 'images.banner')

    return (
      <Container>
        <NavigationBack
          title={merchantName}
          navigate
          componentId={componentId}
        />
        <BannerWrapper>
          <Image
            source={{ uri: banner }}
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
            {map(items, (item, key) => 
              <React.Fragment key={key}>
                <Item item={item} onPress={() => this.onItemPress(item, key)} />
                <Divider />
              </React.Fragment>
            )}
          </ScrollView>
        </Content>

        {/* <CheckoutBottomSheet onPress={this.onCheckoutPress} /> */}

      </Container>
    );
  }
}
