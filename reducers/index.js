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
    case 'GET_TOKEN': 
      return { ...state, token: action.payload }
    default:
      return state
  }
}


const guest = ( state = false, action) => {
  switch(action.type) {
    case 'GUEST':
      return state = true
    case 'NO_GUEST':
      return state = false
    default:
      return state;
  }
}

const nodog = ( state = false, action) => {
  switch(action.type) {
    case 'NO_DOG':
      return state = true
    case 'YES_DOG':
    return state = false
    default:
      return state;
  }
}


const signupError = ( state = false, action) => {
  switch(action.type) {
    case 'SIGNUP_ERROR':
      return state = true
    case 'NOSIGNUP_ERROR':
        return state = false
    default:
      return state;
  }
}

const dog = (state = {}, action) => {
  switch (action.type) {
    case 'DOGLOGIN':
      return action.payload
      case 'POST_PAGE':
        return { ...state, postPage: action.payload }
    case 'UPDATE_DOGNAME':
      return { ...state, dogname: action.payload } 
    case 'UPDATE_BREED':
      return { ...state, breed: action.payload } 
    case 'UPDATE_COLOR':
      return { ...state, color: action.payload } 
    case 'UPDATE_AGE':
      return { ...state, age: action.payload } 
    case 'UPDATE_GENDER':
      return { ...state, gender: action.payload } 
    case 'UPDATE_WEIGHT':
      return { ...state, weight: action.payload } 
    case 'UPDATE_DOGTAG':
      return { ...state, dogTag: action.payload } 
    case 'UPDATE_BIO':
      return { ...state, bio: action.payload } 
    case 'UPDATE_PHOTO':
      return { ...state, photo: action.payload }
    case 'GET_LOCATION':
    return { ...state, geocode: action.payload }
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

const dogprofile = (state = {}, action) => {
  switch (action.type) {
    case 'GET_DOGPROFILE':
      return action.payload
    default:
      return state
  }
}

const cards = (state = {}, action) => {
  switch (action.type) {
    case 'GET_CARDS':      
    return { ...state, cards: action.payload}
    default:
      return state
  }
}


const messages = (state = {}, action) => {
  switch (action.type) {
    case 'GET_MESSAGES':
      console.log("IN GET MESSAGES")
      return action.payload
    default:
      return state
  }
}
/*const postPage = (state = 'false', action) => {
  switch (action.type) {
    case 'POST_PAGE':
      return { ...state, postPage: action.payload }
    default:
      return state
  }
}*/

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
    case 'GET_POST':
      return { ...state, postFeed: action.payload }
    case 'GET_DOGPOSTS':
      return { ...state, breedFeed: action.payload }
    case 'GET_EXPLOREPOSTS':
        return { ...state, exploreFeed: action.payload }
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
  messages,
  dogprofile,
  signupError,
  cards,
  guest,
  nodog
})

export default rootReducer