import React, { useState } from "react";
import { useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import { firedb } from "./Firebaseconfig";

function Dashboard() {
  const [users, setusers] = useState([]);
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
    <div className="w-full h-full bg-gray-100">
      <div className="w-full bg-white h-24 flex items-center shadow-sm">
        <h1 className="text-3xl font-semibold ml-8 pl-10 font-sans ">
          Hi, Yash!
        </h1>
      </div>
      <div className="m-10 bg-white p-5">
        <div className=" m-5  py-5 p border-b border-gray-50 flex items-center justify-between text-gray-500">
          <h3>Users</h3>
          <div>
            <i className="far fa-times-circle cursor-pointer"></i>
          </div>
        </div>
        <div className="">
          <table className="table-fixed w-full text-left">
            <thead>
              <tr>
                <th className="w-3/12">Name</th>
                <th className="w-6/12">Email</th>
                <th className="w-3/12">Subscription Type</th>
                <th className="w-2/12">Start</th>
                <th className="w-2/12">End</th>
                <th className="w-1/12">action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>
                    {user?.fname} {user.lname}
                  </td>
                  <td>{user?.email}</td>
                  <td>{user?.subType}</td>
                  <td>{user?.startDate}</td>
                  <td>{user?.endDate}</td>
                  <td>
                    <button
                      onClick={() => handleclick(user.email)}
                      className="appearance-none focus:outline-none p-3"
                    >
                      <i className="fas fa-folder"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className=" "></div>
      </div>
    </div>
  );
}

export default Dashboard;
