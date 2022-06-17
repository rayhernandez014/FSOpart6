import { createAnecdote } from '../reducers/anecdoteReducer'
import { callNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.callNotification(`you created '${content}'`, 5)
  }

    return (
      <>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <input name="anecdote" />
          <button type="submit">create</button>
        </form>
      </>
    )
}

const mapDispatchToProps = {  
  createAnecdote,
  callNotification
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps )(AnecdoteForm)
export default ConnectedAnecdoteForm