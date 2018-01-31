import { LOAD_LIST_GAME, START, SUCCESS } from '../constants'
import { Map, List } from 'immutable'

const defaultState = new Map({
    loading: false,
    loaded: false,
    errors: new List([]),
    games: []
})

export default (state = defaultState, action) => {
    const { type, payload, response, randomId } = action

    switch (type) {
        
        case LOAD_LIST_GAME + START:
            return state.set('loading', true)

        case LOAD_LIST_GAME + SUCCESS:
            return state
                .set('loading', false)
                .set('games', response)         
    }
    
    return state
}