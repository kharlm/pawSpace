import firebase from 'firebase';
import { orderBy, groupBy, values } from 'lodash'
import { allowNotifications, sendNotification } from './'
import db from '../config/firebase';
import {getDog} from '../actions/dog'

export const updateEmail = (email) => {
	return {type: 'UPDATE_EMAIL', payload: email}
}

export const updatePassword = (password) => {
	return {type: 'UPDATE_PASSWORD', payload: password}
}

export const updateUsername = (username) => {
	return {type: 'UPDATE_USERNAME', payload: username}
}

export const updatePhoto = (photo) => {
	return {type: 'UPDATE_PHOTO', payload: photo}
}

export const login = () => {
	return async (dispatch, getState) => {
		try {
			const { email, password } = getState().user
			const response = await firebase.auth().signInWithEmailAndPassword(email, password)
			dispatch(getUser(response.user.uid))
			const userQuery = await db.collection('users').doc(response.user.uid).get()
			let user = userQuery.data()
			//dispatch(getDog(user.dogs[0]))
			

			dispatch(allowNotifications())
		} catch (e) {
			console.log("in login");
			alert(e)
		}
	}
}

export const facebookLogin = () => {
	return async (dispatch) => {
		try {
			const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('536462030493600')
			if(type === 'success') {
				// Build Firebase credential with the Facebook access token.
				const credential = await firebase.auth.FacebookAuthProvider.credential(token);
				// Sign in with credential from the Facebook user.
				const response = await firebase.auth().signInWithCredential(credential)
				const user = await db.collection('users').doc(response.uid).get()
				if(!user.exists){
					const user = {
						uid: response.uid,
						email: response.email,
						username: response.displayName,
						photo: response.photoURL,
						token: null,
						followers: [],
						following: []
					}
					db.collection('users').doc(response.uid).set(user)
					dispatch({type: 'LOGIN', payload: user})
				} else {
					dispatch(getUser(response.uid))
				}
			}
		} catch (e) {
			alert(e)
		}
	}
}

export const getUser = (uid, type) => {
	return async (dispatch, getState) => {
		
		try {
			console.log("GET USER 1")
			const userQuery = await db.collection('users').doc(uid).get()
			let user = userQuery.data()
			//let res = JSON.stringify(user);

			///console.log('USER QUERY'+res);

      let posts = []
      const postsQuery = await db.collection('posts').where('uid', '==', uid).get()
      postsQuery.forEach(function(response) {
        posts.push(response.data())
      })
      user.posts = orderBy(posts, 'date','asc')

			if(type === 'LOGIN'){
				let res = JSON.stringify(user.dogs[0])
				console.log("fix"+res)
				
				dispatch({type: 'LOGIN', payload: user })
				dispatch(getDog(user.dogs[0],'DOGLOGIN'))
				
			
			} else {
				console.log("in get profile")
				//console.log(user)
				
				dispatch({type: 'GET_PROFILE', payload: user })
				console.log(user.dogs[0])
				dispatch(getDog(user.dogs[0],'GET_DOGPROFILE'))
			}
		} catch (e) {
			console.log("in get user");
			alert(e)
		}
	}
}

export const updateUser = () => {
  return async ( dispatch, getState )  => {
    const { uid, username, photo } = getState().user
    try {
      db.collection('users').doc(uid).update({
        username: username,
        photo: photo
      })
    } catch(e) {
			console.log("in update user");
      alert(e)
    }
  }
}

export const signup = () => {
	return async (dispatch, getState) => {
		try {
			const { email, password, username} = getState().user
			const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
			if(response.user.uid) {
				const user = {
					uid: response.user.uid,
					email: email,
					username: username,
					photo: '',
					token: null,
					followers: [],
					following: [],
					dogs:[]
				}
				db.collection('users').doc(response.user.uid).set(user)
				dispatch({type: 'LOGIN', payload: user})
			}
		} catch (e) {
			console.log("in signup");
			alert(e)
		}
	}
}

export const followUser = (user) => {
  return async ( dispatch, getState ) => {
    const { uid, photo, username } = getState().user
    try {
			db.collection('users').doc(user.uid).update({
				followers: firebase.firestore.FieldValue.arrayUnion(uid)
			})
			db.collection('users').doc(uid).update({
				following: firebase.firestore.FieldValue.arrayUnion(user.uid)
			})
      db.collection('activity').doc().set({
        followerId: uid,
        followerPhoto: photo,
        followerName: username,
        uid: user.uid,
        photo: user.photo,
        username: user.username,
        date: new Date().getTime(),
        type: 'FOLLOWER',
      })
      dispatch(sendNotification(user.uid, 'Started Following You'))
			dispatch(getUser(user.uid))
    } catch(e) {
      console.error(e)
    }
  }
}

export const unfollowUser = (user) => {
  return async ( dispatch, getState ) => {
    const { uid, photo, username } = getState().user
    try {
			db.collection('users').doc(user.uid).update({
				followers: firebase.firestore.FieldValue.arrayRemove(uid)
			})
			db.collection('users').doc(uid).update({
				following: firebase.firestore.FieldValue.arrayRemove(user.uid)
			})
			dispatch(getUser(user.uid))
    } catch(e) {
      console.error(e)
    }
  }
}