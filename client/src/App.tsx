
import Store from './Redux/Main/Store';
import {Provider} from 'react-redux';
import AuthLayer from './Components/AuthLayer';

function App() {

  return (
    <Provider store={Store}>
      <AuthLayer />
    </Provider>
  );
}

export default App;
