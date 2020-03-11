import React from 'react';
import { FiInfo, FiHelpCircle } from 'react-icons/fi';
import { ArrowTooltip } from './styles';

const IntoTooltip = ({ title, variant = 'info' }) => (
  <ArrowTooltip title={title}>
    <span>
      {(variant === 'info') && <FiInfo />}
      {(variant === 'help') && <FiHelpCircle />}
    </span>
  </ArrowTooltip>
);

export default IntoTooltip;
