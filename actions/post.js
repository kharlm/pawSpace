import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
import { db, storage } from '../config/firebase'
import uuid from 'uuid'
import cloneDeep from 'lodash/cloneDeep'
import orderBy from 'lodash/orderBy'
import { sendNotification } from './'
import {getDog} from '../actions/dog'
import {postPage} from '../actions/dog'




export const updateDescription = (input) => {
	return {type: 'UPDATE_DESCRIPTION', payload: input}
}

export const updatePhoto = (input) => {
	return {type: 'UPDATE_PHOTO', payload: input}
}

export const updateLocation = (input) => {
	return {type: 'UPDATE_LOCATION', payload: input}
}



export const updateDog = () => {
  return async ( dispatch, getState )  => {
    const {dogname,breed,color,age,gender,weight,dogTag,bio,dogId,photo } = getState().dog
    try {
    updateDoc(doc(db, 'dogs', dogId), {
      name: dogname,
      breed: breed,
      age: age,
      color: color,
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

export const updatePosts = () => {

  return async ( dispatch, getState )  => {
    const {id,postPhoto,postDescription,postLocation,dogId,photo,dogTag,dog,likes,comments,date} = getState().post
    try {
    updateDoc(doc(db, 'posts', id), {
        id: id,
				postPhoto: postPhoto,
				postDescription: postDescription,
				postLocation: postLocation,
				dogId: dogId,
				photo: photo,
        dogTag: dogTag,
        dog: dog,
				likes: likes,
        comments: comments,
        date: date,

    })
    } catch(e) {
      console.log("post update error")
    alert(e)
    }
  }

}

export const uploadPost = (isVideo,thumbnail) => {
  console.log("thumb: "+thumbnail)
	return async (dispatch, getState) => {
    const { post,dog} = getState()
		try {
      const id = uuid.v4()
      const dogSnap = await getDoc(doc(db, 'dogs', dog.dogId))
      let dog1 = dogSnap.data()
			const upload = {
				id: id,
				postPhoto: post.photo,
				postDescription: post.description || ' ',
				postLocation: post.location || ' ',
				dogId: dog1.dogId,
				photo: dog1.photo || ' ',
        dogTag: dog1.dogTag,
        dog: dog1,
				likes: [],
        comments: [],
        flagged: 'no',
        date: new Date().getTime(),
        isVideo: isVideo,
        thumbnail: thumbnail
			}
      setDoc(doc(db, 'posts', id), upload)
      dispatch(getPosts())
      dispatch(getDog(dog.dogId,'DOGLOGIN'))
      dispatch({type: 'POST_PAGE', payload: 'true' })

		} catch (e) {
			console.error(e)
		}
	}
}

export const deletePost = (post) => {

  return async (dispatch, getState) => {
    const {dog} = getState()

    try {
      const photoRef = ref(storage, post.postPhoto)
      deleteDoc(doc(db, 'posts', post.id))
      await deleteObject(photoRef)
    } catch(e) {
      console.error(e)
    }
    dispatch(getPosts())
    dispatch(getDog(dog.dogId,'DOGLOGIN'))
  }
}

export const getPosts = (dog) => {
  return async (dispatch, getState) => {
		try {

      const posts = await getDocs(collection(db, 'posts'))

			let array = []
			posts.forEach((post)=>{
				array.push(post.data())
			})
      dispatch({type: 'GET_POSTS',  payload: orderBy(array, 'date','desc')})
		} catch (e) {
			alert(e)
    }

  }

}

export const flagPost = (postId) => {
  return async ()  => {
    try {
    updateDoc(doc(db, 'posts', postId), {
        flagged: 'yes'

    })
    } catch(e) {
      console.log("flag post error")
    alert(e)
    }
  }

}

export const getPost = (id) => {
  return async (dispatch, getState) => {
		try {
      console.log("post id: "+id)
      const posts = await getDocs(query(collection(db, 'posts'), where('id', '==', id)))

			let array = []
			posts.forEach((post)=>{

        console.log("posIDS: "+post.data())
				array.push(post.data())
      })

			dispatch({type: 'GET_POST', payload: array})
		} catch (e) {
			alert(e)
    }

  }

}

export const getBreedPosts = (breed) => {
  return async (dispatch, getState) => {
		try {
			const posts = await getDocs(query(collection(db, 'posts'), where('dog.breed', '==', breed)))

			let array = []
			posts.forEach((post)=>{
				array.push(post.data())
      })
			dispatch({type: 'GET_DOGPOSTS', payload: array})
		} catch (e) {
			alert(e)
    }

  }

}

export const getColorPosts = (color) => {
  return async (dispatch, getState) => {
		try {
			const posts = await getDocs(query(collection(db, 'posts'), where('dog.color', '==', color)))

			let array = []
			posts.forEach((post)=>{
				array.push(post.data())
      })
			dispatch({type: 'GET_DOGPOSTS', payload: array})
		} catch (e) {
			alert(e)
    }

  }

}

export const getGenderPosts = (gender) => {
  return async (dispatch, getState) => {
		try {
			const posts = await getDocs(query(collection(db, 'posts'), where('dog.gender', '==', gender)))

			let array = []
			posts.forEach((post)=>{
				array.push(post.data())
      })
			dispatch({type: 'GET_DOGPOSTS', payload: array})
		} catch (e) {
			alert(e)
    }

  }

}

export const getWeightPosts = (firstWeight,secondWeight) => {
  return async (dispatch, getState) => {
		try {
			const posts = await getDocs(query(collection(db, 'posts'), where('dog.weight', '>=', firstWeight), where('dog.weight', '<=', secondWeight)))

			let array = []
			posts.forEach((post)=>{
				array.push(post.data())
      })
			dispatch({type: 'GET_DOGPOSTS', payload: array})
		} catch (e) {
			alert(e)
    }

  }
}

export const getAgePosts = (firstAge,secondAge) => {
  return async (dispatch, getState) => {
		try {
			const posts = await getDocs(query(collection(db, 'posts'), where('dog.age', '>=', firstAge), where('dog.age', '<=', secondAge)))

			let array = []
			posts.forEach((post)=>{
				array.push(post.data())
      })
			dispatch({type: 'GET_DOGPOSTS', payload: array})
		} catch (e) {
			alert(e)
    }

  }
}

export const getlocationPosts = (city,state,country) => {

  return async (dispatch, getState) => {
		try {
      let posts = []

      if(country==="United States"){

        const postsQuery = await getDocs(query(collection(db, 'posts'), where('postLocation.state', '==', state)))
        postsQuery.forEach(function(response) {
        posts.push(response.data())
			})
			dispatch({type: 'GET_EXPLOREPOSTS', payload: posts})

      }

      else{
        const postsQuery = await getDocs(query(collection(db, 'posts'), where('postLocation.country', '==', country)))
        postsQuery.forEach(function(response) {
        posts.push(response.data())
			})
			dispatch({type: 'GET_EXPLOREPOSTS', payload: posts})
      }

		} catch (e) {
      console.log("in get posts");
			alert(e)
    }

  }

}

export const likePost = (post) => {
  return (dispatch, getState) => {
    const { dogId, dogTag, photo } = getState().dog
    console.log("isVideo: "+post.isVideo)
    try {
      updateDoc(doc(db, 'posts', post.id), {
        likes: arrayUnion(dogId)
      })
      setDoc(doc(collection(db, 'activity')), {
        postId: post.id,
        postPhoto: post.postPhoto,
        likerId: dogId,
        likerPhoto: photo,
        likerName: dogTag,
        dogId: post.dogId,
        date: new Date().getTime(),
        type: 'LIKE',
        thumbnail: post.thumbnail?post.thumbnail:'',
        isVideo: post.isVideo
      })
      dispatch(sendNotification(post.dog.uid, 'Licked Your Photo'))
      dispatch(getPosts())
    } catch(e) {
      console.error(e)
    }
  }
}

export const unlikePost = (post) => {
  return async (dispatch, getState) => {
    const { dogId } = getState().dog
    try {
      updateDoc(doc(db, 'posts', post.id), {
        likes: arrayRemove(dogId)
      })
      const activitySnap = await getDocs(query(collection(db, 'activity'), where('postId', '==', post.id), where('likerId', '==', dogId)))
      activitySnap.forEach((response) => {
        deleteDoc(response.ref)
      })
      dispatch(getPosts())
    } catch(e) {
      console.error(e)
    }
  }
}

export const getComments = (post) => {
  return dispatch => {
    dispatch({ type: 'GET_COMMENTS', payload: orderBy(post.comments, 'date','desc') })
  }
}

export const addComment = (text, post) => {
  return (dispatch, getState) => {
    const { dogId, photo, dogTag } = getState().dog
    let comments = cloneDeep(getState().post.comments.reverse())
    try {
      const comment = {
        comment: text,
        commenterId: dogId,
        commenterPhoto: photo || '',
        commenterName: dogTag,
        date: new Date().getTime(),
      }
      updateDoc(doc(db, 'posts', post.id), {
        comments: arrayUnion(comment)
      })
      comment.postId = post.id
      comment.postPhoto = post.postPhoto
      comment.dogId = post.dogId
      comment.type = 'COMMENT'
      comments.push(comment)
      dispatch({ type: 'GET_COMMENTS', payload: comments.reverse() })

      setDoc(doc(collection(db, 'activity')), comment)
    } catch(e) {
      console.error(e)
    }
  }
}
