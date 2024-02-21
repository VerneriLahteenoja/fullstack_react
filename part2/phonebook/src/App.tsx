import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event: any) => {
    event.preventDefault()

    if (!alreadyExists()) {
      setPersons(persons.concat([{name: newName}]))
    } else {
      alert(`${newName} is already added to phonebook`)
    }

  }

  const handleInputChange = (event: any) => {
    setNewName(event.target.value)
  }

  const alreadyExists = () => {
    return (persons.map(person => person.name)).includes(newName)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson} >
        <div>
          name: <input 
          value={newName}
          onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

    </div>
  )

}

export default App