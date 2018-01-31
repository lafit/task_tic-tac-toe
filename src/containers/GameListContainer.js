import React, { Component} from 'react'
import GameList from '../components/GameList'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { loadGameList } from '../AC/gameListAction'
import { initGame, addGame } from '../AC/gameAction'
import gameListReducer from './../reducer/gameListReducer'
import userReducer from './../reducer/userReducer'
import { URL_GAME, URL_LOGIN } from './../constantsUrl'

class Games extends Component {
    
    constructor(props) {
        super(props)        
    }

    state = {
        redirectPlayingField : false
    }

    componentDidMount() {
        this.props.loadGameList()        
    }

    render() {
        const { redirectPlayingField } = this.state;
        const { games, loading, user } = this.props

        if(!user || !user.id) {
            return <Redirect to={URL_LOGIN} />
        }

        if (redirectPlayingField) {            
            return <Redirect to={URL_GAME} />
        }
        
        if (loading) return <h2>Loading...</h2>
        return <GameList games = {games} handleClick = {this.handleClick} handleAddClick = {this.handleAddClick} userName={user.name} />
    }
    
    handleClick = (gameToken) => {
        this.props.initGame(gameToken, this.props.user)
        this.setState({redirectPlayingField: true})
    }

    handleAddClick = (gameToken) => {
        this.props.addGame(gameToken, this.props.user)
        this.setState({redirectPlayingField: true})
    }
}


function mapStateToProps(state) {
    const {gameListReducer, userReducer} = state

    return {
        loading: gameListReducer.get('loading'),
        games: gameListReducer.get('games'),
        user: userReducer.get('user')
    }
    
}

export default connect(mapStateToProps, { loadGameList, initGame, addGame })(Games)