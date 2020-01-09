import firebase from 'firebase'
import db from '../config/firebase'
import uuid from 'uuid'
import cloneDeep from 'lodash/cloneDeep'
import orderBy from 'lodash/orderBy'
import { sendNotification } from './'


export const updateDescription = (input) => {
	return {type: 'UPDATE_DESCRIPTION', payload: input}
}

export const updatePhoto = (input) => {
	return {type: 'UPDATE_PHOTO', payload: input}
}

export const updateLocation = (input) => {
	return {type: 'UPDATE_LOCATION', payload: input}
}

export const uploadPost = () => {
	return async (dispatch, getState) => {
		try {
			const { post, dog } = getState()
			const id = uuid.v4()
			const upload = {
				id: id,
				postPhoto: post.photo,
				postDescription: post.description || ' ',
				postLocation: post.location || ' ',
				dogId: dog.dogId,
				photo: dog.photo || ' ',
				dogTag: dog.dogTag,
				likes: [],
        comments: []
			}
			db.collection('posts').doc(id).set(upload)
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
			dispatch({type: 'GET_POSTS', payload: array})
		} catch (e) {
      console.log("in get posts");
			alert(e)
    }
    
  }

}


export const getlocationPosts = () => {
  return async (dispatch, getState) => {
		try {
      let posts = []
      const postsQuery = await db.collection('posts').where('postLocation.country', '==', 'Japan').get()
      console.log(postsQuery);
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
      dispatch(sendNotification(post.dogId, 'Liked Your Photo'))
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