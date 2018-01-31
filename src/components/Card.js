import React, { Component }  from 'react'
import { getFormatDate } from '../utils/date'
import './css/card.css'

class Card extends Component {
    constructor(props) {
        super(props);
    }

    getFormatDate(miliseconds) {
        let date=new Date(miliseconds)
        let format = (num) => ('00' + num).slice(-2)
        return format(date.getHours()) + ':' + format(date.getMinutes()) + ':' + format(date.getSeconds())
    }

    render() {       
        let { itemGame } = this.props
        let dateStr = getFormatDate(itemGame.gameDuration)
       
        let getWinnerCssClass = (who) => (itemGame.gameResult == who ? ' winner' : '')
        let winnerOwner = getWinnerCssClass('owner');
        let winnerOpponent = getWinnerCssClass('opponent');        

        return (
            <div className={"card state-"+itemGame.state}>
                <span className={'name'+`${winnerOwner}`}>{itemGame.owner}</span>
                {itemGame.opponent ? <span className={'name'+`${winnerOpponent}`}>{itemGame.opponent}</span> : ''}
                <span className='time'>{dateStr}</span>
            </div>
        )
    }
}

export default Card