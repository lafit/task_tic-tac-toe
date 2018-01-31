import React, { Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { loadUserList, setUser } from '../AC/userAction'
import { initGame } from '../AC/gameAction.js'
import userReducer from '../reducer/userReducer'
import gameReducer from '../reducer/gameReducer'

class LoginTestContainer extends Component {
    
    componentDidMount() {
        this.props.loadUserList()
    }

    render() {
        const {loadingList, users} = this.props
        
        if (loadingList) return <h2>Loading...</h2>

        const listItems = users.map((user) => (
            <li key={user.id} onClick = {this.handlerClick.bind(this, user)}>
                <Link to='/'>{user.name}</Link>
            </li>
        ))
        return (
            <ul>{listItems}</ul>
        )
    }
    handlerClick = (user) => {

        this.props.setUser(user)
        if(user.gameToken) {
            this.props.initGame(user.gameToken, user)
            user.gameToken = this.props.gameData.gameToken
            this.props.setUser(user)
        }
    }

}

function mapStateToProps(state) {
    const {userReducer, gameReducer} = state

    return {
        loading: userReducer.get('loading'),
        users: userReducer.get('users'),
        gameData: gameReducer.get('gameData')
        
    }
    
}

export default connect(mapStateToProps, { loadUserList, setUser, initGame })(LoginTestContainer)