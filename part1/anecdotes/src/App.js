import { useState } from 'react'

const RandomAnecdoteButton = (props) => {
  const handleClick = () => {
    // Generate a random integer between 0 and n length
    const randomNum = Math.floor(Math.random() * props.anecdotes.length)
    props.setter(randomNum)
  }
  return (
    <button onClick={handleClick}>{props.text}</button>
  )
}

const VoteAnecdoteButton = (props) => {
  // Create a copy of votes array
  const newVotes = [...props.votes]
  console.log(props.votes)
  const handleVote = () => {
    // Increase a vote by 1 when vote button clicked
    newVotes[props.selected] += 1
    props.setter(newVotes)  
  }
  return (
    <>
    <button onClick={handleVote}>{props.text}</button>
    </>
  )
}

const Layout = (props) => {
  // Create an array of n lenght and fill it with 0 as values
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0))
  // Get index of most voted
  const mostVoted = votes.indexOf(Math.max(...votes))
  return (
    <>
      <VoteAnecdoteButton selected={props.selected} votes={votes} setter={setVotes} text={'vote'}/>
      <RandomAnecdoteButton selected={props.selected} anecdotes={props.anecdotes} setter={props.selectedSetter} text={'next anecdote'}/>
      <ShowVotes votes={votes[props.selected]} />
      <MostVotedAnecdote votes={votes} anecdotes={props.anecdotes} most={mostVoted} />
    </>
  )
}

const ShowVotes = (props) => {
  return (
    <div>
      has {props.votes} votes
    </div>
  )
}

const MostVotedAnecdote = (props) => {
  return (
    <>
      <Header text={'Anecdote with most votes'} />
      <>{props.anecdotes[props.most]}</>
      <ShowVotes votes={props.votes[props.most]} />
    </>  
  )
}

const Header = (props) => {
  return(
    <h1>{props.text}</h1>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  return (
    <>
      
      <div>
        <Header text={'Anecdote of the day'} />
        <div>{anecdotes[selected]}</div>
        <Layout anecdotes={anecdotes} selected={selected} selectedSetter={setSelected} />
      </div>
    </>
  )
}

export default App