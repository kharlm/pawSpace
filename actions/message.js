import db from '../config/firebase';
import { orderBy } from 'lodash'

export const addMessage = (id, text) => {
  return (dispatch, getState) => {
    const { dogId, photo, dogTag } = getState().dog
    try {
      const message = {
        members: [id, dogId].sort(),
        message: text,
        photo: photo,
        dogTag: dogTag,
        dogId: dogId,
        date: new Date().getTime(),
      }
      db.collection('messages').doc().set(message)
      dispatch(getMessages())
    } catch(e) {
      console.error(e)
    }
  }
}

export const getMessages = () => {
  return async (dispatch, getState) => {
    const { dogId } = getState().dog
    let messages = []
    try {
      const query = await db.collection('messages').where('members', 'array-contains', dogId).get()
      query.forEach((response) => {
        let message = response.data()
        messages.push(message)
      })
      dispatch({ type: 'GET_MESSAGES', payload: orderBy(messages, 'date','desc')})
    } catch(e) {
      console.error(e)
    }
  }
}