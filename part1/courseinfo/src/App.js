
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
      <Part part={props.parts[0].name} excercises={props.parts[0].excercises}/>
      <Part part={props.parts[1].name} excercises={props.parts[1].excercises}/>
      <Part part={props.parts[2].name} excercises={props.parts[2].excercises}/>
    </>
  )
}

const Total = (props) => {
  const sum = props.nums.reduce(function (add, total) {return add+total}, 0)
  return (
    <>
      <p>
        {sum}
      </p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
  {
    name: 'Fundamentals of React',
    excercises: 10
  },
  {
    name: 'Using props to pass data',
    excercises: 7
  },
  {
    name: 'State of a component',
    excercises: 14
  }
  ]}
  const excercises = [course.parts[0].excercises, course.parts[1].excercises, course.parts[2].excercises]

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total nums={excercises}/>
    </div>
  )
}

export default App;
