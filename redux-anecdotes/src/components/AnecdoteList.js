import { useSelector, useDispatch } from 'react-redux'
import { votefor } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
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
    dispatch(votefor(id))
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