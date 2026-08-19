import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import reducer from './reducers';
import RootNavigator from './navigation/RootNavigator';
import './config/firebase';

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <RootNavigator />
        <StatusBar style="auto" />
      </Provider>
    </GestureHandlerRootView>
  );
}
