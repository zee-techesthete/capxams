import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import OnClickOutside from '../../../OnClickOutside'
import sweetAlert from '../../../../Helpers/SweetAlerts'
import { TableContext } from '../../../../Contexts/Components/TableContext'

const Status = ({ row, type, status }) => {
  const context = useContext(TableContext)

  const [isOpen, updateOpen] = useState(false)
  const [currentStatus, updateCurrentStatus] = useState(status)

  useEffect(() => {
    updateCurrentStatus(status)
  }, [status])

  /**
   * handleStatusClick
   * if the user clicks the active status, the dropdown closes without change. If the user clicks a status different
   * from the active status, a modal pops confirming the change. On confirmation, make an API call to update
   * status, then close the dropdown and update the status in the table.
   */
  const handleStatusClick = newStatus => {
    if (newStatus !== currentStatus) sweetAlert(type, row.id, row.name, status)
    updateOpen(false)
  }

  return (
    <OnClickOutside config={() => updateOpen(false)}>
      <div className='dropdown table-status-btn-dropdown pull-left'>
        <button
          className={`te-table-status-btn dropdown-toggle ${context.statusKey[currentStatus]} ${context.disableStatus ? 'disabled' : ''}`}
          onClick={e => {
            context.disableStatus ? e.preventDefault() : updateOpen(!isOpen)
          }}
        >
          {context.statusKey[currentStatus] === 'warning' ? (
            <img alt='warning' src='https://staging-multichannel.cpcstrategy.com/assets/images/svg-icons/warning.svg' />
          ) : (
            <i className='status-btn-icon' />
          )}
        </button>
        <ul className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
          <li className='te-item-action-btn'>
            <a onClick={() => handleStatusClick('enable')}>
              <i className='fa fa-circle te-enable-icon' /> Enable
            </a>
          </li>
          <li className='te-item-action-btn'>
            <a onClick={() => handleStatusClick('pause')}>
              <i className='te-pause-icon' /> Pause
            </a>
          </li>
        </ul>
      </div>
    </OnClickOutside>
  )
}

Status.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
  type: PropTypes.string,
  status: PropTypes.bool,
}

export default Status
