import gameListReducer from './gameListReducer'
import gameReducer from './gameReducer'
import userReducer from './userReducer'
import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

export default combineReducers({
    gameListReducer, 
    gameReducer,
    userReducer,
    routing: routerReducer
})