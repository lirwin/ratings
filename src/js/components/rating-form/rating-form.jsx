import React from 'react';

export default class RatingForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title : '',
            text: ''
        }
    }

    handleTitleChange(e) {
        this.setState({title: e.target.value});
    }

    handleTextChange(e) {
        this.setState({text: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        var title = this.state.title.trim();
        var text = this.state.text.trim();

        //this.props.onRatingSubmit({title: title, text: text});
        this.setState({title: '', text: ''});

        var date = Date.now();

        this.props.onRatingSubmit({
                title: title,
                text: text,
                id: this.props.id,
                numStars: this.props.numStars,
                date: date
            }
        );

        this.props.hideForm();
    }

    cancelSubmit(e){
        e.preventDefault();

        this.setState({title: '', text: ''});

        this.props.onRatingSubmit({
            title: '',
            text: '',
            id: this.props.id,
            numStars: '0',
            date: ''
        });

        this.props.hideForm();

    }


    render() {
        return (
            <form className="ratingForm" onSubmit={this.handleSubmit.bind(this)}>
                <textarea placeholder="Rating Comments (Optional)"
                      value={this.state.text}
                      onChange={this.handleTextChange.bind(this)}
                />
                <input
                    type="text"
                    placeholder="Headline for Your Rating"
                    value={this.state.title}
                    onChange={this.handleTitleChange.bind(this)}
                    />
                <input type="submit" value="Post" />
                <button onClick={this.cancelSubmit.bind(this)}>Cancel</button>
            </form>
        );
    }
}