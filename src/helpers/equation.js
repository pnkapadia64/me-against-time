import _keys from 'lodash/keys';
import { MAX_NUM, MIN_NUM, OPERATORS } from '../constants';

const getRandomNumber = (min = MIN_NUM, max = MAX_NUM) => {
  return parseInt(Math.random() * (max - min + 1) + min, 10);
};

const getRandomOperator = () => {
  const operators = _keys(OPERATORS),
    operatorIndex = getRandomNumber(0, operators.length - 1);
  return OPERATORS[operators[operatorIndex]];
};

const getRandomResult = ([no1, no2], operation) => {
  const result = operation.operate(no1, no2),
    isRandomResultCorrect = getRandomNumber(0, 1);

  if (isRandomResultCorrect) {
    return result;
  }
  return result + getRandomNumber(-5, +5);
};

export default class Equation {
  constructor() {
    this.operator = getRandomOperator();
    this.nos = [getRandomNumber(), getRandomNumber()];
    this.answer = getRandomResult(this.nos, this.operator);
  }

  isCorrect() {
    return this.operator.operate(this.nos[0], this.nos[1]) === this.answer;
  }
}
