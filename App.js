import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './reducers';
import './config/firebase';

const store = createStore(reducer, applyMiddleware(thunkMiddleware, logger));

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text>pawSpace — SDK 57 migration foundation is up.</Text>
        <Text>Navigation and screens are ported in the next phase.</Text>
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
