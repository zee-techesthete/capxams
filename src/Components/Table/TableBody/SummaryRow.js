import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { TableContext } from '../../../Contexts/Components/TableContext'
import { CellComponents } from './TableBodyRow/index'

export default function SummaryRow({ summaryRow }) {
  const context = useContext(TableContext)

  return (
    <tr className='summary-row'>
      {context.multiselect ? <td className='freeze-col col-checkbox' /> : ''}
      {context.columns.map((column, index) => {
        return (
          <td className={column.fixed ? 'freeze-col' : ''} key={column.field} style={{ width: column.minWidth, left: index === 0 && context.multiselect ? '29px' : '0' }}>
            {summaryRow[column.field] !== undefined && summaryRow[column.field] !== null ? React.createElement(CellComponents[column.format], { data: summaryRow, field: column.field }) : '-'}
          </td>
        )
      })}
    </tr>
  )
}

SummaryRow.propTypes = {
  summaryRow: PropTypes.object,
}
