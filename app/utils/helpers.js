import fetch from 'isomorphic-fetch'
import { compose } from 'redux'

export const fetchJson = (url) => {
    return fetch(url).then(
        response => response.json(),
        error => console.log('An error has occured', err)
    )
}

export const toArray = obj => {
    return Object.keys(obj).map(k => obj[k])
}

export const toObj = (arr, key) => {
    return Object.assign(...arr.map(d => ({ [d[key]]: d })))
}

export const omit = (obj, key) => {
    let res = Object.assign({}, obj)
    delete res[key]
    return res
}

export const wrapEntity = (obj, callback = f => f, key = 'id') => {
    return toObj(callback(toArray(obj)), key)
}
