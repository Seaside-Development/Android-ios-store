import React from 'react';
import {useSelector} from "react-redux";
import {Text, SafeAreaView, StyleSheet, StatusBar, ScrollView, Image, Button} from 'react-native';


const ProductsDetailsScreen = (props, navigation) => {

  const productID = props.navigation.getParam('productID');
  console.log(productID);

  const selectedProduct = useSelector(
      state => state.products
          .storeProducts
          .find(prod => prod.id === productID));

  return (
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Image
              style={styles.imageContainer}
              source={{uri: selectedProduct.imageURL}}/>
          <Button
              title="ADD TO CART" onPress={() => {}}/>
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
  },
  title: {
    fontFamily: 'OpenSansBold',
    fontSize: 18,
    marginVertical: 2,
  },
  imageContainer: {
    width: '100%',
    height: 100,
  }
});

ProductsDetailsScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productName').toUpperCase(),
  };
}

export default ProductsDetailsScreen;
