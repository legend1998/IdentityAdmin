import React, { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [toggle, settoggle] = useState(1);
  return (
    <div className="lg:flex w-64 bg-sideblack font-Sans   hidden items-center flex-col justify-between">
      <div className="w-52 flex flex-col justify-start px-6 my-3">
        <img src="" alt="logo" className="my-8 self-center" />
        <Link
          to="/panel/dashboard"
          onClick={() => settoggle(1)}
          className={
            toggle === 1
              ? "my-2 text-gray-100"
              : "my-2 text-gray-400 hover:text-gray-100"
          }
        >
          Start
        </Link>
        <Link
          onClick={() => settoggle(2)}
          to="/panel/assets"
          className={
            toggle === 2
              ? "my-2 text-gray-100"
              : "my-2 text-gray-400 hover:text-gray-100"
          }
        >
          Assets
        </Link>

        <Link
          to="/panel/transactions"
          onClick={() => settoggle(5)}
          className={
            toggle === 5
              ? "my-2 text-gray-100"
              : "my-2 text-gray-400 hover:text-gray-100"
          }
        >
          Transactions
        </Link>
        <Link
          to="/panel/dispute"
          onClick={() => settoggle(7)}
          className={
            toggle === 7
              ? "my-2 text-gray-100"
              : "my-2 text-gray-400 hover:text-gray-100"
          }
        >
          Dispute
        </Link>
      </div>
      <div className="sm self-start mx-6 text-gray-500 text-xs flex flex-col border-t border-gray-700">
        <Link
          to="/panel/account"
          onClick={() => settoggle(6)}
          className={
            toggle === 6
              ? "mt-3 text-gray-100 cursor-pointer"
              : "mt-3  text-gray-400 hover:text-gray-100 cursor-pointer"
          }
        >
          My Account
        </Link>
      </div>
      <div className="my-8 pb-8 flex justify-between border-b border-gray-700 items-center text-gray-300  text-start w-4/5 text-xs">
        <div className="cursor-pointer">
          <p>Yash Raj</p>
          <p>Trapbasshdtv</p>
        </div>
        <div>
          <i className="fas fa-cog cursor-pointer"></i>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
