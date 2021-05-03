import React from "react";
import { useRouteMatch, Route, Switch } from "react-router-dom";
import Dashboard from "./Dashboard";
import Sidebar from "./Sidebar";
import Assets from "./Assets";
import Transactions from "./Transactions";
import Dispute from "./Dispute";
import Viewalbum from "./Viewalbum";
import ViewDispute from "./ViewDispute";
import VIewUser from "./VIewUser";
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
          <Route path={`${path}/viewdispute/:id`}>
            <ViewDispute />
          </Route>
          <Route path={`${path}/viewAlbum/:id`}>
            <Viewalbum />
          </Route>
          <Route path={`${path}/viewUser/:email`}>
            <VIewUser />
          </Route>
          <Route path={`${path}/dashboard`}>
            <Dashboard />
          </Route>
          <Route path={`${path}/`}>
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Panel;
