/**
 * Created by jfhuang on 17/9/19.
 */
import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    withRouter
} from 'react-router-dom';
const Home = () => (<div>Home</div>);
const About = () => (<div>About</div>);
// class CustomLinkCom extends Component {
//     render () {
//         const isActive = this.props.location.pathname === this.props.to;
//         return (
//             <Link to={this.props.to}>{isActive ? '>' : ''}{this.props.name}</Link>
//         );
//     }
// }
// const CustomLink = withRouter(CustomLinkCom);

const CustomLink = ({ to, name }) => {
    return (
        <Route path={to} children={({ match }) => {
            console.log('@@@match', match);
            return (
                <div className={match ? 'active' : ''}>
                    {match ? '>' : ''}<Link to={to}>{name}</Link>
                </div>
            );
        }}>
        </Route>
    );
};

class RouterChild extends Component {
    render () {
        return (
            <div>router children</div>
        );
    }
}

const getConfirmation = (message, callback) => {
    // const allowTransition = window.confirm(message)
    callback('0000')
};

class CustomLinkExample extends Component {
    handleConfirmation (result) {
        // todo something
        console.log(result);
    }
    render () {
        return (
            <Router basename="connecterp-lapp"
                getUserConfirmation={getConfirmation('111', this.handleConfirmation)}
                children={RouterChild}
            >
                <div>
                    <ul>
                        <li><CustomLink to="/home" name="Home" /></li>
                        <li><CustomLink to="/about" name="About" /></li>
                    </ul>
                    <Route path="/home" component={Home} />
                    <Route path="/about" component={About} />
                </div>
            </Router>
        );
    }
}

export default CustomLinkExample;