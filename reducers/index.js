import { combineReducers } from 'redux'

const user = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload
    case 'UPDATE_EMAIL':
      return { ...state, email: action.payload }
    case 'UPDATE_PASSWORD':
      return { ...state, password: action.payload }
    case 'UPDATE_USERNAME':
      return { ...state, username: action.payload }
    case 'UPDATE_PHOTO':
      return { ...state, photo: action.payload }
    case 'UPDATE_PHOTO':
      return { ...state, photo: action.payload }
    case 'GET_TOKEN': 
      return { ...state, token: action.payload }
    default:
      return state
  }
}

const dog = (state = {}, action) => {
  switch (action.type) {
    case 'DOGLOGIN':
      return action.payload
    case 'UPDATE_DOGNAME':
      return { ...state, dogname: action.payload } 
    case 'UPDATE_BREED':
      return { ...state, breed: action.payload } 
    case 'UPDATE_AGE':
      return { ...state, age: action.payload } 
    case 'UPDATE_GENDER':
      return { ...state, gender: action.payload } 
    case 'UPDATE_WEIGHT':
      return { ...state, weight: action.payload } 
    case 'UPDATE_DOGTAG':
      return { ...state, dogtag: action.payload } 
    case 'UPDATE_STORY':
      return { ...state, story: action.payload } 
    default:
      return state
  }
}


const profile = (state = {}, action) => {
  switch (action.type) {
    case 'GET_PROFILE':
      return action.payload
    default:
      return state
  }
}

const messages = (state = {}, action) => {
  switch (action.type) {
    case 'GET_MESSAGES':
      return action.payload
    default:
      return state
  }
}

const post = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_PHOTO':
      return { ...state, photo: action.payload }
    case 'UPDATE_DESCRIPTION':
      return { ...state, description: action.payload }
    case 'UPDATE_LOCATION':
      return { ...state, location: action.payload }
    case 'GET_POSTS':
      return { ...state, feed: action.payload }
    case 'GET_COMMENTS': 
      return { ...state, comments: action.payload }
    default:
      return state
  }
}

const modal = (state = null, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, modal: action.payload }
    case 'CLOSE_MODAL':
      return { ...state, modal: false }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  dog,
	user,
  post,
  modal,
  profile,
  messages
})

export default rootReducer