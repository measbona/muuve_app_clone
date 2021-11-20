/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as Navigator from '../../navigation/screen';
import * as Animatable from 'react-native-animatable';

import utils from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  addItemWrapper: {
    flexDirection: 'row',
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    backgroundColor: utils.colors.white,
    paddingBottom: utils.device.isIphoneX ? 15 : 0,
  },
  button: {
    flex: 1,
    minHeight: 40,
    borderRadius: 15,
    marginVertical: 16,
    alignItems: 'center',
    marginHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: utils.colors.yellow,
  },
  operatorWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  operatorButton: {
    minWidth: 40,
    minHeight: 30,
    borderRadius: 15,
    marginVertical: 16,
    alignItems: 'center',
    marginHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: utils.colors.grey,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: utils.colors.blue,
  },
  image: {
    resizeMode: 'cover',
    backgroundColor: utils.colors.grey,
    width: utils.device.screenWidth,
    height: utils.device.screenHeight / 4,
  },
  closeButton: {
    top: 50,
    right: 20,
    minWidth: 35,
    minHeight: 35,
    borderRadius: 50,
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    backgroundColor: utils.colors.grey,
  },
  itemNameWrapper: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noteWrapper: {
    marginHorizontal: 16,
  },
  textInput: {
    padding: 10,
    minHeight: 100,
    borderRadius: 15,
    backgroundColor: utils.colors.grey,
  },
});

class ModalItemDetail extends React.PureComponent {
  constructor(props) {
    super(props);

    const {type, item} = props;

    this.state = {
      quantity: type === 'remove-item' ? item.quantity : 1,
      mounted: false,
      disabled: true,
    };

    this.containerRef = React.createRef();
  }

  componentDidMount() {
    Navigator.bindComponent(this);
  }

  componentDidAppear() {
    this.setState({mounted: true});
  }

  componentDidUpdate() {
    const {quantity} = this.state;

    if (quantity === 1) {
      this.setState({disabledDecrease: true});
    }
  }

  onClose = async () => {
    await this.containerRef.fadeOutDown(300);
    Navigator.dismissOverLay();
  };

  onAddItem = () => {
    const {quantity} = this.state;
    const {resolve} = this.props;

    const resolveData = {
      quantity,
    };

    resolve(resolveData);
    this.onClose();
  };

  onQuantity = (action) => {
    const {quantity, disabledDecrease} = this.state;
    const {resolve} = this.props;

    let newQuantity = quantity;

    if (action === 'add') {
      if (disabledDecrease) {
        this.setState({disabledDecrease: false});
      }

      newQuantity += 1;
    } else {
      newQuantity -= 1;
    }

    if (newQuantity === 0) {
      return Navigator.showModalChoice({
        headline: 'Remove Item',
        description: 'Are you sure to remove this item?',
        no: 'Cancel',
        yes: 'Continute',
        onPress: () => {
          this.onClose();
          resolve({removeItem: true});
        },
      });
    }

    this.setState({quantity: newQuantity});
  };

  render() {
    const {mounted, quantity, disabledDecrease} = this.state;
    const {item, type} = this.props;

    const disabled =
      (type !== 'remove-item' && disabledDecrease) || quantity === 0;

    const itemImageSource = Boolean(item.images)
      ? {uri: item.images.image}
      : require('../../assets/images/muuve_logo.png');

    return (
      <Animatable.View
        duration={300}
        animation="fadeInUp"
        style={styles.container}
        ref={(ref) => (this.containerRef = ref)}>
        {mounted ? (
          <React.Fragment>
            <View style={styles.imageWrapper}>
              <Image style={styles.image} source={itemImageSource} />

              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.closeButton}
                onPress={this.onClose}>
                <Text style={[styles.text, {fontSize: 17}]}>X</Text>
              </TouchableOpacity>

              <View style={styles.itemNameWrapper}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{`$${
                  item.current_price || item.price
                }`}</Text>
              </View>

              <View style={styles.noteWrapper}>
                <Text
                  style={[
                    styles.text,
                    {color: utils.colors.black, marginBottom: 10},
                  ]}>
                  Special Note
                </Text>
                <TextInput
                  multiline
                  autoCorrect={false}
                  textAlignVertical="top"
                  style={[styles.textInput, styles.text]}
                  underlineColorAndroid="transparent"
                  placeholder="Add your special note here..."
                />
              </View>
            </View>

            <View style={[styles.addItemWrapper, utils.shadows.bottomBar]}>
              <View style={styles.operatorWrapper}>
                <TouchableOpacity
                  disabled={disabled}
                  activeOpacity={0.7}
                  style={[
                    styles.operatorButton,
                    disabled && {backgroundColor: utils.colors.lightGrey},
                  ]}
                  onPress={() => this.onQuantity('substract')}>
                  <Text
                    style={[
                      styles.text,
                      disabled && {color: utils.colors.border},
                    ]}>
                    -
                  </Text>
                </TouchableOpacity>
                <Text style={[styles.text, {fontSize: 17}]}>{quantity}</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.operatorButton}
                  onPress={() => this.onQuantity('add')}>
                  <Text style={styles.text}>+</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.7}
                onPress={this.onAddItem}>
                <Text style={[styles.text, {color: utils.colors.black}]}>
                  ADD
                </Text>
              </TouchableOpacity>
            </View>
          </React.Fragment>
        ) : null}
      </Animatable.View>
    );
  }
}

const mapState = ({cart}) => ({
  cart: cart.data,
});

export default connect(mapState)(ModalItemDetail);
