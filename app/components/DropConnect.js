import React from 'react'
import Drop from './Drop'
import { connect } from 'react-redux'
import { fetchPostImage } from '../actions'

const mapStateToProps = (state, props) => {
	return {}
}

const mapDispatchToProps = (dispatch, props) => {
    return {
		onAccepted: (image) => {
			// console.log(image)
			dispatch(fetchPostImage(image))
		},
		onRejected: (image) => {
			
		}
    }
}

const DropConnect = connect(mapStateToProps, mapDispatchToProps)(Drop)

export default DropConnect
