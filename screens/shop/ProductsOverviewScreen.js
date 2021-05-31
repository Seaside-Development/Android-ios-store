import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  Button
} from 'react-native';

import {Card} from 'react-native-elements';
import * as cartActions from '../../store/action/cart'
import {useDispatch, useSelector} from 'react-redux';
import Colors from "../../constants/Colors";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from '../../UI/HeaderButton';

// const productURL =
//   'https://reactstore-836e1-default-rtdb.firebaseio.com/Products.json';

const ProductsOverviewScreen = (props, route, navigation) => {
  const categoryName = props.navigation.getParam('categoryName');
  console.log(categoryName);
  const products = useSelector(state => state.products.storeProducts);
  const data = products.filter(item => item.category === categoryName);

  // const [isLoading, setLoading] = useState([]);
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetch(productURL)
  //     .then(response => response.json())
  //     .then(json => setData(json))
  //     .catch(error => alert(error))
  //     .finally(setLoading(false));
  // }, []);

  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const dispatch = useDispatch();

  return (
    // <SafeAreaView style={styles.container}>
    //   {isLoading ? (
    //     <ActivityIndicator />
    //   ) : (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={itemData => {
        return (
          <View style={styles.touchable}>
            <TouchableCmp onPress={props.onSelect} useForeground>
              <Card style={styles.card}>
                <Card.Title>{itemData.item.name.toString()}</Card.Title>
                <Card.Title style={styles.price}>
                  ${itemData.item.price.toFixed(2)}
                </Card.Title>
                <Card.Image
                  style={styles.image}
                  source={{uri: itemData.item.imageURL}}
                  onPress={() => {
                    props.navigation.navigate('ProductsDetails', {
                      productName: itemData.item.name,
                      productID: itemData.item.id,
                      productPrice: itemData.item.price,
                      productImage: itemData.item.imageURL,
                    });
                  }}
                />
                <View style={styles.actions}>
                  <Button
                      color={Colors.primary}
                      title="SEE MORE"
                      onPress={() => {
                      props.navigation.navigate('ProductsDetails', {
                        productName: itemData.item.name,
                        productID: itemData.item.id,
                        productPrice: itemData.item.price,
                        productImage: itemData.item.imageURL,
                      });
                    }}
                  />
                  <Button
                      color={Colors.primary}
                      title="ADD TO CART"
                      onPress={() => {
                        dispatch(cartActions.addItem(itemData.item))}}
                  />
                </View>
              </Card>
            </TouchableCmp>
          </View>
        );
      }}
    />
    //   )}
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 220,
  },
  title: {
    fontFamily: 'OpenSansBold',
    fontSize: 18,
    marginVertical: 2,
  },
  price: {
    fontFamily: 'OpenSansRegular',
    fontWeight: 'bold',
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
});

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
