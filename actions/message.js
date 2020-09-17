import db from '../config/firebase';
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
      db.collection('messages').doc().set(message)
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

      db.collection('messages').where('members', 'array-contains', dogId).onSnapshot((querySnapshot) => {
      querySnapshot.forEach((response) => {
        let message = response.data()
         
          messages.push(message);  
         
          // This checks for the ids of the messages and creates a new array using object type set
          uniqueMessages = Array.from(new Set(messages.map(a => a.id))).map(id => {
          return messages.find(a => a.id === id)
 })
        
      })

      //const newArr = arr.filter(obj => obj.culture.find(o => o.value === selectedValue));
  //console.log(newArr)
     // console.log(_.filter(data, { state: 'New York' }));
   
      
      //console.log("receiverID: "+uniqueMessages[0].receiver.id)
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