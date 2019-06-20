const _ = require('lodash');

const sortingArr = [
  'fullName',
  'address',
  'dateOfEmission',
  'expirationDate',
  'dateOfBirth'
];

const itemsArr = {
  fullName: 'frolov vyacheslav',
  address: 'full street',
  expirationDate: '23.12.1976',
  dateOfBirth: '12.12.1221',
  random: 'some fiel'
};

const result = _.transform(itemsArr, (acc, val, key) => {
  // itemsArr[val] && acc.push(_.pick(itemsArr, val))
  if(sortingArr.indexOf(key)) {
    acc[]
  }
}, []);

console.log(result);