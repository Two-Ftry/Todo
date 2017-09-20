/**
 * Created by jfhuang on 17/9/19.
 */
import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom'

// 登录控制
const auth = {
    isLogin: false,
    login () {
        this.isLogin = true;
    },
    logout () {
        this.isLogin = false;
    }
};

const Public = () => (<div>Public</div>);
const Protect = () => (<div>Protect</div>);

class Login extends Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            redirectToReferrer: false
        };
    }
    render () {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        console.log('@@@@from', this.props);
        const { redirectToReferrer } = this.state
        if (redirectToReferrer) {
            return (
                <Redirect to={from} />
            )
        }
        return (<div>You are not login <button onClick={this.handleClick}>Login</button></div>);
    }

    handleClick () {
        auth.login()
        this.setState({redirectToReferrer: true});
        // this.props.history.push('/protect');
    }
}
// const LoginReact = withRouter(Login);



// Header
class AuthHeader extends Component {
    constructor (props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    render () {
        const header = auth.isLogin ?
                (<div>Welcome<button onClick={this.handleLogout}>Logout</button></div>)
                : (<div>You are not login</div>)
        return header;
    }

    handleLogout () {
        auth.logout()
        this.props.history.push('/');
    }

}
const AuthHeaderReact = withRouter(AuthHeader);

// private
class PrivateCom extends Component {
    render () {
        if (auth.isLogin) {
            return (<Protect />);
        } else {
            return (<Redirect to={{ pathname: '/login', state: { from : this.props.location}}} />)
        }
    }
}

class PrivateCom2 extends Component {
    render () {
        if (auth.isLogin) {
            return (<div>protect2</div>);
        } else {
            return (<Redirect to={{ pathname: '/login', state: { from : this.props.location}}} />)
        }
    }
}

class RedirectExample extends Component {
    render () {
        return (
            <Router>
                <div>
                    <AuthHeaderReact />
                    <ul>
                        <li><Link to="/public">Public</Link></li>
                        <li><Link to="/protect">Protect</Link></li>
                        <li><Link to="/protect2">Protect2</Link></li>
                    </ul>
                    {/*<Route path="/" component={Public} />*/}
                    <Route path="/public" component={Public} />
                    <Route path="/protect" component={PrivateCom} />
                    <Route path="/protect2" component={PrivateCom2} />
                    <Route path="/login" component={Login} />
                </div>
            </Router>
        );
    }
}

export default RedirectExample;