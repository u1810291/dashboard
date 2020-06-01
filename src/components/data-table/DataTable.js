import clsx from 'clsx';
import Card from 'components/card';
import React from 'react';
import { useStyles } from './DataTable.styles';

function TableWrapper({ inline, children }) {
  if (inline) {
    return <>{children}</>;
  } else {
    return <Card padding={0}>{children}</Card>;
  }
}

export default function DataTable({
  columns,
  rows = [],
  disabledRows = [],
  onRowClick,
  inline = false,
}) {
  const classes = useStyles();
  const sizeFraction = 100 / columns.map(({ size = 1 }) => size).reduce((sum, val) => sum + val);

  return (
    <TableWrapper inline={inline}>
      <div className={classes.wrapper}>
        <table
          className={clsx(classes.table, {
            [classes.borderAround]: inline,
          })}
        >
          <colgroup>
            {columns.map(({ size = 1 }, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <col key={index} style={{ width: `${sizeFraction * size}%` }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {columns.map(({ label }, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <th scope="col" key={index}>
                  <strong>{label}</strong>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((element, index) => (
              <tr
                key={index} // eslint-disable-line react/no-array-index-key
                onClick={
                  !disabledRows.includes(element) && onRowClick
                    ? () => onRowClick(element)
                    : undefined
                }
                className={
                  !disabledRows.includes(element) && onRowClick
                    ? classes.clickable
                    : ''
                }
              >
                {columns.map(
                  (column, columnIndex) => (
                    <td
                      className={clsx(
                        column.className,
                        `mgi-data-table_align-${column.align || 'left'}`,
                      )}
                      key={columnIndex} // eslint-disable-line react/no-array-index-key
                    >
                      {column.content(element)}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TableWrapper>
  );
}
