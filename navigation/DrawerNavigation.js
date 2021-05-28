import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import ShopNavigator from './ShopNavigator';

const DrawerNavigator = createDrawerNavigator({
  HOME: {
    screen: ShopNavigator,
  },
});

export default createAppContainer(DrawerNavigator);
