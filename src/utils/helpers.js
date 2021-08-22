import {reduce, forEach} from 'lodash';

const convertObjectToArray = (data) => {
  return reduce(
    data,
    (result, value, key) => {
      result.push({...value, key});
      return result;
    },
    [],
  );
};

const removeWhiteSpace = (string) => string.replace(/^ /g, '');

const removeLeadZeroNumber = (number) => number.replace(/^0(?:0:0?)?/, '');

const sumCartTotal = (cart) => {
  let total = 0;

  forEach(cart, (item) => (total += item.price));

  return total;
};

export default {
  convertObjectToArray,
  removeWhiteSpace,
  removeLeadZeroNumber,
  sumCartTotal,
};
