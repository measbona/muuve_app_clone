import {reduce} from 'lodash';

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

export default {convertObjectToArray};
