import fetch from 'isomorphic-fetch'
import {
    fetchAll,
    fetchPut,
    fetchSingle,
    fetchPostFile
} from '../utils/helpers'
import {
    ADD_IMAGE,
    UPDATE_IMAGE,
    DELETE_IMAGE,
    REQUEST_IMAGES,
    REQUEST_IMAGE,
    REQUEST_IMAGE_UPDATE,
    RECIEVE_IMAGES,
    RESET_FETCH
} from '../utils/constants'

const IMAGE_URI = '/api/images'

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

export const requestImages = () => {
    return {
        type: REQUEST_IMAGES
    }
}

export const requestImage = () => {
    return {
        type: REQUEST_IMAGE
    }
}

export const requestImageUpdate = () => {
    return {
        type: REQUEST_IMAGE_UPDATE
    }
}

export const recieveImages = images => {
    return {
        type: RECIEVE_IMAGES,
        images: images
    }
}

export const resetFetch = name => {
    return {
        type: RESET_FETCH,
        name: name
    }
}

export const fetchImages = () => {
    return function(dispatch) {
        dispatch(requestImages())
        return fetchAll(IMAGE_URI).then(json => {
            dispatch(recieveImages(json))
        })
    }
}

export const fetchImage = id => {
    return function(dispatch) {
        dispatch(requestImage())
        return fetchSingle(IMAGE_URI, id).then(json => {
            dispatch(addImage(json))
        })
    }
}

export const fetchPutImage = (id, body) => {
    return function(dispatch, getState) {
        if (!getState().isFetching.updateImage) {
            dispatch(requestImageUpdate())
            return fetchPut(IMAGE_URI, id, body).then(
                json => {
                    dispatch(updateImage(json))
                },
                error => {
                    dispatch(resetFetch('updateImage'))
                    return Promise.resolve()
                }
            )
        }
    }
}

export const fetchPostImage = image => {
    return function(dispatch, getState) {
        const formData = new FormData()
        formData.append('image', image)
        return fetchPostFile(IMAGE_URI, formData).then(json => {
			// wait for the server to create the image this is very ugly right now
			setTimeout(() => {
				dispatch(addImage(json))
			}, 1000)
        })
    }
}
