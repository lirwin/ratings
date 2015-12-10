import React from 'react';
import ReactSelectize from 'react-selectize';
import $ from 'jquery';

var SimpleSelect = ReactSelectize.SimpleSelect;

export default class AddBeer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            beers: [],
            beer: undefined
        }
    }

    addBeerHandler(beer, callback){

        this.setState({beer: beer});
        callback();


        $.ajax({
            url: '/api/beers',
            dataType: 'json',
            type: 'POST',
            data: beer.value,
            success: function(data) {
                console.log('added beer: ' + beer);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

    }

    componentWillMount(){
        var self = this;

        this.req = $.get(this.props.url).done(function(beers){
                var parsedBeers = beers.map(function(beer) {
                    return({label: beer.name, value: beer});
                });

                self.setState({beers: parsedBeers}, function(){
                self.refs.select.highlightFirstSelectableOption();
            });
        }).always(function(){
            delete self.req;
        });
    }

    render(){
        var self = this;
        return <div>
            <SimpleSelect
                ref = "select"
                placeholder = "Add Beer"
                options = {this.state.beers}
                value = {this.state.beer}

                onValueChange = {this.addBeerHandler.bind(this)}

                renderNoResultsFound = {function() {
                    return <div className = "no-results-found">
                        {!!self.req ? "loading beers ..." : "No results found"}
                    </div>
                }}
                />

        </div>
    }
}