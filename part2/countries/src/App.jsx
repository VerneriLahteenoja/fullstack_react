import { useState, useEffect } from 'react'
import axios from 'axios'

const RenderCountries = ({ countries }) => {
  console.log(countries.map(country => country.name.common))
  return (
    <div>
      {countries.map(country => <div key={country.name.common}>{country.name.common}</div>)}
    </div>
  )
}

function App() {
  const [count, setCount] = useState(0)
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
    .get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then(result => {
      setCountries(result.data)
    })
  }, [])

  return (
    <>
      <RenderCountries countries={countries} />
    </>
  )
}

export default App
