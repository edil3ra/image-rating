import React from 'react'
import { fetchImages } from '../utils/helpers'
import { URL_EXAMPLE } from '../utils/constants'
import Drop from './Drop'
import Image from './Image'
import Gallery from './Gallery'

const App = () => {
	const images = [
		{
            "id":1,
            "originalName":"4618786477_b6cea108fb_z.jpg",
            "filename":"bd4feb916aa1f3c0b0d71c009fac4d13",
            "rates":[
                4,
                2
            ]
        },
		{
			"id":2,
            "originalName":"36674393256_0bf9e8b68f_m.jpg",
            "filename":"a7d738a1f6ed06c5e8a1eb0e82d36117",
            "rates":[
                2,
                4,
                1,
                1,
                4,
                5,
                2,
                1
            ]
        },
	]

	
    return (
        <div className="container">
            <Drop onAccepted={f => f} onRejected={f => f} />
			<Gallery images={images}/>
        </div>
    )
}

export default App
