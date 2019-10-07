import React from 'react';
import styled from '@emotion/styled';

const Badge = ({
  label,
  color = '#FFFFFF',
  background = '#FF862E',
}) => {
  const Button = styled.div`
    position: absolute;
    top -5px;
    right: -13px;
    width: 43px;
    height: 15px;
    font-size: 12px;
    font-weight: bold;
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
