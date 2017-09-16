import React from 'react'
import PropTypes from 'prop-types'
import Star from './Star'

const Stars = ({ starCount, filledCount, onClick = f => f }) => {
    const renderStars = Array(starCount)
        .fill()
        .map((_, index) => {
			console.log(index)
            return (
                <div key={index} className="left">
                    <Star filled={index < filledCount} />
                </div>
            )
        })

    return <div style={{ overflow: 'hidden' }}>{renderStars}</div>
}

Stars.propTypes = {
    starCount: PropTypes.number.isRequired,
    filledCount: PropTypes.number.isRequired,
    onClick: PropTypes.func
}

export default Stars
