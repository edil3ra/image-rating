import uuid from 'uuid'
import { ADD_IMAGE, RATE_IMAGE } from '../utils/constants'

export const addImage = title => {
    return {
        type: ADD_IMAGE,
        id: uuid.v4(),
        timestamp: new Date(),
        title: title
    }
}

export const rateImage = (id, rate) => {
    return {
        type: RATE_IMAGE,
        id: id,
        rate: rate
    }
}
