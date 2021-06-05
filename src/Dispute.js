import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { firedb } from "./Firebaseconfig";
import { statusSwitch } from "./utils/Utils";

function Dispute() {
  const [show, setshow] = useState(false);
  const [filter, setfilter] = useState(false);
  const [disputes, setdisputes] = useState([]);
  const history = useHistory();
  useEffect(() => {
    firedb.collection("dispute").onSnapshot((snaphshot) => {
      var a = [];
      snaphshot.forEach((snap) => {
        a.push({ ...snap.data(), id: snap.id });
      });
      setdisputes(a);
    });
  }, []);

  function handleclick(id) {
    history.replace(`/panel/viewdispute/${id}`);
  }

  return (
    <div className="w-full bg-gray-100 h-full">
      <div className="w-full bg-white h-24 flex items-center shadow-sm">
        <h1 className="text-3xl font-semibold ml-8     font-sans ">Dispute</h1>
      </div>

      <div className="lg:px-12 md:px-1  py-5">
        <div className="text-end">
          <button></button>
        </div>
        <div className="bg-white">
          <div className="flex h-12 items-center flex-wrap">
            <button
              onClick={() => setfilter(!filter)}
              className={`px-7 hidden lg:block focus:outline-none ${
                filter ? "bg-black text-white h-full" : null
              } `}
            >
              Filters &#x2304;
            </button>
            <div className="flex-grow flex items-center">
              <i className="fas fa-search p-2"></i>
              <input
                className="flex-grow h-7 outline-none text-gray-700"
                type="text"
                placeholder="Search by Date, Status, Link"
              />
            </div>
            <div className="duration-200">
              <button
                onClick={() => setshow(!show)}
                className="bg-blue-700 hover:bg-blue-800 w-64 h-12 focus:outline-none text-white"
              >
                Actions &#x2304;
              </button>
              {show ? (
                <ul className="absolute bg-white w-64 rounded font-Light shadow-lg  border cursor-pointer">
                  <li className="h-6 pl-5  hover:bg-gray-100">
                    Generate full catalog (CSV)
                  </li>
                  <li className="h-6 pl-5 hover:bg-gray-100">
                    Genrate full catalog (XLSX)
                  </li>
                </ul>
              ) : null}
            </div>
          </div>
          <div className={filter ? "py-5 px-5 bg-black" : "hidden"}>
            <div className="grid grid-rows-1 grid-cols-2 gap-6">
              <div className="">
                <p className="text-white my-3">Date</p>
                <select
                  className="flex-grow h-12 p-2 outline-none text-gray-700 w-full"
                  type="text"
                  placeholder="Type"
                >
                  <option value="all">All</option>
                  <option value="l7d">Last 7 days</option>
                  <option value="tm">This Month</option>
                  <option value="lm">Last Month</option>
                  <option value="ty">This Year</option>
                </select>
              </div>

              <div className="">
                <p className="text-white my-3">Status</p>
                <select
                  className="flex-grow h-12 p-2 outline-none text-gray-700 w-full"
                  type="text"
                  placeholder="Type"
                >
                  <option value="all">All</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="h-16 py-2 text-xs text-gray-500 flex items-end">
          {disputes.length === 0 ? " Nothing to show" : "showing all disputes"}
        </div>
        <div className="bg-white">
          <table className="table-auto text-xs text-gray-700 w-full text-left">
            <thead>
              <tr className="h-12 border text-center">
                <th className=" w-1/6">Date</th>
                <th className=" w-4/6">Link</th>
                <th className=" w-1/6">Status</th>
              </tr>
            </thead>
            <tbody>
              {disputes.map((disp, index) => (
                <tr key={index} className="text-center">
                  <td> {moment(disp.createdAt).format("DD/MM/Y")} </td>
                  <td>
                    <a href={disp.youtubeLink}>{disp.youtubeLink}</a>
                  </td>
                  <td className="p-5">
                    <button
                      className="appearance-none hover:bg-blue-300 h-full focus:outline-none"
                      onClick={() => handleclick(disp.id)}
                    >
                      {statusSwitch(disp?.status)}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {disputes.length === 0 ? (
            <div className="w-full h-56 flex items-center justify-center">
              <p className="text-xs text-gray-500">
                You have no data to display.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Dispute;
