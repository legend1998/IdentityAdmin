import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import Panel from "./Panel";
import "./app.css";
import { useStateValue } from "./StateProvider";
// import Signup from "./Signup";
function App() {
  const [{ user }] = useStateValue();

  return (
    <div className="App  font-graphik ">
      <Router>
        <Switch>
          {user ? (
            <Route path="/panel">
              <Panel />
            </Route>
          ) : null}
          {/* 
          <Route path="/signup">
            <Signup />
          </Route> */}
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
