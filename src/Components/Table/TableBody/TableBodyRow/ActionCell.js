import React, { useContext } from 'react'
import { TableContext } from '../../../../Contexts/Components/TableContext'
import PropTypes from 'prop-types'

export function ActionCell({ id }) {
  const context = useContext(TableContext)

  const createIcon = (id, action) => {
    switch (action) {
      case 'download':
        return (
          <a className='capx-data-table__action-btn' data-action={action} data-id={id} href={`${context.downloadAction}/${id}`} key={`run-${id}`}>
            <i className='icon-sm zmdi zmdi-download' />
          </a>
        )
      case 'run':
        return (
          <button className='capx-data-table__action-btn' data-action={action} data-id={id} key={`run-${id}`}>
            <i className='icon-sm zmdi zmdi-play' />
          </button>
        )
      case 'preview':
        return (
          <button className='capx-data-table__action-btn' data-action={action} data-id={id} key={`preview-${id}`}>
            <i className='icon-sm zmdi zmdi-eye' />
          </button>
        )
      case 'edit':
        return (
          <button className='capx-data-table__action-btn' data-action={action} data-id={id} key={`edit-${id}`} onClick={() => context.editAction(id)}>
            <i className='icon-sm zmdi zmdi-edit' />
          </button>
        )
      case 'duplicate':
        return (
          <button className='capx-data-table__action-btn' data-action={action} data-id={id} key={`duplicate-${id}`}>
            <i className='icon-sm zmdi zmdi-copy' />
          </button>
        )
      case 'delete':
        return (
          <button className='capx-data-table__action-btn' data-action={action} data-id={id} key={`delete-${id}`} onClick={() => context.deleteAction(id)}>
            <i className='icon-sm zmdi zmdi-delete' />
          </button>
        )
      default:
        return action
    }
  }

  return <React.Fragment>{context.actions.map(action => createIcon(id, action))}</React.Fragment>
}

ActionCell.propTypes = {
  /**
   * Row ID
   */
  id: PropTypes.number,
}

export default ActionCell
