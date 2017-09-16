import fetch from 'isomorphic-fetch'
import { fetchJson } from '../utils/helpers'
import {
    ADD_IMAGE,
    UPDATE_IMAGE,
    DELETE_IMAGE,
    REQUEST_IMAGES,
    RECIEVE_IMAGES
} from '../utils/constants'

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

export const recieveImages = images => {
    return {
        type: RECIEVE_IMAGES,
        images: images
    }
}

export const fetchImages = () => {
    return function(dispatch) {
        dispatch(requestImages())
        return fetchJson('api/images').then(json => {
			console.log(json)
            dispatch(recieveImages(json))
        })
    }
}
