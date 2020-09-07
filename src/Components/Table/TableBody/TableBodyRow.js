import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { TableContext } from '../../../Contexts/Components/TableContext'
import { CellComponents } from './TableBodyRow/index'
import CheckboxCell from './TableBodyRow/CheckboxCell'
import ActionCell from './TableBodyRow/ActionCell'
import Status from './TableBodyRow/Status'
import CustomIcon from './TableBodyRow/CustomIcon'

export default function TableBodyRow(props) {
  const { row } = props
  const context = useContext(TableContext)
  const STATUS_FIELD = context.statusField || null
  /**
   * multiselect
   * Function to build checkbox input column
   * @return {object}
   */
  const multiselect = () => {
    if (context.multiselect) {
      if (row.selectable) {
        return (
          <td className='col-checkbox freeze-col'>
            <CheckboxCell id={row.id} {...props} />
          </td>
        )
      } else {
        return <td className='col-checkbox freeze-col'></td>
      }
    }
  }

  /**
   * actionCell
   * Function to build action cell if actions exist
   * @return {object}
   */
  const actionCell = () => {
    if (context.actions !== undefined && context.actions.length > 0) {
      if (row.id !== undefined) {
        return (
          <td>
            <ActionCell id={row.id} />
          </td>
        )
      } else {
        return <td></td>
      }
    }
  }

  return (
    <React.Fragment>
      <tr id={row.id}>
        {multiselect()}
        {context.columns.map((column, index) => {
          return (
            <td
              className={(context.statusKey !== undefined && column.field === 'name' ? 'te-table-status-col' : '') + (column.fixed ? ' freeze-col' : '')}
              key={index}
              style={{
                minWidth: column.minWidth,
                width: column.fixed ? column.minWidth : 'auto',
                left: index === 0 && context.multiselect ? '29px' : '0',
                paddingRight: column.field === 'name' && row['oo'] !== undefined && row['oo'] === true ? '26px' : '8px',
              }}
            >
              {/*{column.fixed ? <React.Fragment><div className="hide-background"></div></React.Fragment> : null}*/}
              {context.statusKey !== undefined && column.field === 'name' ? <Status row={row} status={row[STATUS_FIELD]} /> : ''}
              {React.createElement(CellComponents[column.format], { data: row, field: column.field, column: column })}
              {column.field === 'name' && row['oo'] !== undefined && row['oo'] === true ? <CustomIcon type='o-and-o' /> : ''}
            </td>
          )
        })}
        {actionCell()}
      </tr>
    </React.Fragment>
  )
}

TableBodyRow.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string,
    oo: PropTypes.bool,
    selectable: PropTypes.bool,
  }),
}
