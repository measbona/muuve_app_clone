import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import Home from './src/views/Home';
import Profile from './src/views/Profile';

AppRegistry.registerComponent(appName, () => Profile);