import React from 'react'
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types'

const Drop = ({ onAccepted, onRejected }) => {
	const onDrop = (accepted, rejected)  => {
		if(rejected) {
			console.info(rejected)
			onRejected(rejected)
		} else {
			console.info(accepted)
			onAccepted(accepted)
		}
	}

    return (
        <Dropzone
            disablePreview={true}
            multiple={false}
            onDrop={onDrop}
            accept="image/*"
        />
    )
}

Drop.propTypes = {
    onAccepted: PropTypes.func.isRequired,
    onRejected: PropTypes.func.isRequired,
}


export default Drop
