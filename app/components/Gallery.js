import React from 'react'
import PropTypes from 'prop-types'
import Image from './Image'

import {
    DEFAULT_GALLERY_IMAGE_WIDTH,
    DEFAULT_GALLERY_IMAGE_HEIGHT
} from '../utils/constants'

const Gallery = ({ images }) => {
    const renderImages = images.map(({ id, filename }) => (
        <Image
            key={id}
            src={'upload/' + filename}
            width={DEFAULT_GALLERY_IMAGE_WIDTH}
            height={DEFAULT_GALLERY_IMAGE_HEIGHT}
        />
    ))

    return <div>{renderImages}</div>
}

Image.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            filename: PropTypes.string,
            originalName: PropTypes.string,
            rating: PropTypes.arrayOf(PropTypes.number)
        })
    )
}

export default Gallery
