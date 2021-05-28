import STORE from '../../data/products';

const initialState = {
  storeProducts: STORE,
  Products: STORE.filter(prod => prod.id === '1'),
};

export default (state = initialState, actions) => {
  return state;
};
