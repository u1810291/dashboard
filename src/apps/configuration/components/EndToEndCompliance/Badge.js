import React from 'react';
import styled from '@emotion/styled';

const Badge = ({
  label,
  color = '#FFFFFF',
  background = '#FF862E',
}) => {
  const Button = styled.div`
    position: absolute;
    top -8px;
    left: -8px;
    width: 43px;
    height: 16px;
    font-size: 12px;
    font-weight: bold;
    line-height: 1.3;
    text-align: center;
    color: ${color};
    background-color: ${background};
    border: none;
    border-radius: 10px;
    outline: none;
  `;

  return (
    <Button>{label}</Button>
  );
};

export default Badge;
