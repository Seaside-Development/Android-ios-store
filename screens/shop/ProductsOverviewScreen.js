import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Platform,
  TouchableNativeFeedback,
} from 'react-native';

import {Card, Button} from 'react-native-elements';
import {useSelector} from 'react-redux';
import CategoryOverviewScreen from './CategoryOverviewScreen';

// const productURL =
//   'https://reactstore-836e1-default-rtdb.firebaseio.com/Products.json';

const ProductsOverviewScreen = (props, route, navigation) => {
  //get the parameter
  const categoryName = props.navigation.getParam('categoryName');
  console.log(categoryName);
  //retrieve the array
  const products = useSelector(state => state.products.storeProducts);
  //filter the results based on the paramter
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
                <Card.Title>{itemData.item.name}</Card.Title>
                <Card.Title style={styles.price}>
                  ${itemData.item.price}
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
                    title="SEE MORE"
                    onPress={() => {
                        selectProductHandler(itemData.item.name, itemData.item.id,itemData.item.imageURL)
                    }}
                  />
                  <Button title="ADD TO CART" onPress={() => {}} />
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

CategoryOverviewScreen.navigationOptions = route => {
  return {
    title: route.navigation.getParam('categoryName'),
  };
};

export default ProductsOverviewScreen;
