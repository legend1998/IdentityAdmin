import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import Panel from "./Panel";
import "./app.css";

import { useStateValue } from "./StateProvider";
import { Helmet } from "react-helmet";
// import Signup from "./Signup";

const TITLE = "Admin | TrackLab Distribution";

function App() {
  const [{ user }] = useStateValue();

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <div className="App font-graphik ">
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
    </>
  );
}

export default App;
