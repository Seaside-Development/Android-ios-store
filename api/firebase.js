import firestore from '@react-native-firebase/firestore';

export async function getProducts(productsRetrieved) {
  const productList = [];
  const snapshot = await firestore().collection('collections').get();

  snapshot.forEach(doc => {
    productList.push(doc.data);
  });

  productsRetrieved(productList);
}
