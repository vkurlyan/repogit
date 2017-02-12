import axios from 'axios'
import { resolve, reject } from 'redux-simple-promise'

// ------------------------------------
// Constants
// ------------------------------------
export const FETCH_REPOSITORIES = 'FETCH_REPOSITORIES'
export const INVALID_USERNAME = 'INVALID_USERNAME'

const repoUrl = 'https://api.github.com/users/%username%/repos'

const initialState = {
  username: '',
  repositories: []
}

// ------------------------------------
// Actions
// ------------------------------------

export const showRepoList = (username) => {
  return (dispatch, getState) => {
    const currentUsername = username && username.trim()

    if (!currentUsername) {
      return dispatch(invalidUsername('Please enter a username'))
    }

    dispatch(fetchRepositories(currentUsername))
  }
}

export const invalidUsername = (error) => {
  return {
    type: INVALID_USERNAME,
    validationError: error
  }
}

export const fetchRepositories = (username) => {
  const url = repoUrl.replace('%username%', username)
  return {
    type: FETCH_REPOSITORIES,
    payload: {
      promise: axios.get(url)
    }
  }
}

export const actions = {
  showRepoList,
  invalidUsername
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FETCH_REPOSITORIES]: (state, action) => {
    return {
      ...state,
      repositories: [],
      validationError: null,
      message: null,
      serverError: null
    }
  },
  [resolve(FETCH_REPOSITORIES)]: (state, action) => {
    const data = action.payload.data

    if (Array.isArray(data) && data.length) {
      return {
        ...state,
        repositories: data
      }
    }

    return {
      ...state,
      message: 'User has no repositories'
    }
  },
  [reject(FETCH_REPOSITORIES)]: (state, action) => {
    const status = action.payload.response && action.payload.response.status

    if (status === 404) {
      return {
        ...state,
        serverError: 'The user does not exist'
      }
    }

    return {
      ...state,
      serverError: 'Github API does not respond'
    }
  },
  [INVALID_USERNAME]: (state, action) => {
    return {
      ...state,
      validationError: action.validationError,
      message: null,
      serverError: null
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function repoListReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
