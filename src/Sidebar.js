import React from "react";
import { Link } from "react-router-dom";
import { auth } from "./Firebaseconfig";
import { useHistory, useLocation } from "react-router";
import { useStateValue } from "./StateProvider";

function Sidebar() {
  //stats
  const [{ user }] = useStateValue();
  const matchurl = useLocation();

  //hooks
  const history = useHistory();

  const logoutnow = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    auth.signOut();
    history.replace("/");
  };

  return (
    <div className="lg:flex w-72 bg-sideblack  hidden items-center flex-col justify-between text-lg">
      <div className="w-54 flex flex-col justify-start px-8 my-2 text-gray-500">
        <img
          src="https://cdn.identitymusic.com/img/logo/im-white.png"
          alt="logo"
          className="my-8 self-center"
        />
        <Link
          to="/panel/dashboard"
          className={
            matchurl.pathname.includes("dashboard")
              ? "my-1 text-gray-100"
              : "my-1 text-sidetext hover:text-gray-100"
          }
        >
          Start
        </Link>
        <Link
          to="/panel/assets"
          className={
            matchurl.pathname.includes("assets")
              ? "my-1 text-gray-100"
              : "my-1 text-sidetext hover:text-gray-100"
          }
        >
          Assets
        </Link>

        <Link
          to="/panel/transactions"
          className={
            matchurl.pathname.includes("transactions")
              ? "my-1 text-gray-100"
              : "my-1 text-sidetext hover:text-gray-100"
          }
        >
          Transactions
        </Link>
        <Link
          to="/panel/dispute"
          className={
            matchurl.pathname.includes("dispute")
              ? "my-1 text-gray-100"
              : "my-1 text-sidetext hover:text-gray-100"
          }
        >
          Dispute
        </Link>
      </div>
      <div className="sm self-start mx-6 text-gray-500 text-xs flex flex-col border-t border-gray-700">
        <Link
          to="/panel/account"
          className={
            matchurl.pathname.includes("account")
              ? "mt-2 text-gray-100 cursor-pointer"
              : "mt-2  text-sidetext hover:text-gray-100 cursor-pointer"
          }
        >
          My Account
        </Link>
      </div>
      <div className="my-8 text-gray-400 pb-8 flex justify-between border-b border-gray-700 items-center text-sidetext  text-start w-4/5 text-xs">
        <div className="cursor-pointer">
          <p>{user.fname + " " + user.lname}</p>
          <p>{user?.label}</p>
          <button onClick={(e) => logoutnow(e)}>Sign out</button>
        </div>
        <div>
          <i className="fas fa-cog cursor-pointer"></i>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
