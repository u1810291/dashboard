import clsx from 'clsx';
import React from 'react';
import { useStyles } from './MessageTable.styles';

export function MessageTable({ data = [], className }) {
  const classes = useStyles();

  return (
    <table className={clsx(classes.mtTable, className)}>
      <tbody>
        {data.map((row, rIdx) => {
          const trName = `row-${rIdx}`;
          return (
            <tr key={trName} className={trName}>
              {row.map((col, cIdx) => {
                const tdName = `col-${rIdx}${cIdx}`;
                return (
                  <td key={tdName} className={tdName}>
                    <div>{col}</div>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
