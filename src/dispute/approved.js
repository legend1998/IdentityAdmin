import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { firedb } from "../Firebaseconfig";
import { statusSwitch } from "../utils/Utils";

function Approved() {
  const [show, setshow] = useState(false);
  const [filter, setfilter] = useState(false);
  const [disputes, setdisputes] = useState([]);
  const history = useHistory();
  const [tab, settab] = useState(1);

  //hooks
  let active = " bg-white font-medium ";
  let passive = "bg-tab text-sidetext hover:font-medium ";

  useEffect(() => {
    firedb.collection("dispute").onSnapshot((snaphshot) => {
      var a = [];
      snaphshot.forEach((snap) => {
        if (snap.data()?.status === "approved") {
          a.push({ ...snap.data(), id: snap.id });
        }
      });
      setdisputes(a);
    });
  }, []);

  function handleclick(id) {
    history.replace(`/panel/viewdispute/${id}`);
  }

  return (
    <div className="">
      <div className="bg-white ml-8 mr-8 ">
        <div className="flex h-14 items-center flex-wrap">
          <button
            onClick={() => setfilter(!filter)}
            className={`px-7 hidden lg:block focus:outline-none ${
              filter ? "bg-black text-white h-full" : null
            } `}
          >
            Filters <i class="fas fa-chevron-down ml-6"></i>
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
              className="bg-blue-700 hover:bg-blue-800 w-64 h-14 focus:outline-none text-white"
            >
              Actions <i class="fas fa-chevron-down ml-6"></i>
            </button>
            {show ? (
              <ul className=" absolute bg-white w-64 font-Light shadow-lg  border cursor-pointer">
                <li className="h-8 pl-5 pt-2 hover:bg-tab">
                  Create New Dispute
                </li>
                <li className="h-8 pl-5 pt-1 hover:bg-tab">
                  Generate full catalog (CSV)
                </li>
                <li className="h-8 pl-5 hover:bg-tab">
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
      <div className="h-16 text-sm text-sidetext flex items-end ml-8 mr-8 mb-2">
        {disputes.length === 0 ? " Nothing to show" : "Showing all disputes"}
      </div>
      <div className="bg-white ml-8 mr-8 ">
        <table className="table-auto text-xs  w-full text-left ">
          <thead>
            <tr className="h-14 border-b text-left text-sm tracking-wider font-medium">
              <th className=" w-2/6 pl-16">Date</th>
              <th className=" w-3/6 text-left">Link</th>
              <th className=" w-1/6 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {disputes.map((disp, index) => (
              <tr
                key={index}
                className="text-left text-filter h-16 border-b font-normal"
              >
                <td className="text-left pl-16 text-sm ">
                  {" "}
                  {moment(disp.createdAt).format("DD/MM/Y")}{" "}
                </td>
                <td className="text-left text-sm ">
                  <a href={disp.youtubeLink} target="blank">
                    {disp.youtubeLink}
                  </a>
                </td>
                <td className=" text-xs">
                  <button
                    className="appearance-none  h-full focus:outline-none"
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
            <p className="text-sm text-filter">You have no data to display.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Approved;
