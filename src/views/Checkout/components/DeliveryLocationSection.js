/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {startCase} from 'lodash';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MapView, {Marker} from 'react-native-maps';
import * as Animatable from 'react-native-animatable';

import utils from '../../../utils';

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 7,
    paddingVertical: 15,
    paddingHorizontal: 16,
    backgroundColor: utils.colors.white,
  },
  headlineWrapper: {
    marginBottom: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 13,
    backgroundColor: utils.colors.grey,
  },
  text: {
    fontSize: 11,
    fontWeight: 'bold',
    color: utils.colors.blue,
  },
  location: {flexDirection: 'row'},
  mapWrapper: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    height: 100,
    alignSelf: 'center',
    width: utils.device.screenWidth - 32,
  },
});

export default ({orderType, order}) => {
  const ASPECT_RATIO = utils.device.screenWidth / 100;
  const isOrderDetails = orderType === 'order-details';

  const deliveryAddress = isOrderDetails
    ? order.delivery_address
    : 'Current Address';

  const deliveryPlaceName = isOrderDetails
    ? order.delivery_place_name
    : 'Street 67 5A, 120020 Doun Penh, Cambodia';

  const {latitude, longitude} = isOrderDetails
    ? order.requestCoords
    : {
        latitude: 11.543443,
        longitude: 104.893875,
      };

  return (
    <View style={styles.wrapper}>
      <View style={styles.headlineWrapper}>
        <Text style={[styles.text, {fontSize: 17}]}>Delivery Location</Text>
        {!isOrderDetails ? (
          <TouchableOpacity style={styles.button} activeOpacity={0.7}>
            <Text style={[styles.text, {fontSize: 12}]}>Change</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.location}>
        <MIcon
          name="my-location"
          size={18}
          style={{marginTop: 2, marginRight: 5}}
        />
        <View>
          <Text
            style={[styles.text, {fontSize: 15, color: utils.colors.black}]}>
            {startCase(deliveryAddress)}
          </Text>
          <Text
            style={[styles.text, {fontSize: 12, color: utils.colors.border}]}>
            {deliveryPlaceName}
          </Text>
        </View>
      </View>

      {isOrderDetails ? (
        <Animatable.View
          style={styles.mapWrapper}
          animation="fadeIn"
          delay={500}
          duration={300}>
          <MapView
            provider="google"
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.00015 * ASPECT_RATIO,
              longitudeDelta: 0.0021 * ASPECT_RATIO,
            }}
            style={styles.map}
            zoomEnabled={false}
            pitchEnabled={false}
            showsCompass={false}
            showsTraffic={false}
            showsIndoors={false}
            scrollEnabled={false}
            showsBuildings={false}
            showsMyLocationButton={false}
            showsIndoorLevelPicker={false}>
            <Marker
              coordinate={{latitude, longitude}}
              image={require('../../../assets/images/delivery-pin.png')}
            />
          </MapView>
        </Animatable.View>
      ) : null}
    </View>
  );
};
