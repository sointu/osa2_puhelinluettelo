import React from 'react'

const Filter = (props) => {
    return (
        <>
        Filter shown with: <input
        value={props.search}
        onChange={props.handleSearch}
      />
      </>
    )
}

export default Filter