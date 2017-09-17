import fetch from 'isomorphic-fetch'
import { compose } from 'redux'

export const fetchAll = uri => {
    return fetch(uri, {
        method: 'GET',
        headers: {
			'Content-Type': 'application/json'
        }
    }).then(
        response => response.json(),
        error => console.log('An error has occured', err)
    )
}

export const fetchSingle = (uri, id) => {
    return fetch(`${uri}/${id}`, {
        method: 'GET',
        headers: {
			'Content-Type': 'application/json'
        }
    }).then(
        response => response.json(),
        error => console.log('An error has occured', err)
    )
}

export const fetchPut = (uri, id, body) => {
    return fetch(`${uri}/${id}`, {
        method: 'PUT',
        headers: {
			'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }).then(
        response => response.json(),
        error => console.log('An error has occured', err)
    )
}

export const toArray = obj => {
    return Object.keys(obj).map(k => obj[k])
}

export const toObj = (arr, key = 'id') => {
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
