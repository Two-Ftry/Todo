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
                <div className={ match ? 'active' : ''}>
                    {match ? '>' : ''}<Link to={to}>{name}</Link>
                </div>
            );
        }}>
        </Route>
    );
};

class CustomLinkExample extends Component {
    render () {
        return (
            <Router>
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