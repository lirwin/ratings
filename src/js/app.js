/**
 *
 * Author:  Lisa Irwin
 *
 * Title:  Ratings App
 * Date:  Dec. 6, 2015
 *
 * Credit:  Built this app starting with React Tutorial: Comments App
 * https://facebook.github.io/react/docs/tutorial.html
 *
 * Credit: images/stars=sprite.png
 * from https://images-na.ssl-images-amazon.com/images/G/01/x-locale/common/customer-reviews/RYP_mobile_spritex2-v8._V316463287_.png
 */


import React            from 'react';
import Reflux           from 'reflux';
import {default as mix} from 'react-mixin';
import Router, {Route, DefaultRoute, RouteHandler} from 'react-router';
import { history } from 'react-router/lib/HashHistory';
import 'babel/polyfill';


import RatingBox         from './components/rating-box/rating-box.jsx';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    render() {
        return (
            <div id="main">
                <Router history={history}>
                    <Route path="/"
                           component={RatingBox}
                           url="/api/ratings"
                           pollInterval={2000} />

                </Router>
            </div>
        )
    }
}

React.render(<App />, document.body);
