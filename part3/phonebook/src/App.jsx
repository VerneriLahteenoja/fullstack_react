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
          props.setPersons(props.persons.concat(response))
          props.setNewPerson('')
          props.setNewNumber('')
        })
      console.log(props.newPerson, props.newNumber)

    } else {
      alert(`${props.newPerson} is already added to phonebook`)
    }
  }
  const alreadyExists = () => {
    return (props.persons.map((person) => person.name === props.newPerson))
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
          props.setPersons(props.persons.filter(person => person.id !== id))
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

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterField, setFilter] = useState('')

  useEffect(() => {
    personsService
    .getAll()
    .then(response => {
      setPersons(response)
    })
  }, [])
  
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
          />
        </div>
    </div>
  )
}

export default App