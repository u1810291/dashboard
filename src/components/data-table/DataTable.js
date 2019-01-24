import React from 'react'
import classNames from 'classnames'
import Panel from 'src/components/panel'
import EmptyTableIcon from './empty-table.svg'
import CSS from './DataTable.scss'

function TableWrapper({ inline, children }) {
  if (inline) {
    return <React.Fragment>{children}</React.Fragment>
  } else {
    return (
      <Panel>
        <Panel.Body padded={false}>{children}</Panel.Body>
      </Panel>
    )
  }
}

export default function DataTable({
  columns,
  rows,
  className,
  emptyBodyLabel,
  onRowClick,
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
            {rows.map((element, index) => (
              <tr
                key={index}
                onClick={onRowClick && (() => onRowClick(element))}
                className={onRowClick && CSS.clickable}
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
            {emptyBodyLabel && !rows.length ? (
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
      </div>
    </TableWrapper>
  )
}
