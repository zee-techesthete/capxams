import React from 'react'

export default function TableButton() {
  /**
   * tableButton
   * Function handle button click
   * @return calls onClickEvent function in props
   */
  const handleButtonClick = () => {
    this.props.onClickEvent()
  }

  return <button onClick={() => handleButtonClick()}>Create New</button>
}
