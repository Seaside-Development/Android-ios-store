import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
  ActivityIndicator, SafeAreaView
} from 'react-native';

import {Button} from 'react-native-paper';

import {Card} from 'react-native-elements';
import * as cartActions from '../../store/action/cart'
import {useDispatch} from 'react-redux';
import Colors from "../../constants/Colors";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import HeaderButton from '../../UI/HeaderButton';

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

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.container}>
      {
        isLoading ? <ActivityIndicator size="large" color="#00ff00"/>
            :
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={itemData => (
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
                          onPress={() => {
                            props.navigation.navigate('ProductsDetails', {
                              productName: itemData.item.name,
                              productID: itemData.item.id,
                              productPrice: itemData.item.price,
                              productImage: itemData.item.imageURL,
                            });
                          }}
                      >SEE MORE</Button>
                      <Button
                          color={Colors.primary}
                          onPress={() => {
                            dispatch(cartActions.addItem(itemData.item))}}
                      >ADD TO CART </Button>
                    </View>
                  </Card>
                </TouchableCmp>
              </View>
          )}
        />
      }
    </SafeAreaView>
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
