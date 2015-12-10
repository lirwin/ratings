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
import ReactDOM           from 'react-dom';

import Reflux           from 'reflux';
import 'babel/polyfill';

import RatingBox         from './components/rating-box/rating-box.jsx';



ReactDOM.render(
    <RatingBox url="/api/ratings" pollInterval={2000} />,
    document.getElementById('content')
);