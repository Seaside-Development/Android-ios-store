import React, {Component} from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';

import ShopNavigator from './ShopNavigator';

const RootNavigator = createDrawerNavigator({
  HOME: {
    screen: ShopNavigator,
  },
});

// export default createAppContainer(RootNavigator);
