import React from "react";
import { useRouteMatch, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";
import Assets from "./Assets";
import Transactions from "./Transactions";
import Dispute from "./Dispute";
function Panel() {
  let { path } = useRouteMatch();
  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <div className=" w-full overflow-y-auto">
        <Switch>
          <Route path={`${path}/assets`}>
            <Assets />
          </Route>
          <Route path={`${path}/transactions`}>
            <Transactions />
          </Route>
          <Route path={`${path}/dispute`}>
            <Dispute />
          </Route>
          <Route path={`${path}/dashboard`}>
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Panel;
