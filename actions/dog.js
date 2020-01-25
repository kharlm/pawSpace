import firebase from 'firebase';
import { orderBy, groupBy, values } from 'lodash'
import { allowNotifications, sendNotification } from './'
import db from '../config/firebase';
import uuid from 'uuid'


export const updateDogname = (dogname) => {
	return {type: 'UPDATE_DOGNAME', payload: dogname}
}

export const updateBreed = (breed) => {
	return {type: 'UPDATE_BREED', payload: breed}
}

export const updateAge = (age) => {
	return {type: 'UPDATE_AGE', payload: age}
}

export const updateGender = (gender) => {
	return {type: 'UPDATE_GENDER', payload: gender}
}

export const updateWeight = (weight) => {
    return {type: 'UPDATE_WEIGHT', payload: weight}
    
}

export const updateDogtag = (dogTag) => {
    return {type: 'UPDATE_DOGTAG', payload: dogTag}
    
}

export const updateBio = (bio) => {
    return {type: 'UPDATE_BIO', payload: bio}
    
}
export const updatePhoto = (photo) => {
	return {type: 'UPDATE_PHOTO', payload: photo}
}



export const dogsignup = () => {
	return async (dispatch, getState) => {
		const { uid} = getState().user
			
		try {
			const id = uuid.v4()	
			db.collection('users').doc(uid).update({
				dogs: firebase.firestore.FieldValue.arrayUnion(id)
			})
			

			/*const {dogname,breed,age,gender,weight,dogtag,story } = getState().dog
			const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
			if(response.user.uid) {
			const { email, password, username, bio } = getState().user
			const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
			*/
		
			const {dogname,breed,age,gender,weight,dogTag,bio,photo} = getState().dog
		
			if(id){
				const dog = {
					dogname: dogname,
					breed: breed,
					age: age,
					gender: gender,
					weight: weight,
					dogTag: dogTag,
					bio: bio,
					dogId: id,
					followers: [],
					following: [],
					photo: photo,
					uid: uid
				
			}
				
				
				db.collection('dogs').doc(id).set(dog)
				//db.collection('users').doc(response.user.uid).set(user)
				dispatch({type: 'DOGLOGIN', payload: dog})
		}

			
		} catch (e) {
			alert(e)
		}
		
	}//t
	}

	export const doglogin = () => {
		
		return async (dispatch, getState) => {
			try {
				const { dogId} = getState().dog
				const dogQuery = await db.collection('dogs').doc(dogId).get()
				let dog = dogQuery.data()
	
				dispatch(getDog(dog.dogId))
			} catch (e) {

				alert(e)
			}
		}
	}
	

	export const getDog = (dogId, type) => {
		return async (dispatch, getState) => {
			try {
				
				const dogQuery = await db.collection('dogs').doc(dogId).get()
				let dog = dogQuery.data()
				    
				let res = JSON.stringify(dog);
				
				

      
				//console.log("DOG TRY"+res)
	
		 let posts = []
		  const postsQuery = await db.collection('posts').where('dogId', '==', dogId).get()
		  postsQuery.forEach(function(response) {
			posts.push(response.data())
		  })
		  
		 dog.posts = orderBy(posts, 'date','desc')
		
	
				if(type === 'DOGLOGIN'){
					
					
					dispatch({type: 'DOGLOGIN', payload: dog })
				} else {
					
					
					dispatch({type: 'GET_DOGPROFILE', payload: dog })
				}
				
			} catch (e) {
				alert(e)
			}
		}
	}
	export const updateDog = () => {
		return async ( dispatch, getState )  => {
		  const {dogname,breed,age,gender,weight,dogTag,bio,dogId,photo } = getState().dog
		  try {
				//const {dog} = getState()
			db.collection('dogs').doc(dogId).update({
				name: dogname,
				breed: breed,
				age: age,
				gender: gender,
				weight: weight,
				dogTag: dogTag,
				bio: bio,
				dogId: dogId,
				followers: [],
				following: [],
				photo: photo
				
			})
		  } catch(e) {
				console.log("inside update dog error")
			alert(e)
		  }
		}
	  }