import React from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'

export function DateCell({ data, field }) {
  const dateToFormat = data[field]

  return (
    <React.Fragment>
      <Moment format='M/D/YY'>{dateToFormat}</Moment>
    </React.Fragment>
  )
}

DateCell.propTypes = {
  /**
   * Data is a key-value object. Example: { cost: 50, sales: 1456 }
   */
  data: PropTypes.object,
  /**
   * Field is used to mention which value which key we want to access in data
   */
  field: PropTypes.string,
}

export default DateCell
