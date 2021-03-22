import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from './Components/Layout/Header/Header';
import Category from './Components/Category/Category';
import {RoutesInt} from './TypeScript/App Interfaces';
import {RouteComponentProps} from 'react-router-dom';
import Search from './Components/Search/Search';
import Posts from './Components/Posts/Posts';
import Home from './Components/Home/Home';
import Store from './Redux/Main/Store';
import {Provider} from 'react-redux';



const Routes: RoutesInt[] = [
  {
    path: '/',
    name: 'Home Page',
    exact: true,
    component: Home
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
];

function App() {

  return (
    <Provider store={Store}>
      <Router>
        <div className="bg-white">
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
