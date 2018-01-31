import { createStore, applyMiddleware, compose } from 'redux'
import reducer from '../reducer'
//import logger from '../middlewares/logger'
import api from '../middlewares/api'
import thunk from 'redux-thunk'

const enhancer = compose(
    applyMiddleware(thunk, api /*, logger*/),
    window.devToolsExtension ? window.devToolsExtension() : f => f
)

const store = createStore(reducer, {}, enhancer)
window.store = store

export default store