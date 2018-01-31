import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getGameState } from '../AC/gameAction'
import { loadGameList } from '../AC/gameListAction'

import { STATUS_DONE } from './../constants'
import { URL_GAME, URL_GAME_LIST } from './../constantsUrl'

class ApiQuery extends Component {

    componentDidMount() {

        const QUERY_INTERVAL_TIME = 2000
        let count = 1

        const queryToApi = () => {   
            
            const { nowPath } = this.props            

            switch (nowPath) {
                case URL_GAME_LIST:                      
                    this.props.loadGameList(true)                    
                    break
                case URL_GAME:                         
                    const { getGameState, gameData, isGameInit } = this.props
                    if(isGameInit && gameData && gameData.state != STATUS_DONE) {
                        getGameState(gameData.gameToken)                        
                    }
                    break                
            }

            setTimeout(queryToApi, QUERY_INTERVAL_TIME)
        }

        setTimeout(queryToApi, QUERY_INTERVAL_TIME)
    }

    render() {
        return (null)
    }
}

function mapStateToProps(state) {
    const { gameReducer, userReducer, routing } = state
    return {
        nowPath: routing.location.pathname,
        gameData: gameReducer.get('gameData'),  
        isGameInit: gameReducer.get('isGameInit'),      
        user: userReducer.get('user')
    }
 }

export default connect(mapStateToProps, { getGameState, loadGameList })(ApiQuery)