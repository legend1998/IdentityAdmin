import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { firedb } from "./Firebaseconfig";
import { calculateTotalTransaction } from "./utils/Utils";

function Transactions() {
  const history = useHistory();
  const [transdata, settransdata] = useState([]);

  useEffect(() => {
    firedb.collection("transactions").onSnapshot((snapshot) => {
      var a = [];
      snapshot.forEach((snap) => {
        a.push(snap.data());
      });
      settransdata(a);
    });
  }, []);

  console.log(calculateTotalTransaction(transdata));
  return (
    <div className="w-full bg-background h-full">
      <div className="w-full bg-white h-24 flex items-center justify-between shadow-sm">
        <h1 className="text-3xl ml-12 font-medium ">Balance</h1>
        <button
          onClick={() => {
            history.push("/panel/newtransaction");
          }}
          className="h-12 mx-10 px-3 shadow-lg bg-blue-500 text-white focus:outline-none rounded-full hover:bg-blue-600 "
        >
          Add new transaction
        </button>
      </div>

      <div className="lg:px-12 md:px-1  py-5">
        <div className="h-16 py-2 text-md text-gray-500 flex items-end ml-10 mr-10 mt-5">
          {transdata.length === 0
            ? "Nothing to show"
            : "Showing all transactions"}
        </div>
        <div className="bg-white mt-2 ml-10 mr-10">
          <table className="table-fixed  text-gray-700 w-full">
            <thead>
              <tr className="h-16 border-b text-left tracking-wide">
                <th className=" w-1/6 pl-5 text-base font-medium ">Date</th>
                <th className=" w-2/6 text-base font-medium">Contract Name</th>
                <th className=" w-1/6 text-base font-medium">
                  Transaction Type
                </th>
                <th className=" w-1/6 text-base font-medium">Amount</th>
                <th className=" w-1/6 text-base font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="  ">
              {transdata.map((data, i) => (
                <tr key={i} className="h-14 ">
                  <td className=" w-1/6 pl-5 text-base font-normal ">
                    {moment(data.date).format("DD-MM-YY")}
                  </td>
                  <td className=" w-2/6 text-base font-normal ">{data.user}</td>
                  <td className=" w-1/6 text-base font-normal ">{data.mode}</td>
                  <td className=" w-1/6 text-base font-normal ">
                    {data.amount}
                  </td>
                  <td className=" w-1/6 text-base font-normal ">
                    {data.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {transdata.length === 0 ? (
            <div className="w-full h-64 flex items-center justify-center">
              <p className="text-md text-gray-500">
                You have no data to display.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Transactions;
