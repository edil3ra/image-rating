import fetch from 'isomorphic-fetch'
import { compose } from 'redux'



export const fetchImages = () => {
	return fetch('api/images/').then(response => {
		return response
	})
}


export const toArray = obj => {
	return Object.keys(obj).map((k) => obj[k])
}


export const toObj = (arr, key) => {
	return Object.assign(...arr.map(d => ({[d[key]]: d})))
}


export const wrapEntity = (obj, callback = f => f, key='id') => {
	return toObj(callback(toArray(obj)), key)
}
