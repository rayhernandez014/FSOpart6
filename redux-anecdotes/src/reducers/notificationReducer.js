import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },    
    removeNotification(state) {
      return null
    }
  }
})


export const { setNotification, removeNotification } = notificationSlice.actions

export const callNotification = (message, time) => {
  return dispatch => {
    const timeout = time*1000
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeout)
  }
}

export default notificationSlice.reducer