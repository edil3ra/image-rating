import { combineReducers } from 'redux'
import { ADD_IMAGE, RATE_IMAGE } from '../utils/constants'

const entities = (state = {}, action) => {
    switch (action.type) {
        case ADD_IMAGE:
        case RATE_IMAGE:
            return images(state.images)
        default:
            return state
    }
}

const images = (state = [], action) => {
    switch (action.type) {
        case ADD_IMAGE:
            return [...state, ...image({}, action)]
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
                : { ...state, rating: action.rating }
        default:
            return state
    }
}

const displayImages = (state = [], action) => {
	switch (action.type) {
		default:
		return state
	}
}



export default combineReducers({
    entities: entities,
	displayImages: displayImages,
})
