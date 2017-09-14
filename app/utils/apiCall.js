import fetch from 'isomorphic-fetch'




export const imageFetch = url => {
	return fetch(url).then(response => {
		return response.blob()
	})
}
