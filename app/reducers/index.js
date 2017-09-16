import { combineReducers, compose } from 'redux'
import { ADD_IMAGE, UPDATE_IMAGE, DELETE_IMAGE } from '../utils/constants'
import { toArray, toObj, wrapEntity, omit } from '../utils/helpers'

const entities = (state = {}, action) => {
    switch (action.type) {
        case ADD_IMAGE:
        case UPDATE_IMAGE:
        case DELETE_IMAGE:
            return { ...state, images: images(state.images, action) }
        default:
            return state
    }
}

const images = (state = {}, action) => {
    switch (action.type) {
        case ADD_IMAGE:
            return wrapEntity(state, array => {
                return [...array, action.image]
            })

        case UPDATE_IMAGE:
            return { ...state, ...{ [action.image.id]: action.image } }
        case DELETE_IMAGE:
            return omit(state, action.id)
        default:
            return state
    }
}

const displayImages = (state = [], action) => {
    switch (action.type) {
        case ADD_IMAGE:
            return [...state, action.image.id]
        case DELETE_IMAGE:
            return state.filter(image => image !== action.id)
        default:
            return state
    }
}

export default combineReducers({
    entities: entities,
    displayImages: displayImages
})
