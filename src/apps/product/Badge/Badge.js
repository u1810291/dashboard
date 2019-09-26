import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Badge = ({
  label,
  color = '#FFFFFF',
  background = '#FF862E',
}) => {
  const Button = styled.button`
    color: ${color};
    background-color: ${background};
    border: none;
    border-radius: 10px;
    line-height: 1.1;
    font-weight: bold;
    position: absolute;
    outline: none;
    top -5px;
    right: -13px;
  `;

  return (
    <Button>{label}</Button>
  );
};

Badge.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
};

export default Badge;