import { combineReducers, compose } from 'redux'
import { ADD_IMAGE, RATE_IMAGE, RECIEVE_IMAGES } from '../utils/constants'
import { toArray, toObj, wrapEntity } from '../utils/helpers'

const entities = (state = {}, action) => {
    switch (action.type) {
        case RECIEVE_IMAGES:
        case ADD_IMAGE:
        case RATE_IMAGE:
            return { ...state, images: images(state.images, action) }
        default:
            return state
    }
}

const images = (state = {}, action) => {
    switch (action.type) {
        case RECIEVE_IMAGES:
            return state

        case ADD_IMAGE:
            return wrapEntity(state, array => {
                return [...array, image({}, action)]
            })

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
                originalName: action.oniginalName,
                timestamp: action.timestamp,
                rates: []
            }
        case RATE_IMAGE:
            return state.id !== action.id
                ? state
                : { ...state, rates: [...state.rates, action.rate] }
        default:
            return state
    }
}

const displayImages = (state = [], action) => {
    switch (action.type) {
        case ADD_IMAGE:
            return [...state, action.id]
        default:
            return state
    }
}

export default combineReducers({
    entities: entities,
    displayImages: displayImages
})
