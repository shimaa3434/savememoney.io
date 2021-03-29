import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { authLayerProps } from '../TypeScript/App Interfaces';
import Category from './Category/Category';
import Home from './Home/Home';
import Header from './Layout/Header/Header';
import Login from './Login';
import Search from './Search/Search';
import { connect } from 'react-redux';
import { CheckUserAuth } from '../Redux/Actions/UserActions';
import PrivateRoute from './PrivateRoute';
import Settings from './Settings';
import Register from './Register';
import Profile from './Profile';
import Categories from './Categories';
import CreatePost from './CreatePost';
import SavedPosts from './SavedPosts';

class AuthLayer extends Component<authLayerProps> {

    constructor (props:authLayerProps) {
        super(props)
    }
    
    componentWillMount() {
        this.props.CheckUserAuth();
    }

    render() {
        const { ATTEMPTEDAUTH, LOGGEDIN } = this.props;
        return (
            
            <Router>
            {ATTEMPTEDAUTH &&

                <div className="bg-white">
                <Header />
                <Switch>
                    <Route exact path='/search' component={Search} />
                    <Route exact path='/categories/:category' component={Category} />
                    <Route exact path='/categories' component={Categories} />
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    

                    <Route exact path='/users/:username' component={Profile} />
                    <PrivateRoute exact={true} path='/settings' component={Settings} condition={LOGGEDIN && LOGGEDIN} />
                    <PrivateRoute exact={true} path='/register' component={Register} condition={!LOGGEDIN && !LOGGEDIN} />
                    <PrivateRoute exact={true} path='/savedposts' component={SavedPosts} condition={LOGGEDIN && LOGGEDIN} />
                    {/* <PrivateRoute exact={true} path='/login' component={Login} condition={LOGGEDIN && LOGGEDIN} /> */}
                    <PrivateRoute exact={true} path='/createpost' component={CreatePost} condition={LOGGEDIN && LOGGEDIN} />
                </Switch>
            </div>
            }
        </Router>
        )
    }
}

const mapStateToProps = (store:any) => {
    const { UserState } = store;
    const { LOGGEDIN, ATTEMPTEDAUTH } = UserState;
    return {
        LOGGEDIN,
        ATTEMPTEDAUTH
    }
}

const mapDispatchToProps = (dispatch:Function) => {
    return {
        CheckUserAuth: () => {dispatch(CheckUserAuth())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLayer);
