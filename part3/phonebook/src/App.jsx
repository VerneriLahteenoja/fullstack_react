import { useState, useEffect } from 'react'
import personsService from './services/persons'

const FilterForm = (props) => {
  return (
    <div>
      Filter shown with <input
        value={props.filterField}
        onChange={props.handleFilterInput}
      />
    </div>
  )
}

const PersonForm = (props) => {
  const addPerson = (event) => {
    event.preventDefault()

    if (!alreadyExists()) {
      personsService
        .create({name: props.newPerson, number: props.newNumber})
        .then(response => {
          console.log(`created id:${response.id} name:${response.name} number:${response.number}`)
          props.setSuccess(true)
          props.setMsg('Number added successfully')
          setTimeout(() => {
            props.setSuccess(null)
            props.setMsg(null)
          }, 5000)
        })
    } else {
      if (window.confirm((`${props.newPerson} is already added to phonebook, replace the old number with a new one?`))) {
        const findPerson = props.persons.find(p => p.name === props.newPerson)
        const newData = { ...findPerson, number: props.newNumber}
        personsService
          .update(newData.id, newData)
          .then((response) => {
            console.log(`updated id:${response.id} name:${response.name} number:${response.number}`)
            props.setSuccess(true)
            props.setMsg('Number updated successfully')
            setTimeout(() => {
              props.setSuccess(null)
              props.setMsg(null)
            }, 5000)
          }).catch(() => console.log('Error with update'))
      }
    }
    props.setNewPerson('')
    props.setNewNumber('')
  }
  const alreadyExists = () => {
    return (props.persons.some((person) => person.name === props.newPerson))
  }
  return (
    <form onSubmit={addPerson} >
      <div>
        name: <input 
        value={props.newPerson}
        onChange={props.handleNameInput}
        />
      </div>
      <div>
        number: <input
        value={props.newNumber}
        onChange={props.handleNumberInput}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const RenderPersons = (props) => {
  
  const handleDeleteButton = (id) => {
    if (window.confirm(`Delete ${props.persons.find(p => p.id === id).name}?`)) {
      personsService
        .deletePerson(id)
        .then(() => {
          props.setSuccess(true)
          props.setMsg(`Number deleted successfully`)
          setTimeout(() => {
            props.setSuccess(null)
            props.setMsg(null)
          }, 5000)
        })
        .catch(error => console.log(`Error: ${error}`))
    }
  }
  
  const filterPersons = () => {
    if (props.filterField.trim() === '') {
      return props.persons
    }
    return props.persons.filter((person) =>
      person.name.toLowerCase().includes(props.filterField.toLowerCase())
    )
  }
  return (
    filterPersons().map((person) => (
      <div key={person.id}>
        {person.name} {person.number} <button onClick={() => handleDeleteButton(person.id)} type="button">delete</button>
      </div>))
  )
}

const Notification = ({ message, success }) => {
  const isSuccessful = success ? "success" : "error"
  if (message === null) {
    return null
  }
  return (
    <div className={isSuccessful}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterField, setFilter] = useState('')
  const [msg, setMsg] = useState(null)
  const [success, setSuccess] = useState(null)

  useEffect(() => {
    personsService
    .getAll()
    .then(response => {
      setPersons(response)
    })
  }, [persons])
  
  const handleFilterInput = (event) => {
    setFilter(event.target.value)
  }
  const handleNameInput = (event) => {
    setNewPerson(event.target.value)
  }
  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={msg} success={success}/>
        <div>
          <FilterForm 
            filterField={filterField} 
            handleFilterInput={handleFilterInput}
          />
        </div>
      <h2>add a new</h2>
        <div>
          <PersonForm persons={persons} 
            setPersons={setPersons}
            setNewPerson={setNewPerson}
            setNewNumber={setNewNumber}
            setMsg={setMsg}
            setSuccess={setSuccess}
            handleNameInput={handleNameInput}
            handleNumberInput={handleNumberInput}
            newPerson={newPerson} 
            newNumber={newNumber}
          />
        </div>
      <h2>Numbers</h2>
        <div>
          <RenderPersons 
            filterField={filterField} 
            persons={persons}
            setPersons={setPersons}
            setMsg={setMsg}
            setSuccess={setSuccess}
          />
        </div>
    </div>
  )
}

export default App