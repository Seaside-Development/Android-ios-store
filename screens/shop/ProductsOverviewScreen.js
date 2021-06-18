import React, {useEffect, useState} from 'react';
import {
  FlatList,
  TouchableOpacity,
  ActivityIndicator, SafeAreaView
} from 'react-native';

import {Button} from 'react-native-paper';
import * as cartActions from '../../store/action/cart'
import {useDispatch} from 'react-redux';
import Colors from "../../constants/Colors";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from '../../UI/HeaderButton';
import ProductItem from "../../components/productCard.component";
import ClickAlert from "../../components/alert.component";
import * as Analytics from "expo-firebase-analytics";

const productURL =
  'https://reactstore-836e1-default-rtdb.firebaseio.com/Products.json';

const ProductsOverviewScreen = (props) => {
  let TouchableCmp = TouchableOpacity;
  const categoryName = props.navigation.getParam('categoryName');

  const [isLoading, setLoading] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(productURL)
        .then(response => response.json())
        .then(json => setData(json.filter(
          item => item.category === categoryName)))
        .catch(error => alert(error))
        .finally(() => setLoading(false))
  }, []);

  const dispatch = useDispatch();
  return (
    <SafeAreaView>
      {
        isLoading ? <ActivityIndicator size="large" color="#00ff00"/>
            :
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={itemData => (
              <ProductItem
                  image={itemData.item.imageURL}
                  name={itemData.item.name}
                  price={itemData.item.price}
                  onSelect={() => {
                    props.navigation.navigate('ProductsDetails', {
                      productName: itemData.item.name,
                      productID: itemData.item.id
                    });
                  }}
                  >
                <Button
                    color={Colors.primary}
                    onPress={async () => {ClickAlert();
                      props.navigation.navigate('ProductsDetails', {
                        productName: itemData.item.name,
                        productID: itemData.item.id,
                      });
                        await Analytics.logEvent('ButtonTapped',
                            {
                                name: 'add to cart',
                                screen: 'productDetails',
                                purpose: 'add item to cart',
                            })
                    }}>SEE MORE</Button>
                <Button
                    color={Colors.primary}
                    onPress={async () => {ClickAlert();
                      dispatch(cartActions.addItem(itemData.item));
                        await Analytics.logEvent('ButtonTapped',
                            {
                                name: 'add to cart',
                                screen: 'productOverviewScreen',
                                purpose: 'add item to cart',
                            })
                    }}
                >ADD TO CART</Button>
              </ProductItem>
          )}
        />
      }
    </SafeAreaView>
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('categoryName').toUpperCase(),
    headerRight: () =>
        <HeaderButtons
            HeaderButtonComponent={HeaderButton}>
          <Item
              title='Cart'
              iconName='md-cart'
              onPress={() => {
                navData.navigation.navigate('Cart');
              }}
          />
        </HeaderButtons>
  };
};

export default ProductsOverviewScreen;
