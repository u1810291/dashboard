import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import Card from 'components/card';
import Spinner from 'components/spinner';
import { ReactComponent as EmptyTableIcon } from './empty-table.svg';
import CSS from './DataTable.module.scss';

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
  className,
  emptyBodyLabel,
  onRowClick,
  isLoading,
  inline = false,
}) {
  const sizeFraction = 100 / columns.map(({ size = 1 }) => size).reduce((sum, val) => sum + val);

  return (
    <TableWrapper inline={inline}>
      <div className={CSS.wrapper}>
        <table
          className={classNames(CSS.table, className, {
            [CSS.borderAround]: inline,
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
            {!isLoading
              && rows.map((element, index) => (
                <tr
                  key={index} // eslint-disable-line react/no-array-index-key
                  onClick={
                    !disabledRows.includes(element) && onRowClick
                      ? () => onRowClick(element)
                      : undefined
                  }
                  className={
                    !disabledRows.includes(element) && onRowClick
                      ? CSS.clickable
                      : ''
                  }
                >
                  {columns.map(
                    (column, columnIndex) => (
                      <td
                        className={classNames(
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
            {emptyBodyLabel && !rows.length && !isLoading ? (
              <tr>
                <td colSpan={columns.length}>
                  <div className={CSS.tableEmptyBody}>
                    <EmptyTableIcon />
                    <p>{emptyBodyLabel}</p>
                  </div>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
        {isLoading && (
          <div className={CSS.preloader}>
            <Spinner size="large" />
          </div>
        )}
      </div>
    </TableWrapper>
  );
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({})),
  disabledRows: PropTypes.arrayOf(PropTypes.shape({})),
  emptyBodyLabel: PropTypes.shape({}),
  inline: PropTypes.bool,
  isLoading: PropTypes.bool,
  onRowClick: PropTypes.func,
  rows: PropTypes.arrayOf(PropTypes.shape({})),
};

DataTable.defaultProps = {
  columns: [],
  disabledRows: [],
  emptyBodyLabel: {},
  inline: false,
  isLoading: false,
  onRowClick: () => {},
  rows: [],
};
