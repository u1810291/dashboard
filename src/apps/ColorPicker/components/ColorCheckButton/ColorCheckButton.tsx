import React from 'react';
import CSS from './styles.module.css';

export function ColorCheckButton({ color = 'blue', onChange, checked = false }: {
  color: string;
  checked: boolean;
  onChange: (event: React.MouseEvent<HTMLDivElement>) => void;
}) {
  return (
    <div
      className={CSS.pair}
      onClick={onChange}
      onKeyUp={() => {}}
      role="button"
      tabIndex={0}
    >
      <div
        className={CSS.checkButton}
        data-checked={checked}
        data-color={color}
      />
    </div>
  );
}
