import { combineReducers, compose } from 'redux'
import {
    ADD_IMAGE,
    UPDATE_IMAGE,
    DELETE_IMAGE,
    REQUEST_IMAGES,
    REQUEST_IMAGE_UPDATE,
    RECIEVE_IMAGES,
	RESET_FETCH
} from '../utils/constants'
import { toArray, toObj, wrapEntity, omit, addIfNotExist } from '../utils/helpers'

const entities = (state = {}, action) => {
    switch (action.type) {
        case ADD_IMAGE:
        case UPDATE_IMAGE:
        case DELETE_IMAGE:
        case RECIEVE_IMAGES:
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
        case RECIEVE_IMAGES:
            return toObj(action.images)
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
        case RECIEVE_IMAGES:
            return action.images.map(image => image.id)
        default:
            return state
    }
}

const isFetching = (
    state = { fetchImages: false, updateImage: false },
    action
) => {
    switch (action.type) {
        case REQUEST_IMAGES:
            return { ...state, fetchImages: true }
        case RECIEVE_IMAGES:
            return { ...state, fetchImages: false }
        case REQUEST_IMAGE_UPDATE:
            return { ...state, updateImage: true }
        case UPDATE_IMAGE:
            return { ...state, updateImage: false }
        case RESET_FETCH:
            return {
                ...state,
                [action.name]: false
            }
        default:
            return state
    }
}

const user = (state = { imagesRatedId: [] }, action) => {
    switch (action.type) {
        case UPDATE_IMAGE:
            return {
                ...state,
                imagesRatedId: addIfNotExist(state.imagesRatedId, action.image.id) 
            }
        default:
            return state
    }
}

export default combineReducers({
    user: user,
    entities: entities,
    displayImages: displayImages,
    isFetching: isFetching
})
