import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from './Components/Layout/Header/Header';
import Category from './Components/Category/Category';
import Search from './Components/Search/Search';
import Home from './Components/Home/Home';
import Store from './Redux/Main/Store';
import {Provider} from 'react-redux';
import Login from './Components/Login';
import AuthLayer from './Components/AuthLayer';

function App() {

  return (
    <Provider store={Store}>
      <AuthLayer />
    </Provider>
  );
}

export default App;
