import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Link } from 'react-router-dom'
import { authLayerProps } from '../TypeScript/App Interfaces';
import Category from './Category/Category';
import Home from './Home/Home';
import Header from './Layout/Header/Header';
import Login from './Login';
import Search from './Search/Search';
import { connect } from 'react-redux';
import { CheckUserAuth } from '../Redux/Actions/UserActions';
import PrivateRoute from './PrivateRoute';
import Settings from './Settings/Settings';
import Register from './Register';
import Profile from './Profile';
import Categories from './Categories';
import CreatePost from './CreatePost';
import UpvotedPosts from './UpvotedPosts';
import UserPost from './UserPost';
import NotFound from './NotFound';
import SearchForm from './Search/SearchForm';
import Trending from './Trending';
import MobileNavFooter from './Layout/MobileNavFooter';

class AuthLayer extends Component<authLayerProps> {

    constructor (props:authLayerProps) {
        super(props)
    }
    
    componentWillMount() {
        this.props.CheckUserAuth();
    }

    render() {
        const { ATTEMPTEDAUTH, LOGGEDIN, LOGGEDINUSERNAME, LOGGEDINPFP } = this.props;
        return (
            
            <Router>
            {ATTEMPTEDAUTH &&

                <div className="bg-white">
                { LOGGEDIN && <Header /> }
                <Switch>
                    <Route exact path='/search' component={Search} />
                    <Route exact path='/categories/:category' component={Category} />
                    <Route exact path='/categories' component={Categories} />
                    <Route exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/notfound' component={NotFound} />
                    <Route exact path='/users/:username' component={Profile} />
                    <PrivateRoute exact={true} path='/settings' component={Settings} condition={LOGGEDIN && LOGGEDIN} />
                    <Route exact path='/users/:user_name/:post_id' component={UserPost} />
                    <PrivateRoute exact={true} path='/register' component={Register} condition={!LOGGEDIN && !LOGGEDIN} />
                    <PrivateRoute exact={true} path='/upvoted' component={UpvotedPosts} condition={LOGGEDIN && LOGGEDIN} />
                    <PrivateRoute exact={true} path='/trending' component={Trending} condition={LOGGEDIN && LOGGEDIN} />
                    {/* <PrivateRoute exact={true} path='/login' component={Login} condition={LOGGEDIN && LOGGEDIN} /> */}
                    <PrivateRoute exact={true} path='/createpost' component={CreatePost} condition={LOGGEDIN && LOGGEDIN} />
                </Switch>
                {
                    LOGGEDIN && <MobileNavFooter LOGGEDINUSERNAME={ LOGGEDINUSERNAME } LOGGEDINPFP={ LOGGEDINPFP } />
                }
            </div>
            }
        </Router>
        )
    }
}

const mapStateToProps = (store:any) => {
    const { UserState } = store;
    const { LOGGEDIN, ATTEMPTEDAUTH, LOGGEDINUSERNAME, LOGGEDINPFP } = UserState;
    return {
        LOGGEDIN,
        ATTEMPTEDAUTH,
        LOGGEDINUSERNAME,
        LOGGEDINPFP
    }
}

const mapDispatchToProps = (dispatch:Function) => {
    return {
        CheckUserAuth: () => {dispatch(CheckUserAuth())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthLayer);
