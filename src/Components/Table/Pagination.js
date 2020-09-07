import React from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'
import SingleSelectBox from '../SelectBoxes/SingleSelectBox'

export default function Pagination({ updateOffset, totalCount, offset, limit, updateLimit }) {
  const onChangePage = direction => {
    switch (direction) {
      case 'first':
        if (offset > 0) updateOffset(0)
        break

      case 'prev':
        if (offset > 0) updateOffset(offset - limit)
        break

      case 'next':
        if (totalCount > offset + limit) updateOffset(offset + limit)
        break

      case 'last':
        if (totalCount > offset + limit) updateOffset(totalCount - limit)
        break

      default:
        break
    }
  }

  return (
    <div className='te-pagination'>
      <SingleSelectBox
        onSelectChange={limit => {
          updateLimit(limit.value)
          updateOffset(0)
        }}
        options={[
          { id: 10, name: 10, value: 10 },
          { id: 25, name: 25, value: 25 },
          { id: 50, name: 50, value: 50 },
          { id: 100, name: 100, value: 100 },
        ]}
        selectedOption={{ id: limit, name: limit, value: limit }}
        style='standard'
      >
        Select...
      </SingleSelectBox>
      <ul className='te-pagination-ul'>
        <li>
          <a className={'te-pagination-link first' + (offset === 0 ? ' disable-pagination-link' : '')} onClick={() => onChangePage('first')}>
            <img alt='first-page' className='first-page-img' src='https://s3-us-west-2.amazonaws.com/capx-reports-frontend/assets/images/first-page.svg' />
            <img alt='first-page-disabled' className='first-page-disabled-img' src='https://s3-us-west-2.amazonaws.com/capx-reports-frontend/assets/images/first-page-disabled.svg' />
          </a>
        </li>

        <li>
          <a className={'te-pagination-link prev' + (offset === 0 ? ' disable-pagination-link' : '')} onClick={() => onChangePage('prev')}>
            <i className='zmdi zmdi-chevron-left' />
          </a>
        </li>

        <li>
          <span>
            {<NumberFormat displayType={'text'} thousandSeparator={true} value={totalCount === 0 ? 0 : offset + 1} />} to{' '}
            {<NumberFormat displayType={'text'} thousandSeparator={true} value={offset + limit <= totalCount ? offset + limit : totalCount} />} of{' '}
            {<NumberFormat displayType={'text'} thousandSeparator={true} value={totalCount} />}
          </span>
        </li>

        <li>
          <a className={'te-pagination-link next' + (offset + limit >= totalCount ? ' disable-pagination-link' : '')} onClick={() => onChangePage('next')}>
            <i className='zmdi zmdi-chevron-right' />
          </a>
        </li>

        <li>
          <a className={'te-pagination-link last' + (offset + limit >= totalCount ? ' disable-pagination-link' : '')} onClick={() => onChangePage('last')}>
            <img alt='last-page' className='last-page-img' src='https://s3-us-west-2.amazonaws.com/capx-reports-frontend/assets/images/last-page.svg' />
            <img alt='last-page-disabled' className='last-page-disabled-img' src='https://s3-us-west-2.amazonaws.com/capx-reports-frontend/assets/images/last-page-disabled.svg' />
          </a>
        </li>
      </ul>
    </div>
  )
}

Pagination.propTypes = {
  updateOffset: PropTypes.func,
  totalCount: PropTypes.number,
  offset: PropTypes.number,
  limit: PropTypes.number,
  updateLimit: PropTypes.func,
}
