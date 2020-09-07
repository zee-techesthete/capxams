import React from 'react'

const CustomIcon = ({ type }) => {
  const CustomType = () => {
    if (type === 'o-and-o') {
      return (
        <React.Fragment>
          <span className='custom-type-icon'>
            <span className='cell-tooltip'>This LineItem is an O&O and cannot be edited at this time.</span>o
          </span>
        </React.Fragment>
      )
    } else {
      return <React.Fragment />
    }
  }

  return CustomType()
}

export default CustomIcon
