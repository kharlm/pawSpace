import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithCredential,
  FacebookAuthProvider,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { orderBy } from 'lodash'
import { allowNotifications, sendNotification } from './'
import { auth, db } from '../config/firebase';
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

export const signupError = () => {
	return {type:'SIGNUP_ERROR'}
}

export const login = () => {
	return async (dispatch, getState) => {
		try {
			const { email, password } = getState().user
			const response = await signInWithEmailAndPassword(auth, email, password)
			console.log("user id: "+response.user.uid)
			dispatch(getUser(response.user.uid))
		} catch (e) {
			alert(e)
		}
	}
}

export const facebookLogin = () => {
	return async (dispatch) => {
		try {
			// TODO(Phase 3): this relied on the long-removed `Expo.Facebook` API even
			// before this migration and isn't wired to any button in the UI.
			const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('536462030493600')
			if(type === 'success') {
				const credential = FacebookAuthProvider.credential(token);
				const response = await signInWithCredential(auth, credential)
				const userSnap = await getDoc(doc(db, 'users', response.uid))
				if(!userSnap.exists()){
					const user = {
						uid: response.uid,
						email: response.email,
						username: response.displayName,
						photo: response.photoURL,
						token: null,
						followers: [],
						following: []
					}
					setDoc(doc(db, 'users', response.uid), user)
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
			const userSnap = await getDoc(doc(db, 'users', uid))
			let user = userSnap.data()

      let posts = []
      const postsQuery = await getDocs(query(collection(db, 'posts'), where('uid', '==', uid)))
      postsQuery.forEach(function(response) {
        posts.push(response.data())
      })
      user.posts = orderBy(posts, 'date','asc')

			if(type === 'LOGIN'){
				dispatch({type: 'LOGIN', payload: user })
				if(user.dogs.length>0)
				dispatch(getDog(user.dogs[0],'DOGLOGIN'))
			}
			else {
				dispatch({type: 'GET_PROFILE', payload: user })
				if(user.dogs.length>0)
				dispatch(getDog(user.dogs[0],'GET_DOGPROFILE'))
			}

	}	catch (e) {
			alert(e)
		}
	}
}

export const updateUser = () => {
  return async ( dispatch, getState )  => {
    const { uid, photo } = getState().user
    try {
      updateDoc(doc(db, 'users', uid), { photo: photo })
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

			const response = await createUserWithEmailAndPassword(auth, email, password)
			dispatch({type:'NOSIGNUP_ERROR'})
			global.signupError = false
			if(response.user.uid) {

				const user = {
					uid: response.user.uid,
					email: email,
					dogs:[],
					token: null
				}
				setDoc(doc(db, 'users', response.user.uid), user)
				dispatch({type:'NO_GUEST'})
				dispatch({type: 'LOGIN', payload: user})
			}
		} catch (e) {
			console.log("in sign up error")
			dispatch({type:'SIGNUP_ERROR'})
			alert(e)
		}
	}
}

export const followUser = (dog) => {
  return async ( dispatch, getState ) => {
    const { dogId, photo, dogTag, uid} = getState().dog
    try {
			updateDoc(doc(db, 'dogs', dog.dogId), {
				followers: arrayUnion(dogId)
			})
			updateDoc(doc(db, 'dogs', dogId), {
				following: arrayUnion(dog.dogId)
			})
      setDoc(doc(collection(db, 'activity')), {
        followerId: dogId,
        followerPhoto: photo,
        followerName: dogTag,
        dogId: dog.dogId,
        photo: dog.photo,
        dogTag: dog.dogTag,
        date: new Date().getTime(),
        type: 'FOLLOWER',
	  })
	  let res = JSON.stringify(dog.uid)
      console.log("dog notification: "+res)
      dispatch(sendNotification(dog.uid, 'Started Following You'))
	 dispatch(getDog(dog.dogId))
    } catch(e) {
      console.error(e)
    }
  }
}

export const unfollowUser = (dog) => {
  return async ( dispatch, getState ) => {
    const { dogId, photo, dogTag } = getState().dog
    try {
			updateDoc(doc(db, 'dogs', dog.dogId), {
				followers: arrayRemove(dogId)
			})
			updateDoc(doc(db, 'dogs', dogId), {
				following: arrayRemove(dog.dogId)
			})
			dispatch(getDog(dog.dogId))
    } catch(e) {
      console.error(e)
    }
  }
}
