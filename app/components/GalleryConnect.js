import React from 'react'
import Gallery from './Gallery'
import { connect } from 'react-redux'

const mapStateToProps = (state, props) => {
    const images = state.entities.images
    const imagesIndexs = state.displayImages
    const imagesGallery = imagesIndexs.map(id => images[id])
	
    return { images: imagesGallery }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        rateImage: (id, rate) => {
            console.log(id, rate)
        }
    }
}

const GalleryConnect = connect(mapStateToProps, mapDispatchToProps)(Gallery)

export default GalleryConnect
