import uuid from 'uuid';
import firebase from 'firebase'
import db from '../config/firebase'
import {Notifications } from 'expo';
import * as Permissions from 'expo-permissions'
import * as ImageManipulator from 'expo-image-manipulator'
const PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send'

export const uploadPhoto = (image) => {
  return async (dispatch) => {
    try {
      console.log("in upload photo")
      const resize = await ImageManipulator.manipulateAsync(image.uri, [], { format: 'jpeg', compress: 0.1 })
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = () => resolve(xhr.response)
        xhr.responseType = 'blob'
        xhr.open('GET', resize.uri, true)
        xhr.send(null)
      });
      const uploadTask = await firebase.storage().ref().child(uuid.v4()).put(blob)
      const downloadURL = await uploadTask.ref.getDownloadURL()
      return downloadURL
    } catch(e) {
      console.log("in upload photo error")
      console.error(e)
    }
  }
}

export const allowNotifications = (uid) => {
  console.log("in allow notifications ")
  return async ( dispatch) => {
    console.log("in allow notifications ")
    console.log("uid: "+uid)
    //const { uid } = getState().user
    try {
      console.log("in try")
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      if (permission.status === 'granted') {
        console.log("permission granted")
        const token = await Notifications.getExpoPushTokenAsync()
        dispatch({ type: 'GET_TOKEN', payload: token })
        let res = JSON.stringify(token)
        console.log("token "+token)
      
       
        db.collection('users').doc(uid).update({ token: token })
        console.log("uid"+ uid)      
      }
    } catch(e) {
      console.error(e)
    }
  }
}

export const sendNotification = (dogId, text) => {
  return async (dispatch, getState) => {
    const { username } = getState().user
    const { dogTag,uid } = getState().dog
    try {
     
      const dog = await db.collection('dogs').doc(dogId).get()
    
      const user = await db.collection('users').doc(uid).get()
     
      if(user.data().token){
        fetch(PUSH_ENDPOINT, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: user.data().token,
            title: dogTag,
            body: text,
          })
        })
      }
    } catch(e) {
      console.error(e)
    }
  }
}