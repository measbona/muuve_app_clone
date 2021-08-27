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

  forEach(cart, (item) => {
    const itemPrice = item.quantity * parseFloat(item.price);

    total += itemPrice;
  });

  return Number(parseFloat(total).toFixed(2));
};

const countGroupOrderItem = (items) => {
  let total = 0;

  forEach(items, (user) => {
    forEach(user, (item) => {
      total += item.quantity;
    });
  });

  return Number(total);
};

const countParticipantItem = (items) => {
  let total = 0;

  forEach(items, (item) => {
    total += item.quantity;
  });

  return Number(total);
};

export default {
  sumCartTotal,
  removeWhiteSpace,
  countGroupOrderItem,
  convertObjectToArray,
  countParticipantItem,
  removeLeadZeroNumber,
};
