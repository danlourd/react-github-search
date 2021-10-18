import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Search from './pages/Search';
import Details from './pages/Details';

const App = () => {
  return (
    <Router>
      <div className="container py-4">
        <Switch>
          <Route path="/details">
            <Details />
          </Route>
          <Route path="/">
            <Search />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
