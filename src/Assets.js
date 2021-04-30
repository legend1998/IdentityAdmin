import React from "react";
import Pending from "./assets/Pending";
import Rejected from "./assets/Rejected";
import Moderation from "./assets/Moderation";
import Approved from "./assets/Approved";
import Injested from "./assets/Injested";
import Live from "./assets/Live";
import {
  Link,
  Route,
  Switch,
  useLocation,
  useRouteMatch,
} from "react-router-dom";

function Assets() {
  const location = useLocation();
  let { url } = useRouteMatch();

  let active =
    "flex-1 text-center h-full py-3 border-b-2 border-purple-700 bg-white";
  let passive =
    "flex-1 text-center py-3 h-full bg-gray-50 text-gray-600 border";

  return (
    <div className="bg-gray-100  h-screen">
      <div className="w-full bg-white h-24 flex items-center shadow-sm">
        <h1 className="text-3xl font-semibold ml-8 pl-10 font-sans ">Music</h1>
      </div>
      <div className="flex border flex-wrap items-center h-14 ">
        <Link
          to={`${url}/pending`}
          className={
            location.pathname.includes("pending") ||
            location.pathname === "/panel/assets"
              ? active
              : passive
          }
        >
          Pending
        </Link>
        <Link
          to={`${url}/rejected`}
          className={location.pathname.includes("rejected") ? active : passive}
        >
          Rejected
        </Link>
        <Link
          to={`${url}/injested`}
          className={location.pathname.includes("injested") ? active : passive}
        >
          Injested
        </Link>
        <Link
          to={`${url}/Moderation`}
          className={
            location.pathname.includes("Moderation") ? active : passive
          }
        >
          Moderation
        </Link>
        <Link
          to={`${url}/Approved`}
          className={location.pathname.includes("Approved") ? active : passive}
        >
          Approved
        </Link>

        <Link
          to={`${url}/Live`}
          className={location.pathname.includes("Live") ? active : passive}
        >
          Live
        </Link>
      </div>
      <Switch>
        <Route path="/panel/assets/pending">
          <Pending />
        </Route>
        <Route path="/panel/assets/rejected">
          <Rejected />
        </Route>
        <Route path="/panel/assets/Moderation">
          <Moderation />
        </Route>
        <Route path="/panel/assets/Approved">
          <Approved />
        </Route>
        <Route path="/panel/assets/Injested">
          <Injested />
        </Route>
        <Route path="/panel/assets/Live">
          <Live />
        </Route>
        <Route path="/panel/assets/">
          <Pending />
        </Route>
      </Switch>
    </div>
  );
}

export default Assets;
