import React from 'react'
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types'

const Drop = ({ onAccepted, onRejected }) => {
    const onDrop = (accepted, rejected) => {
        if (rejected.length !== 0) {
            onRejected(rejected[0])
        } else {
            onAccepted(accepted[0])
        }
    }

    const style = {
        width: '300px',
        height: '300px',
        borderWidth: '10px',
        borderColor: 'rgb(102, 102, 102)',
        borderStyle: 'dashed',
        borderRadius: '10px'
    }

    return (
        <div className="">
            <Dropzone
                className="dropzone z-depth-2"
                style={{}}
                disablePreview={false}
                multiple={false}
                onDrop={onDrop}
                accept="image/*"
            >
                <p style={{ fontSize: '1.4em' }} className="center-align">
                    Drop your image here
                </p>
            </Dropzone>
        </div>
    )
}

Drop.propTypes = {
    onAccepted: PropTypes.func.isRequired,
    onRejected: PropTypes.func.isRequired
}

export default Drop
