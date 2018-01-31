import React, { Component, PropTypes } from 'react'
import { Route } from 'react-router-dom'
import ApiQuery from './ApiQuery'
import Head from '../components/Head'
import GameListContainer from './GameListContainer'
import GameContainer from './GameContainer';
import LoginContainer from './LoginContainer'
import LoginTestContainer from './LoginTestContainer'
import { URL_GAME_LIST, URL_GAME, URL_LOGIN} from './../constantsUrl'
import '../main.css'

class MainContent extends Component {
    render() {
        return (
            <div className="main-contant">
                <ApiQuery />
                <Head />
                <Route exact  path={URL_GAME_LIST} component={GameListContainer} />
                <Route path={URL_GAME} component={GameContainer} />
                {/*<Route path='/login/' component={LoginContainer} />*/}
                <Route path={URL_LOGIN} component={LoginTestContainer} />
            </div>
        )
    }
}

export default MainContent