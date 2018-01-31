import { INIT_GAME, GET_GAME_STATE, GAME_DO_STEP, START, SUCCESS, FAIL } from '../constants'
import { connect } from 'react-redux'

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

export function initGame(gameToken, user) {
	return (dispatch, state) => {
			dispatch({
					type: INIT_GAME + START
			})

		fetch('/api/games/join', {
			method: 'POST',
			headers: {
				'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: 'userId='+user.id+'&userToken='+user.token+'&gameToken='+gameToken
			})
			.then(json)
			.then(
			response => dispatch({ type: INIT_GAME + SUCCESS, response })
			).catch(
			error => dispatch({ type: INIT_GAME + FAIL, error })
			)
	}
}

export function addGame(gameToken, user) {
	return (dispatch, state) => {
			dispatch({
					type: INIT_GAME + START
			})

		fetch('/api/games/new', {
			method: 'POST',
			headers: {
				'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			body: 'userId='+user.id+'&userToken='+user.token
			})
			.then(json)
			.then(
			response => dispatch({ type: INIT_GAME + SUCCESS, response })
			).catch(
			error => dispatch({ type: INIT_GAME + FAIL, error })
			)
	}
}

export function getGameState(gameToken) {
    return (dispatch, state) => {
        dispatch({
            type: GET_GAME_STATE + START
        })
		
		fetch('/api/games/state/'+gameToken)
		  .then(status) 
		  .then(json)
		  .then(		
			response => dispatch({ type: GET_GAME_STATE + SUCCESS, response })
		  ).catch(  		
			error => dispatch({ type: GET_GAME_STATE + FAIL, error })		
		  )
    }
}

export function doGameStep(user, row, col) {    
    return (dispatch, state) => {
      dispatch({
        type: GAME_DO_STEP + START
      })

      fetch('/api/games/do_step', {  
				method: 'POST',  
				headers: {  
					'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
					'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'  
				},			
				body: 'userId='+user.id+'&userToken='+user.token+'&gameToken='+user.gameToken+'&row='+row+'&col='+col  
		  })
		  .then(json)
		  .then(		
			response => dispatch({ type: GAME_DO_STEP + SUCCESS, response })
		  ).catch(  		
			error => dispatch({ type: GAME_DO_STEP + FAIL, error })
		  )
	}    
}