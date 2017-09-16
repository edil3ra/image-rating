import { ADD_IMAGE, UPDATE_IMAGE, DELETE_IMAGE } from '../utils/constants'

export const addImage = image => {
    return {
        type: ADD_IMAGE,
		image: image
    }
}

export const updateImage = image => {
    return {
        type: UPDATE_IMAGE,
		image: image
    }
}

export const deleteImage = id => {
    return {
        type: DELETE_IMAGE,
		id: id
    }
}

