import React from 'react';
import CSS from './ApplicationMenu.module.scss';

export default function ApplicationMenu({ children }) {
  return <div className={CSS.menu}>{children}</div>;
}
