import React from 'react';
import classNames from 'classnames';
import { mtTable } from './HelpMessage.module.scss';

const MessageTable = ({ 
  data,
  className
}) => (
  <table className={classNames(mtTable, className)}>
  <tbody>
    { data.map((row, rIdx) => {
      const trName = `row-${rIdx}`;
      return (
        <tr key={trName} className={trName}>
        { row.map((col, cIdx) => {
          const tdName = `col-${rIdx}${cIdx}`;
          return (
            <td key={tdName} className={tdName}>
              <div>{col}</div>
            </td>
          )}
        )}
        </tr>
      )}
    )}
  </tbody>
  </table>
)

export default MessageTable;