import CATEGORY from '../../data/startingData';

const initialState = {
  availableProducts: CATEGORY,
  userProducts: CATEGORY.filter(prod => prod.id === '1'),
};

export default (state = initialState, actions) => {
  return state;
};

