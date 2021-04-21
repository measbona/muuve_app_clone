import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

// import Home from './src/views/Home';
// import LoginPhoneNumber from './src/views/LoginPhone';
import GroupOrder from './src/views/GroupOrder';

AppRegistry.registerComponent(appName, () => GroupOrder);
