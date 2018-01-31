import { LOAD_LIST_GAME, START, SUCCESS, FAIL } from '../constants'

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
export function loadGameList(isUpdate) {
    return (dispatch, state) => {
				if(!isUpdate) {
					dispatch({
							type: LOAD_LIST_GAME + START
					})
				}
		
				fetch('/api/games/list')
					.then(status)
					.then(json)
					.then(
					response => dispatch({ type: LOAD_LIST_GAME + SUCCESS, response })
					).catch(
					error => dispatch({ type: LOAD_LIST_GAME + FAIL, error })
					)
				}
}