import { doc, getDoc, setDoc, updateDoc, collection, getDocs, query, where, arrayUnion } from 'firebase/firestore';
import { orderBy } from 'lodash'
import { allowNotifications, sendNotification } from './'
import { db } from '../config/firebase';
import uuid from 'uuid'
import * as Location from 'expo-location'
import Geohash from 'latlon-geohash';
import {getPosts} from '../actions/post'


export const updateDogname = (dogname) => {
	return {type: 'UPDATE_DOGNAME', payload: dogname}
}

export const postPage = (input) => {
	return {type: 'POST_PAGE', payload: input}
}

export const updateBreed = (breed) => {
	return {type: 'UPDATE_BREED', payload: breed}
}

export const updateAge = (age) => {
	return {type: 'UPDATE_AGE', payload: age}
}

export const updateColor = (color) => {
	return {type: 'UPDATE_COLOR', payload: color}
}

export const updateGender = (gender) => {
	return {type: 'UPDATE_GENDER', payload: gender}
}

export const updateWeight = (weight) => {
    return {type: 'UPDATE_WEIGHT', payload: weight}

}

export const updateDogtag = (dogTag) => {
    return {type: 'UPDATE_DOGTAG', payload: dogTag.replace(/\s/g, '')}

}

export const updateBio = (bio) => {
    return {type: 'UPDATE_BIO', payload: bio}

}
export const updatePhoto = (photo) => {
	return {type: 'UPDATE_PHOTO', payload: photo}
}

export const getLocation = (dog) => {
	console.log("in get location")
	return async(dispatch,getState) => {
		const { status } = await Location.requestForegroundPermissionsAsync()
		if(status === 'granted'){
			const location = await Location.getCurrentPositionAsync({})
			var geocode = Geohash.encode(location.coords.latitude, location.coords.longitude, 3)
			try {
				updateDoc(doc(db, 'dogs', dog.dogId), {
					geocode: geocode
				})
			}catch (e) {
				alert(e)
			}

			dispatch({ type: 'GET_LOCATION', payload: geocode });
		}
	}
}



export const dogsignup = () => {
	return async (dispatch, getState) => {
		const { uid} = getState().user

		try {
			const id = uuid.v4()
			updateDoc(doc(db, 'users', uid), {
				dogs: arrayUnion(id)
			})

			const {dogname,breed,color,age,gender,weight,dogTag,bio,photo} = getState().dog

			if(id){
				const dog = {
					dogname: dogname,
					breed: breed,
					age: age,
					color: color,
					gender: gender,
					weight: weight,
					dogTag: dogTag,
					bio: bio,
					dogId: id,
					followers: [],
					following: [],
					photo: photo,
					uid: uid,
					blocked: [],
					geocode:''

			}

				setDoc(doc(db, 'dogs', id), dog)
				dispatch({type: 'DOGLOGIN', payload: dog})
				dispatch({type:'YES_DOG'})

		}

		} catch (e) {
			alert(e)
		}

	}//t
	}

	export const doglogin = () => {
		console.log("INSIDE DOG LOGIN")

		return async (dispatch, getState) => {
			try {
				const { dogId} = getState().dog
				const{uid} = getState().user
				const dogSnap = await getDoc(doc(db, 'dogs', dogId))
				let dog = dogSnap.data()

				dispatch(getDog(dog.dogId))

			} catch (e) {

				alert(e)
			}
		}
	}


	export const getDog = (dogId, type) => {
		return async (dispatch, getState) => {
			try {

				const dogSnap = await getDoc(doc(db, 'dogs', dogId))
				let dog = dogSnap.data()
		 let posts = []
		  const postsQuery = await getDocs(query(collection(db, 'posts'), where('dogId', '==', dogId)))
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

	export const blockDog = (blockedDogId) => {
		console.log("in major block method")

		return async (dispatch,getState)  => {
			const { dogId, photo, dogTag} = getState().dog
			console.log("dogID: "+dogId)
			console.log("blocked DogId: "+blockedDogId)
			try {
				updateDoc(doc(db, 'dogs', dogId), {
					blocked: arrayUnion(blockedDogId)
				})
				dispatch(getPosts())
				dispatch(getDog(dogId))
			}
			catch(e) {
			  console.log("block dog error")
			alert(e)
			}
		  }
	}
	export const updateDog = () => {
		return async ( dispatch, getState )  => {
		  const {dogname,breed,color,age,gender,weight,dogTag,bio,dogId,photo } = getState().dog
		  try {
			updateDoc(doc(db, 'dogs', dogId), {
				name: dogname,
				breed: breed,
				color: color,
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

	  export const getDogs = (dog) => {

		return async (dispatch, getState) => {
			let dogs = []
			try {
				const dogSnap = await getDoc(doc(db, 'dogs', dog.dogId))
				  let dog1 = dogSnap.data()
				  console.log("dog1 geocde: "+dog1.geocode)
				const snapshot = await getDocs(query(collection(db, 'dogs'), where('geocode', '==', dog1.geocode)))
				const matchQuery = await getDocs(query(collection(db, 'dogs'), where('dogId', '==', dog.dogId)))
				const fullSnapshot = await getDocs(collection(db, 'dogs'))


				let items = []
				let allItems= []
				let swipes = []

				matchQuery.forEach(function(response) {
					dogs.push(response.data())
					})

				allItems = fullSnapshot.docs.map(doc => doc.data());
				items = snapshot.docs.map(doc => doc.data());

				swipes = dogs[0].swipes




				// Removes the users profile from a list of cards that returned
				for(let i=0; i<items.length; i++){
					if(items[i].dogId===dog.dogId){
						items.splice(i,1)
					}
				}


			if (typeof swipes != 'undefined'){


			 for(let k=0;k<swipes.length;k++){


				for(let i=0; i<items.length; i++){

					if(items[i].dogId===Object.keys(swipes[k])[0]){
						items.splice(i,1)
					}
				}
			 }
			}

			console.log("length: "+items.length)

				dispatch({ type: 'GET_CARDS', payload: items });

			} catch (e) {
				alert(e)
			}
		}
	}

