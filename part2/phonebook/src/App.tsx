import { useState } from 'react'

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

  
  const addPerson = (event: any) => {
    event.preventDefault()

    if (!alreadyExists()) {
      setPersons(persons.concat([{name: newPerson, number: newNumber}]))
    } else {
      alert(`${newPerson} is already added to phonebook`)
    }

  }

  const handleNameInput = (event: any) => {
    setNewPerson(event.target.value)
  }

  const handleNumberInput = (event: any) => {
    setNewNumber(event.target.value)
  }

  const handleFilterInput = (event: any) => {
    setFilter(event.target.value)
  }

  const alreadyExists = () => {
    return (persons.map(person => person.name)).includes(newPerson)
  }

  const filterPersons = () => {
    if (filterField.trim() === '') {
      return persons
    }
    return persons.filter(person =>
      person.name.toLowerCase().includes(filterField.toLowerCase())
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          Filter shown with <input
            value={filterField}
            onChange={handleFilterInput}
          />
        </div>
      <h2>add a new</h2>
      <div>
      <form onSubmit={addPerson} >
        <div>
          name: <input 
          value={newPerson}
          onChange={handleNameInput}
          />
        </div>
        <div>
          number: <input
          value={newNumber}
          onChange={handleNumberInput}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      </div>
      <h2>Numbers</h2>
        <div>
        {filterPersons().map((person) => (
          <div key={person.name}>
            {person.name} {person.number}
          </div>))}
        </div>
    </div>
  )

}

export default App