import { doc, setDoc, collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { orderBy } from 'lodash'
import uuid from 'uuid'

export const addMessage = (receiver, text) => {
  const id = uuid.v4()
  return (dispatch, getState) => {
    const { dogId, photo, dogTag } = getState().dog
    try {
      const message = {
        members: [dogId,receiver.user?receiver.user.id:receiver.user.dogId].sort(),
        message: text,
        photo: photo,
        dogTag: dogTag,
        receiver: receiver.user,
        dogId: dogId,
        date: new Date().getTime(),
        id: id
      }
      setDoc(doc(collection(db, 'messages')), message)
      dispatch(getMessages(receiver.user?receiver.user.id:receiver.user.dogId))
    } catch(e) {
      console.error(e)
    }
  }
}

export const getMessages = (receiverId) => {
  return async (dispatch, getState) => {
    const { dogId } = getState().dog
    let messages = []
    let uniqueMessages = []

    try {

      onSnapshot(query(collection(db, 'messages'), where('members', 'array-contains', dogId)), (querySnapshot) => {
      querySnapshot.forEach((response) => {
        let message = response.data()

          messages.push(message);

          // This checks for the ids of the messages and creates a new array using object type set
          uniqueMessages = Array.from(new Set(messages.map(a => a.id))).map(id => {
          return messages.find(a => a.id === id)
 })

      })

    uniqueMessages = uniqueMessages.filter(function(uniqueMessages){
      return uniqueMessages.receiver.id == receiverId || uniqueMessages.dogId == receiverId
    });




       dispatch({ type: 'GET_MESSAGES', payload: orderBy(uniqueMessages, 'date','desc')})
    })

    } catch(e) {
      console.error(e)
    }

  }
}
