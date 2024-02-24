import { useState } from 'react'

const FilterForm = (props: any) => {
  return (
    <div>
      Filter shown with <input
        value={props.filterField}
        onChange={props.handleFilterInput}
      />
    </div>
  )
}

const PersonForm = (props: any) => {
  const addPerson = (event: any) => {
    event.preventDefault()

    if (!alreadyExists()) {
      props.setPersons(props.persons.concat([{name: props.newPerson, number: props.newNumber}]))
    } else {
      alert(`${props.newPerson} is already added to phonebook`)
    }
  }
  const alreadyExists = () => {
    return (props.persons.map((person: {name: string; number: string}) => person.name)).includes(props.newPerson)
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

const RenderPersons = (props: any) => {
  const filterPersons = () => {
    if (props.filterField.trim() === '') {
      return props.persons
    }
    return props.persons.filter((person: {name: string; number: string}) =>
      person.name.toLowerCase().includes(props.filterField.toLowerCase())
    )
  }
  return (
    filterPersons().map((person: {name: string; number: string}) => (
      <div key={person.name}>
        {person.name} {person.number}
      </div>))
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterField, setFilter] = useState('')

  const handleFilterInput = (event: any) => {
    setFilter(event.target.value)
  }
  const handleNameInput = (event: any) => {
    setNewPerson(event.target.value)
  }
  const handleNumberInput = (event: any) => {
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
          />
        </div>
    </div>
  )
}

export default App