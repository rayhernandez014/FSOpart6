import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState : [],
  reducers: {
    replaceAnecdote(state, action) {
      const receivedAnecdote = action.payload.receivedAnecdote
      const id = action.payload.id
      return state.map(anecdote => anecdote.id !== id ? anecdote : receivedAnecdote)
    },
    setAnecdotes(state, action){
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { appendAnecdote, replaceAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {  
  return async dispatch => {    
    const anecdotes = await anecdoteService.getAll()    
    dispatch(setAnecdotes(anecdotes))  
  }
}

export const createAnecdote = (content) => {  
  return async dispatch => {    
    const newAnecdote = await anecdoteService.createNew(content)    
    dispatch(appendAnecdote(newAnecdote))  
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const state = getState()
    const anecdoteToChange = state.anecdotes.find(a => a.id === id)
    const changedAnecdote = {...anecdoteToChange, votes:anecdoteToChange.votes+1}
    const receivedAnecdote = await anecdoteService.update(id, changedAnecdote)
    dispatch(replaceAnecdote({receivedAnecdote, id}))
  }
}

export default anecdoteSlice.reducer