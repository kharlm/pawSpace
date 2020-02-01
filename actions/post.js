import firebase from 'firebase'
import db from '../config/firebase'
import uuid from 'uuid'
import cloneDeep from 'lodash/cloneDeep'
import orderBy from 'lodash/orderBy'
import { sendNotification } from './'
import {getDog} from '../actions/dog'
import { connect } from 'react-redux'


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

export const uploadPost = () => {
	return async (dispatch, getState) => {
    const { post,dog} = getState()
		try {

      
      const id = uuid.v4()
      let res = JSON.stringify(dog.dogId)
    
      console.log("dog: "+res)
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
        date: new Date().getTime(),
			}
      db.collection('posts').doc(id).set(upload)
      dispatch(getPosts())
      dispatch(getDog(dog.dogId,'DOGLOGIN'))
      
		} catch (e) {
			console.error(e)
		}
	}
}

export const getPosts = () => {
  return async (dispatch, getState) => {
		try {
			const posts = await db.collection('posts').get()
			
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

export const getPost = (id) => {
  return async (dispatch, getState) => {
		try {
      console.log("post id: "+id)
			const posts = await db.collection('posts').where('id', '==', id).get()
			
			let array = []
			posts.forEach((post)=>{
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
      let res = JSON.stringify(array)
      console.log("breed posts: "+res)
			dispatch({type: 'GET_DOGPOSTS', payload: array})
		} catch (e) {
			alert(e)
    }
    
  }

}


export const getlocationPosts = () => {
  return async (dispatch, getState) => {
		try {
      let posts = []
      const postsQuery = await db.collection('posts').where('postLocation.country', '==', 'Japan').get()
      postsQuery.forEach(function(response) {
        posts.push(response.data())
			})
			dispatch({type: 'GET_POSTS', payload: posts})
		} catch (e) {
      console.log("in get posts");
			alert(e)
    }

  }
	
}

export const likePost = (post) => {
  return (dispatch, getState) => {
    const { dogId, dogTag, photo } = getState().dog
    try {
      // const home = cloneDeep(getState().post.feed)
      // let newFeed = home.map(item => {
      //   if(item.id === post.id){
      //     item.likes.push(uid)
      //   } return item
      // })
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
      })
      dispatch(sendNotification(post.dogId, 'Licked Your Photo'))
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
