import React, { Component} from 'react'
import Game from '../components/Game'
import { connect } from 'react-redux'
import { getGameState, doGameStep } from '../AC/gameAction'
import { getUser } from '../AC/userAction'
import gameReducer from '../reducer/gameReducer';
import userReducer from '../reducer/userReducer';
import { Redirect } from 'react-router-dom';
import { URL_LOGIN } from './../constantsUrl'

class GameContainer extends Component {
    state = {
        queryEnable : true
    }

    componentDidMount() {
        
        const QUERY_INTERVAL_TIME = 2000
        const { user } = this.props
        this.props.getUser(user.id, user.token)

        const { gameData, isGameInit } = this.props
            if(isGameInit && gameData.state != 'done' && this.state.queryEnable) {
                this.props.getGameState(gameData.gameToken)
                setTimeout(getGameState, QUERY_INTERVAL_TIME)
            }
    }
       
    
    render() {
        const { gameData, isGameInit, loadingUser, failUser, user } = this.props
        if(failUser) {
            return <Redirect to={URL_LOGIN} />
        }
        if (!isGameInit) return <h2>Loading...</h2>
        if (loadingUser || !user) return <h2>Loading....</h2>

        const crossUser = (user.id == gameData.idOwner) ? user.name : gameData.ownerName
        const naughtUser = (user.id == gameData.idOpponent) ? user.name : gameData.opponentName
        const isCrossUser = (user.id == gameData.idOwner) ? true : false

        if (!gameData) return <h2>NO game data...</h2>

        return <Game gameData={gameData} 
                     handleCellClick={this.handleCellClick} 
                     crossUser={crossUser} 
                     naughtUser={naughtUser} 
                     isCrossUser={isCrossUser}
                     isObserver={user.id != gameData.idOwner && user.id != gameData.idOpponent}
                     />
    }

    handleCellClick = (row, col) => {
        const { user } = this.props
        const { gameData} = this.props
        if(!gameData.idWinner) {
            this.props.doGameStep(user, row, col)
        }
    }
}

function mapStateToProps(state) {
    const { gameReducer, userReducer } = state
    return {
        gameData: gameReducer.get('gameData'),
        isGameInit: gameReducer.get('isGameInit'),
        user: userReducer.get('user'),
        failUser: userReducer.get('failUser')
    }
 }

export default connect(mapStateToProps, { getGameState, doGameStep, getUser })(GameContainer)
