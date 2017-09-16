import React from 'react'
import PropTypes from 'prop-types'
import Img from 'react-image'

const Image = ({ src, width, height }) => {
    return <Img width={width} height={height} src={src} />
}

Image.propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired
}

export default Image
