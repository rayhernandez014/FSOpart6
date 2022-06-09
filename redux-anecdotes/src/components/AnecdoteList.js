import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { removeNotification, setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {    
    if ( state.filter === '' ) {      
      return state.anecdotes    
    }    
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })
  const ordered_anecdotes = [...anecdotes]

  ordered_anecdotes.sort((item1, item2) => {
    if (item1.votes > item2.votes){
      return -1
    }
    else if (item1.votes < item2.votes){
      return 1
    }
    return 0
  })

  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))

    const anecdoteToVote = anecdotes.find(a => a.id === id)
    dispatch(setNotification(`you voted ${anecdoteToVote.content}`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <>
      {ordered_anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )

}

export default AnecdoteList