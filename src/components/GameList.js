import React, { Component} from 'react'
import Card from './Card'
import './css/gameList.css'

class GameList extends Component {
    
    constructor(props){
        super(props)        
    }    

    render() {  

        const { games, handleClick, handleAddClick, userName } = this.props

        let listItems = games.map((itemGame) => (
            <li key={itemGame.gameToken} onClick={handleClick.bind(this, itemGame.gameToken)} >
                <Card itemGame = {itemGame} />           
            </li>))
        
        return (
            <div>
                <div className='list-gamer-info'>
                    <span>{userName}</span>                    
                </div>
                <ul className='game-list'>
                    {listItems}
                </ul>
                <div className='add-game' onClick={handleAddClick.bind(this)}>+</div>
            </div>
        )
    }    
}

export default GameList