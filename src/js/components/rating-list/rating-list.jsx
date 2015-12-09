import React from 'react';
import Rating   from '../rating/rating.jsx';

export default class RatingList extends React.Component {
    render() {
        var onRatingSubmit = this.props.onRatingSubmit;
        var ratingNodes = this.props.data.map(function(rating) {
            return (
                <Rating key={rating.id}
                        id={rating.id}
                        image={rating.image}
                        brand={rating.brand}
                        name={rating.name}
                        author={rating.author}
                        numStars={rating.numStars}
                        title={rating.title}
                        onRatingSubmit={onRatingSubmit}
                        date={rating.date}
                    >
                    {rating.text}
                </Rating>
            );
        });

        return (
            <div className="ratingList">
                {ratingNodes}
            </div>
        );
    }
}