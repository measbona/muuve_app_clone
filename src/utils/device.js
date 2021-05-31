import {Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const hasNotch = DeviceInfo.hasNotch();

export default {
  screenWidth,
  screenHeight,
};
