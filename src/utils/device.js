import {Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const hasNotch = DeviceInfo.hasNotch();

const isIphoneX = Platform.OS === 'ios' && hasNotch;

const paddinngTop = () => {
  if (isIphoneX) {
    return 30;
  }

  return 20;
};

export default {
  screenWidth,
  screenHeight,
  hasNotch,
  paddinngTop,
  isIphoneX,
};
