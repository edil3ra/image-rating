import { combineReducers } from 'redux'
import { ADD_IMAGE, RATE_IMAGE } from '../utils/constants'

const images = (state = [], action) => {
    switch (action.type) {
        case ADD_IMAGE:
            return [ ...state, ...image({}, action) ]
        case RATE_IMAGE:
            return state.map(item => image(item, action))
        default:
            return state
    }
}

const image = (state = {}, action) => {
    switch (action.type) {
        case ADD_IMAGE:
            return {
                id: action.id,
                title: action.title,
                timestamp: action.timestamp || new Date(),
                rating: 0
            }
        case RATE_IMAGE:
            return state.id !== action.id
                ? state
                : {...state, rating: action.rating}
        default:
            return state
    }
}


export default combineReducers({ images: images })
