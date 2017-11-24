import React from 'react';
import { Text } from 'react-native';

const NumberFormat = ({ style={}, number = 0, unitText }) => (
  <Text style={style}>{`${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원`}</Text>
);

export default NumberFormat;