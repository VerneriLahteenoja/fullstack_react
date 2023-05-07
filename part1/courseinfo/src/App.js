
const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
} 

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.excercises}
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.part[0]} excercises={props.excercises[0]}/>
      <Part part={props.part[1]} excercises={props.excercises[1]}/>
      <Part part={props.part[2]} excercises={props.excercises[2]}/>
    </>
  )
}

const Total = (props) => {
  const sum = props.nums.reduce(function (add, total) {return add+total}, 0)
  console.log(sum)
  return (
    <>
      <p>
        {sum}
      </p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content part={[part1, part2, part3]} excercises={[exercises1, exercises2, exercises3]}/>
      <Total nums={[exercises1, exercises2, exercises3]}/>
    </div>
  )
}

export default App;
