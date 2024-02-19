const Course = (props) => {
    const { courses } = props
  
    const Header = (props) => {
      return (
        <div>
          <h1>{props.name}</h1>
        </div>
      )
    }
    const Content = (props) => {
      return (
        <div>
          <Part parts={props.parts} />
        </div>
      )
    }
    const Part = (props) => {
      return (
        <div>
          {props.parts.map(part => <div key={part.id}>{part.name} {part.exercises}</div>)}
        </div>
        
      )
    }
    const Total = (props) => {
      return (
          <p style={{ fontWeight: 'bold'}}>
            {props.parts.reduce((total, part) => {return total+part.exercises}, 0)}
          </p>
      )
    }
    
    return (
      <div>
        {courses.map((course) => 
          <div key={course.id}>
            {<Header name={course.name}/>} 
            {<Content parts={course.parts} />} 
            {<Total parts={course.parts}/>}
          </div>)}
      </div>
    )
}

export default Course