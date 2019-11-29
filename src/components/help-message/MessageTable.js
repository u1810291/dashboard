import classNames from 'classnames';
import React from 'react';
import { mtTable } from './HelpMessage.module.scss';

export function MessageTable({ data = [], className }) {
  return (
    <table className={classNames(mtTable, className)}>
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
