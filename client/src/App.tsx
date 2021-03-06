import React from 'react';
import Posts from './Components/Posts/Posts';
import {Provider} from 'react-redux'
import Store from './Redux/Main/Store'
import Header from './Components/Header/Header';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {RouteComponentProps} from 'react-router-dom'
import Category from './Components/Category/Category';
import Search from './Components/Search/Search';
import './App.css';

interface RouteInt {
  path: string,
  name?: string,
  exact: boolean,
  component: any,
  props?: any
}

const Routes: RouteInt[] = [
  {
    path: '/',
    name: 'Posts Page',
    exact: true,
    component: Posts
  },
  {
    path: '/categories/:category',
    name: 'Page for CPU category',
    exact: true,
    component: Category
  },
  {
    path: '/search',
    name: 'Page for Product/Deal Search',
    exact: true,
    component: Search
  }
]

function App() {

  return (
    <Provider store={Store}>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            {Routes.map((route, i) => {
              return (
                <Route key={i} path={route.path} exact={route.exact}
                  render={(props:RouteComponentProps<any>) => (
                    <route.component {...props} {...route.props} />)}
                />
              );
            })}
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
