import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {Platform} from 'react-native';

import CategoryOverviewScreen from '../screens/shop/CategoryOverviewScreen';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductsDetailsScreen from '../screens/shop/ProductDetailsScreen';
import ProductListScreen from '../screens/store/ProductListScreen';

import HeaderComponent from '../components/header.component';
import Colors from '../constants/Colors';

const screens = {
  CategoryOverview: {
    screen: CategoryOverviewScreen,
    navigationOptions: ({navigation}) => {
      return {
        headerTitle: () => <HeaderComponent navigation={navigation} />,
      };
    },
  },
  ProductsOverview: {
    screen: ProductsOverviewScreen,
    navigationOptions: {
      title: 'PRODUCT OVERVIEW',
    },
  },
  ProductsDetails: {
    screen: ProductsDetailsScreen,
    navigationOptions: {
      title: 'PRODUCT DETAILS',
    },
  },
  ProductList: {
    screen: ProductListScreen,
    navigationOptions: {
      title: 'PRODUCT LIST',
    },
  },
};
const ShopNavigator = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
      height: 45,
    },
    headerTitleStyle: 'OpenSansExtraBold',
    headerBackTitleStyle: {
      fontFamily: 'OpenSansExtraBold',
    },
    headerTintColor: Platform.OS === 'android' ? 'black' : Colors.primary,
  },
});

// export default ShopNavigator;
export default createAppContainer(ShopNavigator);
