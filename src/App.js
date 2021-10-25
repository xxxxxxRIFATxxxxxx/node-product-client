import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './components/Header/Header';
import Products from './components/Products/Products';

function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route exact path="/">
          <Products></Products>
        </Route>

        <Route exact path="/products">
          <Products></Products>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
