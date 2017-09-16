import React from 'react'
import PropTypes from 'prop-types'

const Star = ({ filled, onClick = f => f }) => {
    const onClickHandle = event => {
        event.preventDefault()
        onClick()
    }
    const style = {
        color: filled ? 'red' : 'black'
    }
    return (
        <a className="cursor-hover" onClick={onClickHandle}>
            <i style={style} className="material-icons">
                star
            </i>
        </a>
    )
}

Star.propTypes = {
    filled: PropTypes.bool.isRequired,
    onClick: PropTypes.func
}

export default Star
