import React from 'react';
import {connect} from 'react-redux';
import {View, ScrollView, StyleSheet} from 'react-native';
import * as Navigator from '../../navigation/screen';
import * as Animatable from 'react-native-animatable';

import utils from '../../utils';

import NavBar from '../../lib/NavBar';
import ItemSection from '../Checkout/components/ItemSection';
import PaymentSection from '../Checkout/components/PaymentSection';
import MerchantSection from '../Checkout/components/MerchantSection';
import DeliveryLocationSection from '../Checkout/components/DeliveryLocationSection';

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: utils.colors.lightGrey,
  },
  content: {flex: 1},
});

class OrderDetails extends React.PureComponent {
  state = {
    mounted: false,
  };

  componentDidMount() {
    Navigator.bindComponent(this);
  }

  componentDidAppear() {
    this.setState({mounted: true});
  }

  render() {
    const {componentId} = this.props;

    return (
      <View style={styles.conatiner}>
        <NavBar
          title="Order Details"
          componentId={componentId}
          style={{backgroundColor: utils.colors.yellow}}
        />

        <Animatable.View
          style={styles.content}
          animation="fadeIn"
          duration={300}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <MerchantSection orderType="order-details" />
            <DeliveryLocationSection orderType="order-details" />
            <ItemSection orderType="order-details" />
            <PaymentSection />
          </ScrollView>
        </Animatable.View>
      </View>
    );
  }
}

const mapState = ({}) => ({});

export default connect(mapState)(OrderDetails);
