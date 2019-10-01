import React from 'react';
import styled from '@emotion/styled';

const Badge = ({
  label,
  color,
  background,
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

export default Badge;
