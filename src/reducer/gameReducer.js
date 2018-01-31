import { INIT_GAME, GET_GAME_STATE, GAME_DO_STEP, START, SUCCESS } from '../constants'
import { Map, List } from 'immutable'

const defaultState = new Map({
    isGameInit: false,
    loaded: false,
    errors: new List([]),
    gameData: {}
})

export default (state = defaultState, action) => {
    const { type, response } = action

    switch (type) {
        
        case INIT_GAME + START:
            return state.set('isGameInit', false)

        case INIT_GAME + SUCCESS:
            return state                
                .set('gameData', response)
                .set('isGameInit', true)

        case GET_GAME_STATE + SUCCESS:
            return state.set('gameData', response)

        case GAME_DO_STEP + SUCCESS:
            var newState = {...state}
            const gameData = state.get('gameData')
            const {idWhoTurn, field, idWinner} = response
 

            return state.set('gameData', {
                gameToken: gameData.gameToken,
                idOwner : gameData.idOwner,
                idOpponent :  gameData.idOpponent,
                ownerName :  gameData.ownerName,
                opponentName :  gameData.opponentName,            
                gameDuration : gameData.gameDuration,  
                idWhoTurn : idWhoTurn,      
                field : field,
                idWinner : idWinner
            })
            
    }
    
    return state
}