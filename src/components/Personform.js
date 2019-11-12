import React from 'react'

const Person = (props) => {
 return (
     <>
    <h2>Add a new person</h2>
    <form onSubmit={props.addName}>
      <div>
        name: <input required
          value={props.newName}
          onChange={props.handleNameChange}
        />
      </div>
      <div>
        number: <input required
          value={props.newNumber}
          onChange={props.handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    </>
 )
}

export default Person