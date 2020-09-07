import React from 'react'
import PropTypes from 'prop-types'
import PercentageToColor from '../../../../Helpers/PercentageToColor'

const ProgressCell = ({ data, field }) => (
  <React.Fragment>
    {data[field] !== undefined && data[field] !== null ? data[field]?.toFixed(2) + '%' : '0%'}
    <div className='progress' style={{ marginBottom: '-4px' }}>
      <div
        aria-valuemax='100'
        aria-valuemin='0'
        aria-valuenow={data[field]?.toFixed(2)}
        className='progress-bar progress-bar-green'
        role='progressbar'
        style={{ width: `${data[field]?.toFixed(2)}%`, backgroundColor: PercentageToColor(data[field]) }}
      >
        <span className='sr-only' />
      </div>
    </div>
  </React.Fragment>
)

ProgressCell.propTypes = {
  data: PropTypes.object,
  field: PropTypes.string,
}

export default ProgressCell
