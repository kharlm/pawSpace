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

export const updateDogtag = (dogtag) => {
    return {type: 'UPDATE_DOGTAG', payload: dogtag}
    
}

export const updateStory = (story) => {
    return {type: 'UPDATE_STORY', payload: story}
    
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
		
			const {dogname,breed,age,gender,weight,dogtag,story } = getState().dog
		
			
				const dog = {
					name: dogname,
					breed: breed,
					age: age,
					gender: gender,
					weight: weight,
					dogtag: dogtag,
					story: story,
					id: id
				}
				db.collection('dogs').doc(id).set(dog)
				//db.collection('users').doc(response.user.uid).set(user)
				dispatch({type: 'DOGLOGIN', payload: dog})

			
		} catch (e) {
			console.log("in dog object");
			alert(e)
		}
		
	}//t
	}

	export const doglogin = () => {
		return async (dispatch, getState) => {
			try {
				console.log("function working")
				const { id} = getState().dog
				const dogQuery = await db.collection('dogs').doc(id).get()
				let dog = dogQuery.data()
	
				dispatch(getDog(dog.id))
			} catch (e) {
				console.log("in Dog login");
				alert(e)
			}
		}
	}
	

	export const getDog = (id, type) => {
		return async (dispatch, getState) => {
			try {
				const dogQuery = await db.collection('dogs').doc(id).get()
				let dog = dogQuery.data()
				    
				//let res = JSON.stringify(dog);
				console.log("GET DOG");

      
				//console.log("DOG TRY"+res)
	
		/*  let posts = []
		  const postsQuery = await db.collection('posts').where('id', '==', id).get()
		  postsQuery.forEach(function(response) {
			posts.push(response.data())
		  })
		  */
		 // user.posts = orderBy(posts, 'date','desc')
	
				//if(type === 'DOGLOGIN'){
					dispatch({type: 'DOGLOGIN', payload: dog })
				//} else {
					//console.log("inside GET_DOGPROFILE");
					//dispatch({type: 'GET_DOGPROFILE', payload: dog })
				//}
				
			} catch (e) {
				console.log("in get DOG");
				alert(e)
			}
		}
	}
	export const updateDog = () => {
		return async ( dispatch, getState )  => {
		  const {dogname,breed,age,gender,weight,dogtag,story,id } = getState().dog
		  try {
				const {dog} = getState()
			db.collection('dogs').doc(dog.id).update({
				name: dogname,
				breed: breed,
				age: age,
				gender: gender,
				weight: weight,
				dogtag: dogtag,
				story: story,
				id: dog.id
			})
		  } catch(e) {
				console.log("in update object");
			alert(e)
		  }
		}
	  }