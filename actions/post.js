import firebase from 'firebase'
import db from '../config/firebase'
import uuid from 'uuid'
import cloneDeep from 'lodash/cloneDeep'
import orderBy from 'lodash/orderBy'
import { sendNotification } from './'
import {getDog} from '../actions/dog'
import {postPage} from '../actions/dog'
import { connect } from 'react-redux'
import  { AnimatedRegion } from 'react-native-maps'
const GOOGLE_API = 'https://maps.googleapis.com/maps/api/geocode/json?'
const key = 'AIzaSyCKtd8tWSWZ1jMR8tw11c-FgmIPsF9Ycqk'




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
      //const {dog} = getState()
    db.collection('dogs').doc(dogId).update({
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
      //const {dog} = getState()
    db.collection('posts').doc(id).update({
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
      const dogQuery = await db.collection('dogs').doc(dog.dogId).get()
      let dog1 = dogQuery.data()
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
      db.collection('posts').doc(id).set(upload)
      dispatch(getPosts())
      dispatch(getDog(dog.dogId,'DOGLOGIN'))
      dispatch({type: 'POST_PAGE', payload: 'true' })
      //dispatch(getDog(dog.dogId,'GET_DOGPROFILE'))
      
		} catch (e) {
			console.error(e)
		}
	}
}

export const deletePost = (post) => {

  return async (dispatch, getState) => {
    const {dog} = getState()

    let desertRef = firebase.storage().refFromURL(post.postPhoto)
    console.log("ref: "+ desertRef)
    db.collection('posts').doc(post.id).delete()

    desertRef.delete().then(function() {
      // File deleted successfully
    }).catch(function(error) {
      // Uh-oh, an error occurred!
    });
    dispatch(getPosts())
    dispatch(getDog(dog.dogId,'DOGLOGIN'))
  }
}

export const getPosts = (dog) => {
  return async (dispatch, getState) => {
   
    //const { dogId, dogTag, photo } = getState().dog
   
    
		try {
     
      const posts = await db.collection('posts').get()

      let rest
      
			
			let array = []
			posts.forEach((post)=>{
       //if(dog.blocked.include(post.id)!=true)
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
      //const {dog} = getState()
    db.collection('posts').doc(postId).update({
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
      const posts = await db.collection('posts').where('id', '==', id).get()
      
     
			
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
			const posts = await db.collection('posts').where('dog.breed', '==', breed).get()
			
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
			const posts = await db.collection('posts').where('dog.color', '==', color).get()
			
			let array = []
			posts.forEach((post)=>{
				array.push(post.data())
      })
      let res = JSON.stringify(array)
			dispatch({type: 'GET_DOGPOSTS', payload: array})
		} catch (e) {
			alert(e)
    }
    
  }

}

export const getGenderPosts = (gender) => {
  return async (dispatch, getState) => {
		try {
			const posts = await db.collection('posts').where('dog.gender', '==', gender).get()
			
			let array = []
			posts.forEach((post)=>{
				array.push(post.data())
      })
      let res = JSON.stringify(array)
			dispatch({type: 'GET_DOGPOSTS', payload: array})
		} catch (e) {
			alert(e)
    }
    
  }

}

export const getWeightPosts = (firstWeight,secondWeight) => {
  return async (dispatch, getState) => {
		try {
			const posts = await db.collection('posts').where('dog.weight', '>=', firstWeight).where('dog.weight', '<=', secondWeight).get()
			
			let array = []
			posts.forEach((post)=>{
				array.push(post.data())
      })
      let res = JSON.stringify(array)
			dispatch({type: 'GET_DOGPOSTS', payload: array})
		} catch (e) {
			alert(e)
    }
    
  }
}

export const getAgePosts = (firstAge,secondAge) => {
  return async (dispatch, getState) => {
		try {
			const posts = await db.collection('posts').where('dog.age', '>=', firstAge).where('dog.age', '<=', secondAge).get()
			
			let array = []
			posts.forEach((post)=>{
				array.push(post.data())
      })
      let res = JSON.stringify(array)
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

        const postsQuery = await db.collection('posts').where('postLocation.state', '==', state).get()
        postsQuery.forEach(function(response) {
        posts.push(response.data())
			})
			dispatch({type: 'GET_EXPLOREPOSTS', payload: posts})

      }

      else{
        const postsQuery = await db.collection('posts').where('postLocation.country', '==', country).get()
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
    let falseVideo = false
    console.log("isVideo: "+post.isVideo)
    try {
      db.collection('posts').doc(post.id).update({
        likes: firebase.firestore.FieldValue.arrayUnion(dogId)
      })
      db.collection('activity').doc().set({
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
     // dispatch({type: 'GET_POSTS', payload: newFeed})
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
      db.collection('posts').doc(post.id).update({
        likes: firebase.firestore.FieldValue.arrayRemove(dogId)
      })
      const query = await db.collection('activity').where('postId', '==', post.id).where('likerId', '==', dogId).get()
      query.forEach((response) => {
        response.ref.delete()
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
      db.collection('posts').doc(post.id).update({
        comments: firebase.firestore.FieldValue.arrayUnion(comment)
      })
      comment.postId = post.id
      comment.postPhoto = post.postPhoto
      comment.dogId = post.dogId
      comment.type = 'COMMENT'
      comments.push(comment)
      dispatch({ type: 'GET_COMMENTS', payload: comments.reverse() })

      //dispatch(sendNotification(post.dogId, text))
      db.collection('activity').doc().set(comment)
    } catch(e) {
      console.error(e)
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ followUser, unfollowUser,getDog,getUser }, dispatch)
}

const mapStateToProps = (state) => {
  return {
    post: state.post,
    user: state.user,
    userprofile: state.profile,
    dog: state.dog
  }
}

export default connect(mapStateToProps,mapDispatchToProps)
