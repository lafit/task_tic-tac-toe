import { LOAD_LIST_USER, GET_USER, SET_USER, SET_NEW_USER, START, SUCCESS, FAIL } from '../constants'
import { Map, List } from 'immutable'

const defaultState = new Map({
    loadingList: false,
    loadingUser: false,
    failUser: false,
    errors: new List([]),
    users: [],
    user: {}
})

export default (state = defaultState, action) => {
    const { type, response } = action

    switch (type) {
        
        case LOAD_LIST_USER + START:
            return state.set('loadingList', true)

        case LOAD_LIST_USER + SUCCESS:
            return state
                .set('loadingList', false)
                .set('users', response)

        case GET_USER + START:
            return state
                .set('loadingUser', true)
                .set('failUser', false)
                .set('user', response)
        case GET_USER + SUCCESS:
            return state
                .set('loadingUser', false)
                .set('user', response)
        case GET_USER + FAIL:
            return state.set('failUser', true)
        case SET_USER:
            return state
            .set('failUser', false)
            .set('user', action.user)

        case SET_NEW_USER:
            return state.set('user', response)       
    }
    
    return state
}