import React from 'react'
import PropTypes from 'prop-types'
import Image from './Image'
import Star from './Star'

import {
    DEFAULT_GALLERY_IMAGE_WIDTH,
    DEFAULT_GALLERY_IMAGE_HEIGHT,
    DEFAULT_COLUMN_ROW_SIZE
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

    const renderImage = ({ filename }) => {
        return (
            <Image
                src={'upload/' + filename}
                width={DEFAULT_GALLERY_IMAGE_WIDTH}
                height={DEFAULT_GALLERY_IMAGE_HEIGHT}
            />
        )
    }

    const renderStar = ({ filled }) => {
        return <Star filled={filled} />
    }

    // const renderGallery = ({ id, filename, rates }) => {
    //     return (
    //         <div key={id} className={DEFAULT_GALLERY_COLUMN}>
    //             {renderImage({ filename: filename })}
    //             {renderStar({ filled: true })}
    //         </div>
    //     )
    // }

    const renderGallery = images.map(({ id, filename, rates }) => {
        const column = `col s${DEFAULT_COLUMN_ROW_SIZE}`
        return (
            <div key={id} className={column}>
                <div className="card">
                    <div className="card-image">
                        <div>{renderImage({ filename: filename })}</div>
                    </div>
                    <div className="card-content">
                        <div>{renderStar({ filled: true })}</div>
                        <div>{renderStar({ filled: true })}</div>
                        <div>{renderStar({ filled: true })}</div>
                        <div>{renderStar({ filled: true })}</div>
                        <div>{renderStar({ filled: true })}</div>
                    </div>
                </div>
            </div>
        )
    })

    return <div className="row">{renderGallery}</div>
}

Image.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            filename: PropTypes.string,
            originalName: PropTypes.string,
            rates: PropTypes.arrayOf(PropTypes.number)
        })
    )
}

export default Gallery
