import { createStore, applyMiddleware, compose } from 'redux'
import reducers from '../reducers'
import initialState from './initialState'

const logger = store => next => action => {
    let result
    console.groupCollapsed('dispatching', action.type)
    console.log('prev state', store.getState())
    console.log('action', action)
    result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
	return result
}

const saver = store => next => action => {
    let result = next(action)
    localStorage['redux-store'] = JSON.stringify(store.getState())
    return result
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const storeFactory = () => {
    return createStore(
        reducers,
        localStorage['redux-store']
            ? JSON.parse(localStorage['redux-store'])
            : initialState,
        composeEnhancers(applyMiddleware(logger, saver))
    )
}

export default storeFactory
