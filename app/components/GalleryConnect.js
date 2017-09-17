import React from 'react'
import Gallery from './Gallery'
import { connect } from 'react-redux'
import { fetchPutImage } from '../actions'

const mapStateToProps = (state, props) => {
    const images = state.entities.images
    const imagesIndexs = state.displayImages
    const imagesGallery = imagesIndexs.map(id => images[id]).reverse()
    return { images: imagesGallery }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        rateImage: (id, prevRates, rateToAdd) => {
            dispatch(fetchPutImage(id, {rates: [...prevRates, rateToAdd]}))
        }
    }
}

const GalleryConnect = connect(mapStateToProps, mapDispatchToProps)(Gallery)

export default GalleryConnect
