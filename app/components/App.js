import React from 'react'
import { fetchImages } from '../utils/helpers'
import { URL_EXAMPLE } from '../utils/constants'
import Drop from './Drop'
import Image from './Image'
import Gallery from './Gallery'
window.jQuery = window.$ = require('jquery')


const App = () => {
    const images = [
        {
            id: 1,
            originalname: '4618786477_b6cea108fb_z.jpg',
            filename: 'bd4feb916aa1f3c0b0d71c009fac4d13',
            rates: [4, 2]
        },
        {
            id: 2,
            originalname: '36674393256_0bf9e8b68f_m.jpg',
            filename: 'a7d738a1f6ed06c5e8a1eb0e82d36117',
            rates: [2, 4, 1, 1, 4, 5, 2, 1]
        },

        {
            id: 3,
            originalname: '5503173238_061a4e233d_m.jpg',
            filename: '1a37e19a77590b3174aa28d5e29771e9',
            rates: [5, 1, 4]
        },
        {
            id: 4,
            originalname: '36676372256_9357fd5f04_z.jpg',
            filename: '20b6ca1dc9ba57fdb6dd37dd301c1a61',
            rates: [4, 1, 1, 5, 5, 4]
        },
        {
            id: 5,
            originalname: '36674393436_4ea3a9bc5b_z.jpg',
            filename: '0788fbfb34f47bcbe4ad37c4024a1104',
            rates: [2]
        },
        {
            id: 6,
            originalname: '36325395070_6c23299b43_z.jpg',
            filename: 'a53e1b1b53257c3bb045daf65946021c',
            rates: [5, 5, 3, 4, 2, 1, 2]
        },
        {
            id: 7,
            originalname: '36677993176_07857a65fd_z.jpg',
            filename: '4df5b631a8a1fdd6a5b3bd1a15a9422c',
            rates: [5, 4, 1]
        },
        {
            id: 8,
            originalname: '24888793474_0c72120d22_m.jpg',
            filename: '757f84130554c6b313d3f7d4c9b3fe34',
            rates: [5, 3, 1, 5, 4, 1]
        },
        {
            id: 9,
            originalname: '36585352871_2095afa289_m.jpg',
            filename: '047c0ee17ee79f72d41afa7edae2eeec',
            rates: [2, 2, 2, 5, 1]
        },
        {
            id: 10,
            originalname: '35909960083_468dfe33d4_z.jpg',
            filename: '5cab1ed7f038207d21a85ee95365f2fe',
            rates: []
        }
    ]

    return (
        <div className="container">
            <Drop onAccepted={f => f} onRejected={f => f} />
            <Gallery images={images} />

        </div>
    )
}

export default App
