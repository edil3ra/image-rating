import React from 'react'
import PropTypes from 'prop-types'
var $ = require('jquery')



class Image extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		$('.materialboxed').materialbox()
	}
	
	render() {
		const {width, height, src} = this.props
		return <img className="materialboxed" width={width} height={height} src={src} />		
	}
}


Image.propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired
}

export default Image
