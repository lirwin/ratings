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
                <div className="ratingBox">
                    <h1>My Beer Ratings</h1>
                    <AddBeer url='/api/beers'  />
                    <div className="clear"></div>
                    <RatingList data={this.state.data} onRatingSubmit={this.handleRatingSubmit.bind(this)} />
                </div>
            </div>
        );
    }
}