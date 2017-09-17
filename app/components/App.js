import React from 'react'
import { fetchImages } from '../utils/helpers'
import { URL_EXAMPLE } from '../utils/constants'
import Drop from './Drop'
import Image from './Image'
import Gallery from './Gallery'
import GalleryConnect from './GalleryConnect'
import DropConnect from './DropConnect'
window.jQuery = window.$ = require('jquery')



const App = () => {
    return (
        <div className="container">
            <DropConnect onAccepted={f => f} onRejected={f => f} />
            <GalleryConnect />
        </div>
    )
}

export default App
