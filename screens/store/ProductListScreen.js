import React, {Component} from 'react';
import {StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {getProducts} from '../../api/firebase';
import {ListItem, Divider} from 'react-native-elements';

class ProductListScreen extends Component {
  state = {
    productList: [],
    selectedIndex: 0,
  };

  productsRetrieved = productList => {
    this.setState(prevState => ({
      productList: (prevState.productList = productList),
    }));
  };

  componentDidMount() {
    getProducts(this.productsRetrieved);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.productList}
          ItemSeparatorComponent={() => (
            <Divider style={{backgroundColor: 'black'}} />
          )}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <ListItem
                containerStyle={styles.listItem}
                title={item.items}
                subtitle={`Category: ${item.routeName}`}
                titleStyle={styles.titleStyle}
                subtitleStyle={styles.subtitleStyle}
                leftAvatar={{
                  size: 'large',
                  rounded: false,
                  source: item.image && {uri: item.image},
                }}
              />
            );
          }}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    marginTop: 8,
    marginBottom: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 30,
  },
  subtitleStyle: {
    fontSize: 18,
  },
  emptyTitle: {
    fontSize: 32,
    marginBottom: 16,
  },
  emptySubtitle: {
    fontSize: 18,
    fontStyle: 'italic',
  },
});

export default ProductListScreen;
