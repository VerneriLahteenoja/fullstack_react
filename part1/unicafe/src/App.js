import { useState } from "react";

const Heading = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const Buttons = (props) => {
  const addGood = () => props.setters({ ...props.vals, good: props.vals.good+1})
  const addNeutral = () => props.setters({ ...props.vals, neutral: props.vals.neutral+1})
  const addBad = () => props.setters({ ...props.vals, bad: props.vals.bad+1})
  return (
    <div>
      <Button handle={addGood} text={'Good'} />
      <Button handle={addNeutral} text={'Neutral'} />
      <Button handle={addBad} text={'Bad'} />
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handle}>
      {props.text}
    </button>
  )
}

const Statistics = (props) => {
  const goodVal = props.stats.good
  const neutralVal = props.stats.neutral
  const badVal = props.stats.bad
  const values = [goodVal, neutralVal, badVal]
  if (values.some(x => x)) {
    return (
      <table>
        <thead>
          <tr>
            <td>good</td><td>{goodVal}</td>
          </tr>
          <tr>
            <td>neutral</td><td>{neutralVal}</td>
          </tr>
          <tr>
            <td>bad</td><td>{badVal}</td>
          </tr>
          <Total values={values} />
          <Avarage values={values} />
          <Positive values={values} /> 
        </thead>
      </table>
    )
  } else {
    return (
      <div>
        No feedback given
      </div>
    )  
  }
}

const Total = (props) => {
  const total = props.values.reduce(function (add, total) {return add+total}, 0)
  return (
    <tr>
      <td>
        total
      </td>
      <td>
        {total}
      </td>
    </tr>
  )
}

const Avarage = (props) => {
  const total = props.values.reduce(function (add, total) {return add+total}, 0) 
  const goodAvarage = (props.values[0] - props.values[2]) / total
  return (
    <tr>
      <td>
        avarage
      </td>
      <td>
        {goodAvarage.toFixed(1)}
      </td>
    </tr>
  )
}

const Positive = (props) => {
  const total = props.values.reduce(function (add, total) {return add+total}, 0)
  const positive = (props.values[0] / total) * 100
  return (
    <tr>
      <td>
        positive
      </td>
      <td>
        {positive.toFixed(1)} %
      </td>
    </tr>
  )
}

function App() {
  
  const [vals, setVals] = useState({
    good: 0, neutral: 0, bad:0
  })
  
  const stats = {
    'good': vals.good,
    'neutral': vals.neutral,
    'bad': vals.bad
  } 

  return (
    <>
      <Heading text='give feedback' />
      <Buttons vals={vals} setters={setVals} />
      <Heading text='statistics' />
      <Statistics stats={stats} />
    </>
  );
}

export default App;
