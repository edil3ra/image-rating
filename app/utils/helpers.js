import fetch from 'isomorphic-fetch'



// export const fetchImages = url => {
// 	return fetch(url).then(response => {
// 		return response.json()
// 	})
// }


export const fetchImages = () => {
	return fetch('api/images/').then(response => {
		return response
	})
}
