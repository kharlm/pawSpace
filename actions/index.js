import uuid from 'uuid';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { storage, db } from '../config/firebase'
import * as Notifications from 'expo-notifications'
import * as ImageManipulator from 'expo-image-manipulator'
const PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send'

export const uploadPhoto = (image) => {
  if(image.type==="video"){

  return async (dispatch) => {
    try {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = () => resolve(xhr.response)
        xhr.responseType = 'blob'
        xhr.open('GET', image.uri, true)
        xhr.send(null)
      });
      const storageRef = ref(storage, uuid.v4())
      await uploadBytes(storageRef, blob)
      const downloadURL = await getDownloadURL(storageRef)

      return downloadURL
    } catch(e) {
      console.error(e)
    }
  }
  }
  else {
    return async (dispatch) => {
      try {
        const resize = await ImageManipulator.manipulateAsync(image.uri, [], { format: 'jpeg', compress: 0.1 })
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest()
          xhr.onload = () => resolve(xhr.response)
          xhr.responseType = 'blob'
          xhr.open('GET', resize.uri, true)
          xhr.send(null)
        });
        const storageRef = ref(storage, uuid.v4())
        await uploadBytes(storageRef, blob)
        const downloadURL = await getDownloadURL(storageRef)

        return downloadURL
      } catch(e) {
        console.error(e)
      }
    }
  }
}



export const allowNotifications = (uid) => {
  return async ( dispatch) => {
    try {
      const permission = await Notifications.requestPermissionsAsync()
      if (permission.status === 'granted') {
        const token = await Notifications.getExpoPushTokenAsync()
        dispatch({ type: 'GET_TOKEN', payload: token })

        updateDoc(doc(db, 'users', uid), { token: token })
      }
    } catch(e) {
      console.error(e)
    }
  }
}

export const sendNotification = (uid, text) => {
  return async (dispatch, getState) => {
    const { username } = getState().user
    const { dogTag} = getState().dog
    const {dog} = getState()

    try {
      const userSnap = await getDoc(doc(db, 'users', uid))

      if(userSnap.data().token){
        fetch(PUSH_ENDPOINT, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: userSnap.data().token,
            title: dogTag,
            body: text,
            data: { data: dog, text: text }
          })
        })
      }
    } catch(e) {
      console.error(e)
    }
  }
}
