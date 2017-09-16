import React from 'react'
import PropTypes from 'prop-types'


const Image = ({ src, width, height }) => {
    return <img className="materialboxed" width={width} height={height} src={src} />
}

Image.propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired
}

export default Image
