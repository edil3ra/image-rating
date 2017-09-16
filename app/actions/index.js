import { ADD_IMAGE, RATE_IMAGE } from '../utils/constants'

export const addImage = (id, originalName, filename, timestamp) => {
    return {
        type: ADD_IMAGE,
        id: id,
        filename: filename,
        originalName: originalName,
        timestamp: timestamp,
    }
}

export const rateImage = (id, rate) => {
    return {
        type: RATE_IMAGE,
        id: id,
        rate: rate
    }
}



function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}
