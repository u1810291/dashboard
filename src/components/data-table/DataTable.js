import React from 'react'
import classNames from 'classnames'
import Card from 'src/components/card'
import EmptyTableIcon from './empty-table.svg'
import Spinner from 'src/components/spinner'
import CSS from './DataTable.scss'

function TableWrapper({ inline, children }) {
  if (inline) {
    return <React.Fragment>{children}</React.Fragment>
  } else {
    return <Card padding={0}>{children}</Card>
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
  inline = false
}) {
  const sizeFraction =
    100 / columns.map(({ size = 1 }) => size).reduce((sum, val) => sum + val)

  return (
    <TableWrapper inline={inline}>
      <div className={CSS.wrapper}>
        <table
          className={classNames(CSS.table, className, {
            [CSS.borderAround]: inline
          })}
        >
          <colgroup>
            {columns.map(({ size = 1 }, index) => (
              <col key={index} style={{ width: `${sizeFraction * size}%` }} />
            ))}
          </colgroup>
          <thead>
            <tr>
              {columns.map(({ label }, index) => (
                <th scope="col" key={index}>
                  <strong>{label}</strong>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              rows.map((element, index) => (
                <tr
                  key={index}
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
                    ({ content, className, align = 'left' }, index) => (
                      <td
                        className={classNames(
                          className,
                          `mgi-data-table_align-${align}`
                        )}
                        key={index}
                      >
                        {content(element)}
                      </td>
                    )
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
  )
}
