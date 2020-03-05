import firebase from 'firebase';
import { orderBy, groupBy, values } from 'lodash'
import { allowNotifications, sendNotification } from './'
import db from '../config/firebase';
import uuid from 'uuid'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import Geohash from 'latlon-geohash';


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

export const getLocation = (dog) => {
	console.log("in get location")
	return async(dispatch,getState) => {
		Permissions.askAsync(Permissions.LOCATION).then(function(result){
		  if(result){
		    Location.getCurrentPositionAsync({}).then(function(location){
			  var geocode = Geohash.encode(location.coords.latitude, location.coords.longitude, 1)
			  
			  
					
				try {
					const id = uuid.v4()	
					db.collection('dogs').doc(dog.dogId).update({
						geocode: geocode
					})
				}catch (e) {

					alert(e)
				}
		      
		      dispatch({ type: 'GET_LOCATION', payload: geocode });
		    })
		  }
		})
	}
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

	  export const getDogs = (dog) => {
		return async (dispatch, getState) => {
			let dogs = []
			try {
				const snapshot = await db.collection('dogs').where('geocode', '==', dog.geocode).get()
				const query = await db.collection('dogs').where('dogId', '==', dog.dogId).get()
				const fullSnapshot = await db.collection('dogs').get()
				let items = []
				let allItems= []

				let ind;

				query.forEach(function(response) {
					dogs.push(response.data())
					})

				allItems = fullSnapshot.docs.map(doc => doc.data());
				items = snapshot.docs.map(doc => doc.data());
				

				//let res = JSON.stringify(Object.keys(dogs[0].swipes[0])[0])
				//Object.keys(dogs[0].swipes[i])[0]===card.dogId)
				//console.log("Array "+dogs[0].swipes.length)

				//this removes any dogs the user already swiped on from the list of cards
				let removeId=null;
				let removeIndex= -1
				
					
					if(dogs[0].swipes){
					for(let i = 0; i<allItems.length;i++){
						console.log("inside first for loop")
						for(let j=0;j<dogs[0].swipes.length; j++){
							if(allItems[i].dogId===Object.keys(dogs[0].swipes[j])[0]){
								console.log("swipeID "+Object.keys(dogs[0].swipes[j])[0])
								removeId = allItems[i].dogId
								
							}
							//console.log("remove id"+removeId)
							if(removeId!=null){
								let res = JSON.stringify(allItems)
								console.log("item: "+res)
							removeIndex = items.map(function(item) { return item.dogId; }).indexOf("56bcfdeb-9d83-4159-929e-7b4fb43787cc");
							console.log("remove id"+removeIndex)
							}
							if(removeIndex!=1){
								//console.log("REMOVE INDEX "+removeIndex)
							}
							removeId = null
							//console.log("array before: "+items.length)
								items.splice(removeIndex, 1);
								removeIndex=null
								let res1 = JSON.stringify(items)
								//console.log("array after: "+items.length+res1)
							
						}
					}
						
					
				 
				console.log("remove index: "+removeIndex)
				
					}
					

				// Removes the users profile from a list of cards that returned
				for(let i=0; i<items.length; i++){
					if(items[i].dogId===dog.dogId){
						items.splice(i,1)
					}
				}

				
				dispatch({ type: 'GET_CARDS', payload: items });
	
    		//console.log(snapshot.docs.map(
				//doc => doc.data()))
			} catch (e) {
				alert(e)
			}
		}
	}
	  