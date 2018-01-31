import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { getFormatDate } from '../utils/date'
import Cell from './Cell'
import GamerInfo from './GamerInfo'
import './css/game.css'

class Game extends Component {

    constructor(props){
        super(props)
    }
    

    render() {
        const { gameData, handleCellClick, isObserver } = this.props
        const {field: fieldData} = gameData
        const isCrossUserWinner = (gameData.idOwner == gameData.idWinner) ? true : false
        const isNaughtUserWinner = (gameData.idOpponent == gameData.idWinner) ? true : false
        const dateStr = getFormatDate(gameData.gameDuration)

        let body = fieldData.map((row, indexRow) => (            	
            <tr key={indexRow}>
                    {row.split('').map((item, indexCol) => (
                        <td key={indexCol} onClick={handleCellClick.bind(this, indexRow, indexCol)}>
                            <Cell 
                                type={item == 'X' ? 'cross' :  item == '0' ? 'naught' : null}
                            />    
                        </td>                        
                    ))}
                
            </tr>
        ))

        return (
            <div className={'game-content' + (isObserver ? ' observer' : '')}>
                <div className='gamer-info'>
                    <GamerInfo name={this.props.crossUser} type='cross' isWinner={isCrossUserWinner} isActive={this.props.isCrossUser}/>
                    <GamerInfo name={this.props.naughtUser} type='naught' isWinner={isNaughtUserWinner} isActive={!this.props.isCrossUser}/>
                </div>
                <table className='game-field'>
                    <tbody>
                    {body}
                    </tbody>
                </table>
                <div className="time">{dateStr}</div>
                {gameData.state == 'done' || isObserver
                    ? <div className="button"><Link to='/'>BACK</Link></div> 
                    : null}
            </div>
        )
    }
    
}

export default Game