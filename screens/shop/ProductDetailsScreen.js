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
});

export default ProductsDetailsScreen;
