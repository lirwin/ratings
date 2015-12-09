import React    from 'react';
import ReactDOM from 'react-dom';
import $        from 'jquery';
import _        from 'underscore';
import RatingList         from '../rating-list/rating-list.jsx';

import ReactSelectize from 'react-selectize';

import AddBeer        from '../add-beer/add-beer.jsx';

var MultiSelect = ReactSelectize.MultiSelect;

var findDOMNode = ReactDOM.findDOMNode;

export default class RatingBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    loadRatingsFromServer() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    handleRatingSubmit(rating) {

        function replaceRatingInData(rating, ratings) {
            for (var i = 0; i < ratings.length; i++) {
                var el = ratings[i];
                if (rating.id === el.id) {
                    _.extend(ratings[i], rating);
                    break;
                }
            }

        }

        var ratings = this.state.data;

        replaceRatingInData(rating, ratings);

        // Optimistically set an id on the new rating. It will be replaced by an
        // id generated by the server. In a production application you would likely
        // not use Date.now() for this and would have a more robust system in place.

        this.setState({data: ratings});

        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: {
                ratings: ratings
            },
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({data: ratings});
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }


    componentDidMount() {
        this.loadRatingsFromServer.bind(this)();
        setInterval(this.loadRatingsFromServer.bind(this), this.props.pollInterval);
    }


    render() {

        return (
            <div>
                <AddBeer url='/api/beers'  />
                <div className="ratingBox">
                    <h1>My Beer Ratings</h1>
                    <RatingList data={this.state.data} onRatingSubmit={this.handleRatingSubmit.bind(this)} />
                </div>
            </div>
        );
    }
}