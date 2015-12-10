import React from 'react';
import StarList   from '../star-list/star-list.jsx';
import RatingForm          from '../rating-form/rating-form.jsx';
import marked from 'marked';

export default class Rating extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showForm: false
        }
    }

    onClickHandler(numStars) {
        this.setState({
                showForm: true
            }
        );

        var date = Date.now();

        this.props.onRatingSubmit({
            id: this.props.id,
            numStars: numStars,
            date: date
        });
    }

    formatDate(date) {
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        var d = new Date(date),
            month = monthNames[d.getMonth()],
            day = '' + d.getDate(),
            year = d.getFullYear();

        return month + ' ' + day + ', ' + year;
    }

    hideForm(){
        this.setState({
            showForm: false
        });
    }

    rawMarkup() {
        var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
        return { __html: rawMarkup };
    }

    render() {
        var date = this.props.date ? this.formatDate(parseInt(this.props.date, 10)) : null;

        var text = this.props.children ? <span dangerouslySetInnerHTML={this.rawMarkup()} /> : null;
        var title = this.props.title ? <h3 className='title'>{this.props.title}</h3> : null;

        var posted = this.props.date ? <h4>Posted on {date.toString()}</h4> : null;

        var imageStyle = this.props.image ? {
            'backgroundImage': 'url(' + this.props.image + ')'
        } : {};

        var review = this.state.showForm ? <RatingForm id={this.props.id}
                                                           onRatingSubmit={this.props.onRatingSubmit}
                                                           numStars={this.props.numStars}
                                                           hideForm={this.hideForm.bind(this)}
                                                           title={this.props.title}
                                                           text={this.props.text}
                                            /> : <div>{title} {text}</div>;

        return (
            <div className="rating">
                <div className="item-image"  style={imageStyle} />
                <div className="item-content">
                    <h2 className="item-name">
                        {this.props.name} <span className="item-brand">made by <a href='' >{this.props.brand}</a></span>
                    </h2>

                    {posted}
                    <StarList numStars={this.props.numStars} onClick={this.onClickHandler.bind(this)} />

                    {review}

                </div>
                <div className="clear"></div>
            </div>
        );
    }
}