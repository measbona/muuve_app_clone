import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import Home from './src/views/Home';
import Verification from './src/views/Verification/Verification';
import Loading from './src/views/Loading/Loading';

AppRegistry.registerComponent(appName, () => Loading);
