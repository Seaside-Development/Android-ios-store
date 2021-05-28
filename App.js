/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import {StatusBar as ExpoStatusBar} from 'expo-status-bar';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import {StatusBar, StyleSheet, SafeAreaView} from 'react-native';

import categoryReducer from './store/reducers/category';
import productReducer from './store/reducers/products';
import ShopNavigator from './navigation/ShopNavigator';

const rootReducer = combineReducers({
  categories: categoryReducer,
  products: productReducer,
});

const store = createStore(rootReducer);

export default function App() {
  return (
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <ShopNavigator />
        </SafeAreaView>
        <ExpoStatusBar style="auto" />
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  list: {
    flex: 1,
    padding: 16,
    backgroundColor: 'blue',
  },
});
