import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import * as cartActions from '../../store/action/cart'
import {
    Text,
    SafeAreaView,
    StyleSheet,
    StatusBar,
    Image,
    View,
    FlatList, ActivityIndicator
} from 'react-native';
import {Button} from 'react-native-paper';
import Colors from '../../constants/Colors'
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from "../../UI/HeaderButton";
import ClickAlert from '../../components/alert.component'
import * as Analytics from 'expo-firebase-analytics';

const URI  =
    'https://reactstore-836e1-default-rtdb.firebaseio.com/Products.json';

const ProductsDetailsScreen = (props) => {
    const productID = props.navigation.getParam('productID');
    const [isLoading, setLoading] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(URI)
            .then(response => response.json())
            .then(json => setData(json.filter(prod => prod.id === productID)))
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
                          <View>
                              <Image
                                  style={styles.imageContainer}
                                  source={{uri: itemData.item.imageURL}}/>
                              <View style={styles.action}>
                                  <Button
                                      color={Colors.primary}
                                      onPress={async () =>
                                      {ClickAlert(); dispatch(cartActions.addItem(itemData.item));
                                          await Analytics.logEvent('ButtonTapped',
                                              {
                                                  name: 'add to cart',
                                                  screen: 'productDetails',
                                                  purpose: 'added item to cart',
                                              })
                                      }}
                                  >ADD TO CART</Button>
                              </View>
                              <Text style={styles.price}>
                                  ${itemData.item.price.toFixed(2)}
                              </Text>
                              <Text style={styles.name}>
                                  {itemData.item.name}
                              </Text>
                          </View>
                      )}
                  />
          }
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    paddingLeft: 10,
    paddingRight: 10,
  },
  price: {
    fontFamily: 'OpenSansBold',
    fontSize: 20,
    marginVertical: 20,
    textAlign: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 500,
  },
  name: {
    fontFamily: 'OpenSansRegular',
    fontSize: 15,
    textAlign: 'center',
  },
  action: {
    color: 'black',
    marginVertical: 10,
    alignItems: 'center',
  }
});

ProductsDetailsScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productName').toUpperCase(),
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
}

export default ProductsDetailsScreen;
