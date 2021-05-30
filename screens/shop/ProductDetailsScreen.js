import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import * as cartActions from '../../store/action/cart'
import {
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  View,
  Button
} from 'react-native';
import Colors from '../../constants/Colors'

const ProductsDetailsScreen = (props) => {
  const productID = props.navigation.getParam('productID');
  console.log(productID);

  const selectedProduct = useSelector(
      state => state.products
          .storeProducts
          .find(prod => prod.id === productID));

  const dispatch = useDispatch();

  return (
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Image
              style={styles.imageContainer}
              source={{uri: selectedProduct.imageURL}}/>

          <View style={styles.action}>
            <Button
                color={Colors.primary}
                title="ADD TO CART"
                // onPress={() => cartActions.addItem(selectedProduct)}
                onPress={() =>  {dispatch(cartActions.addItem(selectedProduct))}}
            />
          </View>
          <Text style={styles.price}>
            ${selectedProduct.price.toFixed(2)}
          </Text>
          <Text style={styles.name}>
            {selectedProduct.name}
          </Text>
        </SafeAreaView>
      </ScrollView>
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
  };
}

export default ProductsDetailsScreen;
