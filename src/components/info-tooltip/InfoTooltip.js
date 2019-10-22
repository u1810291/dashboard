import React from 'react';
import { FiInfo } from 'react-icons/fi';
import { ArrowTooltip } from './styles';

const IntoTooltip = ({ title }) => (
  <ArrowTooltip title={title}>
    <span>
      {' '}
      <FiInfo />
    </span>
  </ArrowTooltip>
);

export default IntoTooltip;
