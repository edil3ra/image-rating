import React from 'react'
import ReactDOM from 'react-dom'
import Image from 'react-image'
import { imageFetch } from '../utils/apiCall'
import { URL_EXAMPLE } from '../utils/constants'
import Dropzone from 'react-dropzone'

export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.onDrop = this.onDrop.bind(this)
    }

    onDrop(accepted, rejected) {
        console.log(accepted)
        console.log(rejected)
    }

    render() {
        return (
            <div className="container">
                <Dropzone
                    disablePreview={true}
                    multiple={false}
                    onDrop={this.onDrop}
                    accept="image/*"
                />
                <Image src={this.path} alt="some text" />
            </div>
        )
    }
}
