import React from 'react';
import ReactSelectize from 'react-selectize';
import $ from 'jquery';

var MultiSelect = ReactSelectize.MultiSelect;

export default class AddBeer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            beers: [],
            selectedBeers: []
        }
    }

    // component-will-mount :: a -> Void
    componentWillMount(){
        var self = this;
        this.req = $.get(this.props.url).done(function(beers){

            var parsedBeers = beers.map(function(beer){
                return {label: beer.name, value: beer};
            });

            self.setState({beers: parsedBeers}, function(){
                self.refs.select.highlightFirstSelectableOption();
            });
        }).always(function(){
            delete self.req;
        });
    }

    // render :: a -> ReactElement
    render(){
        var self = this;
        return <div>
            {function(){
                if (self.state.selectedBeers.length > 0)
                    return <div style = {{margin: 8}}>
                        <span>you selected: </span>
                        <span style = {{fontWeight: "bold"}}>
                            {self.state.selectedBeers.map(function(selectedBeer){
                                return selectedBeer.label;
                            }).join(", ")}
                        </span>
                    </div>
            }()}



            <MultiSelect
                ref = "select"
                placeholder = "Select Beer"
                options = {this.state.beers}
                value = {this.state.selectedBeers}

                // onValueChange :: Item -> (a -> Void) -> void
                onValuesChange = {function(selectedBeers, callback){
                    self.setState({selectedBeers: selectedBeers}, callback);
                }}

                // renderNoResultsFound :: a -> ReactElement
                renderNoResultsFound = {function() {
                    return <div className = "no-results-found">
                        {!!self.req ? "loading beers ..." : "No results found"}
                    </div>
                }}
                />
        </div>
    }
}