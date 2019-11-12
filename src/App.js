import React, { useState, useEffect } from 'react'
//import axios from 'axios'
import numberService from './services/Numbers'
import Personform from './components/Personform'
import Filter from './components/Filter'
import Persons from './components/Persons'
import Notification from './components/Notification'
import NotificationError from './components/NotificationError'


const App = () => {
  const [persons, setPersons] = useState([])
  const [personsSearched, setPersonsSearched] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    numberService
      .getAll()
      .then(initialPersons =>
        setPersons(initialPersons))
  }, [])

  let names = persons.map(a => ((a.name).toLowerCase()))
  //console.log(names)

  let names2 = persons.map(a => (a.name))
  let found = names2.includes(newName)

  //console.log(found)
  

  const addName = (event) => {
    event.preventDefault()
    let bool = false
    if (found) {
      bool = window.confirm(`${newName} is already added in the phonebook, do you want to change the number?`)
      console.log('heippa', bool)
      if (bool) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = { ...person, number: newNumber }

        numberService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            console.log(returnedPerson)
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
            setInfoMessage(
              `${newName}'s number was changed to ${newNumber}.`
            )
            setTimeout(() => {
              setInfoMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage(
              `the person '${person.name}' was already deleted from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }

    } else {
      
      const nameObject = {
        name: newName,
        number: newNumber
      }
      numberService
        .create(nameObject)
        .then(returnedPerson => {
          console.log(returnedPerson)
          setPersons(persons.concat(returnedPerson))
          setInfoMessage(
            `${newName} was added.`
          )
          setTimeout(() => {
            setInfoMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response)
          }
        })
    }
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
    //console.log(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    let filteredNames = names.filter(element => element.includes((event.target.value).toLowerCase()))
   // console.log(filteredNames)
    setPersonsSearched(persons.filter((a) => filteredNames.includes((a.name).toLowerCase())))
    setSearch(event.target.value)
  }

  const deleteP = id => {
    const person = persons.find(n => n.id === id)
    console.log(person)
    let result = window.confirm(`Delete ${person.name}?`)
    console.log(result)
    if (result) {
      numberService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.map(person => person))
          setPersonsSearched(personsSearched.map(person => person))
          setInfoMessage(
            `${person.name} was removed.`
          )
          setTimeout(() => {
            setInfoMessage(null)
          }, 5000)
        })
        .catch(error => {
          //alert(`the person '${person.name}' was already deleted from server`)
          setErrorMessage(
            `the person '${person.name}' was already deleted from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const rows = () => {
   // console.log(personsSearched)
    return personsSearched.map(person =>
      <p key={person.id}>
        {person.name} {person.number}
        <button onClick={() => deleteP(person.id)}>Delete</button>
      </p>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={infoMessage}
      />
      <NotificationError
        message={errorMessage}
      />

      <Filter
        search={search}
        handleSearch={handleSearch}
      />

      <Personform
        addName={addName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons
        rows={rows}
      />
    </div>
  )

}

export default App
