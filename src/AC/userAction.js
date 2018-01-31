import { LOAD_LIST_USER, GET_USER, SET_USER, START, SUCCESS, FAIL } from '../constants'

function status(response) {  
  if (response.status >= 200 && response.status < 300) {  
    return Promise.resolve(response)  
  } else {  
    return Promise.reject(new Error(response.statusText))  
  }  
}

function json(response) {
	return response.json()
}

function checkUser(response){    
    if ('id' in response) {  
        return response  
      } else { 
        return Promise.reject(new Error('invalid user'))  
      }  
}

export function loadUserList() {
    return (dispatch, state) => {
        dispatch({
            type: LOAD_LIST_USER + START
        })
		
        fetch('/api/games/test_login')  
            .then(status) 
            .then(json)
            .then(		
            response => dispatch({ type: LOAD_LIST_USER + SUCCESS, response })
            ).catch(  		
            error => dispatch({ type: LOAD_LIST_USER + FAIL, error })		
            )
    }
}

export function setUser(user) {
  return (dispatch, state) => {
      dispatch({
        type: SET_USER,
        user: user
      }) 
  }
}

export function getUser(id, token) {
    return (dispatch, state) => {
        dispatch({
            type: GET_USER + START
        })

        fetch('/api/games/get_user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: 'userId='+id+'&userToken='+token
        })
            .then(json)
            .then(checkUser)
            .then(
                response => dispatch({ type: GET_USER + SUCCESS, response })
            ).catch(
            error => dispatch({ type: GET_USER + FAIL, error })
        )
    }
}

export function setNewUser() {
  return (dispatch, state) => {
      dispatch({
          type: SET_USER + START
      })
  
      fetch('/api/games/test_login')  
          .then(status) 
          .then(json)
          .then(		
          response => dispatch({ type: SET_USER + SUCCESS, response })
          ).catch(  		
          error => dispatch({ type: SET_USER + FAIL, error })		
          )
      }
}