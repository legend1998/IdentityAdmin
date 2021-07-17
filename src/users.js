import React, { useState } from "react";
import { useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import { firedb } from "./Firebaseconfig";
import { moment } from "moment";

function Dashboard() {
  const [users, setusers] = useState([]);
  const [Subscription, setsubscription] = useState([]);
  const history = useHistory();

  useLayoutEffect(() => {
    firedb.collection("user").onSnapshot((snapshot) => {
      var a = [];
      snapshot.forEach((snap) => {
        a.push(snap.data());
      });
      setusers(a);
    });
  }, []);

  function handleclick(e) {
    history.push(`/panel/viewUser/${e}`);
  }

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="w-full bg-white h-24 flex items-center shadow-sm">
        <h1 className="text-3xl font-medium ml-12 ">Hi, Yash!</h1>
      </div>
      <div className="   bg-white ml-12 mr-12 mt-12  focus:border-indigo-500 ">
        <div className="flex-grow flex items-center">
          <i className="fas fa-search p-2"></i>
          <input
            type="text "
            placeholder="Search by User Name, Email"
            className="h-12 px-5 w-full bg-white appearance-none outline-none  focus:border-tabborder"
          />
        </div>
      </div>
      <div className="bg-white m-12 max-h-screen overflow-y-scroll  ">
        <table className=" capitalize table-fixed text-sm text-gray-700 w-full text-left overflow-scroll border-b">
          <thead className="sticky top-0 bg-white border-b ">
            <tr className="h-16 border-b font-medium tracking-wide text-base 	 ">
              <th className=" w-2/12  font-medium text-base pl-6">Name</th>
              <th className=" w-4/12 font-medium text-base">Email</th>
              <th className=" w-2/12 font-medium text-base">Subscription</th>
              <th className=" w-1/12 font-medium text-base">Start Date</th>
              <th className=" w-1/12 font-medium text-base">End Date</th>
            </tr>
          </thead>
          <tbody className="cursor-pointer">
            {users.map((user, index) => (
              <tr
                key={index}
                onClick={() => handleclick(user.email)}
                className="h-20 text-lg font-Regular text-filter hover:bg-hover border-b"
              >
                <td className=" w-4/12 pl-6 capitalize ">
                  {user?.fname} {user.lname}
                </td>
                <td className=" w-4/12">{user?.email}</td>
                <td className=" w-2/12 capitalize ">{user?.subType}</td>
                <td className=" w-1/12">{user?.startDate}</td>
                <td className=" w-1/12">{user?.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className=" h-2"></div>
    </div>
  );
}

export default Dashboard;
