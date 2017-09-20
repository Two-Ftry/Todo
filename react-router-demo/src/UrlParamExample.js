/**
 * Created by jfhuang on 17/9/19.
 */
import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';

const Child = (props) => (
    <div>{props.match.params.id}</div>
);



class UrlParamExample extends React.Component {
    render () {
        return (
            <Router>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/erp">Erp</Link></li>
                        <li><Link to="/graph">Graph</Link></li>
                    </ul>
                    <Route path="/:id" component={Child} />
                </div>
            </Router>
        );
    }
}

export default UrlParamExample;