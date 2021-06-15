/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import {StatusBar as ExpoStatusBar} from 'expo-status-bar';
import { useFonts } from 'expo-font';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {persistReducer, persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";
import AsyncStorage from '@react-native-async-storage/async-storage'

import {StatusBar, StyleSheet, SafeAreaView} from 'react-native';
import {composeWithDevTools} from 'redux-devtools-extension'

import Navigator from './navigation/ShopNavigator';
import categoryReducer from './store/reducers/category';
import productReducer from './store/reducers/products';
import cartReducer from "./store/reducers/cart";
import userReducer from "./store/reducers/user";
import thunk from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    categories: categoryReducer,
    products: productReducer,
    cart: cartReducer,
    user: userReducer,
});

const persist = persistReducer(persistConfig, rootReducer);
const store = createStore(persist, composeWithDevTools(), applyMiddleware(thunk));
const persistor = persistStore(store);

export default function App() {

    const [loaded] = useFonts({
        OpenSansBold: require('./assets/fonts/OpenSans-Bold.ttf'),
        OpenSansBoldItalic: require('./assets/fonts/OpenSans-BoldItalic.ttf'),
        OpenSansExtraBold: require('./assets/fonts/OpenSans-ExtraBold.ttf'),
        OpenSansExtraBoldItalic: require('./assets/fonts/OpenSans-ExtraBoldItalic.ttf'),
        OpenSansItalic: require('./assets/fonts/OpenSans-Italic.ttf'),
        OpenSansLight: require('./assets/fonts/OpenSans-Light.ttf'),
        OpenSansRegular: require('./assets/fonts/OpenSans-Regular.ttf'),
        OpenSansSemiBold: require('./assets/fonts/OpenSans-SemiBold.ttf'),
    });

    if (!loaded) {
        return null;
    }
  return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
              <SafeAreaView style={styles.container}>
                  <Navigator />
              </SafeAreaView>
              <ExpoStatusBar style="auto" />
          </PersistGate>
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
