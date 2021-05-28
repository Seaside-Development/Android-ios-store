import React from 'react';
import {View, Text, SafeAreaView, StyleSheet, StatusBar} from 'react-native';
const ProductsDetailsScreen = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>PRODUCT DETAILS</Text>
      </View>
    </SafeAreaView>
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

export default ProductsDetailsScreen;
