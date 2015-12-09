import React from 'react';

export default class StarList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            active: -1 //index for highest active index in startNodes array, zero-based
        }
    }

    clickHandler(index) {
        //console.log(index);

        this.setState({
            active: index
        });

        this.props.onClick(index + 1);

    }

    mouseEnterHandler(index) {
        //console.log(index);

        this.setState({active: index });

    }

    mouseLeaveHandler() {
        this.setState({active: -1});
    }


    render() {
        var starNodes = [];

        for (var i = 0; i < 5; i++) {
            var displayRating = i + 1;

            var highlight = i < this.props.numStars ? 'highlight' : '';
            var hover = i <= this.state.active ? 'hover' : '';

            starNodes.push(<div className={"big-star clickable rating-" + displayRating + " " + highlight + " " + hover}
                                key={i}
                                onMouseEnter={this.mouseEnterHandler.bind(this, i)}
                                onMouseLeave={this.mouseLeaveHandler.bind(this, i)}
                                onClick={this.clickHandler.bind(this, i)}

                >

            </div>);
        }

        return (
            <div className="stars-container">
                {starNodes}
                <div className="clear"></div>
            </div>
        );
    }
}