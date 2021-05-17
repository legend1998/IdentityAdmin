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
    <div className="w-full bg-gray-100 h-full">
      <div className="w-full bg-white h-24 flex items-center justify-between shadow-sm">
        <h1 className="text-3xl font-semibold ml-8 font-sans ">Balance</h1>
        <button
          onClick={() => {
            history.push("/panel/newtransaction");
          }}
          className="h-12 mx-10 px-3 shadow-lg bg-blue-500 text-white focus:outline-none hover:bg-blue-600 "
        >
          Add new transaction
        </button>
      </div>
      <div className="flex justify-between items-end mx-10 my-5">
        <div className="">
          <select
            name=""
            id=""
            className="text-3xl font-bold appearance-none focus:outline-none bg-gray-100"
          >
            <option value="alll" className="text-sm">
              All
            </option>
            <option value="tm" className="text-sm">
              This Month
            </option>
            <option value="lm" className="text-sm">
              Last Month
            </option>
            <option value="tq" className="text-sm">
              This Quarter
            </option>
            <option value="lq" className="text-sm">
              Last Quarter
            </option>
            <option value="ty" className="text-sm">
              This Year
            </option>
            <option value="ly" className="text-sm">
              Last Year
            </option>
          </select>
        </div>
        <div className="">
          <p className="text-sm">Balance</p>
          <h3 className="text-3xl font-bold">
            <i className=" fa fa-inr px-2"></i>
            {calculateTotalTransaction(transdata)}
          </h3>
        </div>
      </div>
      <div className="lg:px-12 md:px-1  py-5">
        <div className="h-16 py-2 text-xs text-gray-500 flex items-end">
          {transdata.length === 0
            ? "Nothing to show"
            : "showing all transactions"}
        </div>
        <div className="bg-white">
          <table className="table-fixed text-xs text-gray-700 w-full">
            <thead>
              <tr className="h-12 border">
                <th className=" w-1/6">Date</th>
                <th className=" w-2/6">Contract Name</th>
                <th className=" w-1/6">Transaction Type</th>
                <th className=" w-1/6">Amount</th>
                <th className=" w-1/6">Status</th>
              </tr>
            </thead>
            <tbody className="text-center text-lg">
              {transdata.map((data, i) => (
                <tr key={i} className="h-14">
                  <td>{moment(data.date).format("DD-MM-YY")}</td>
                  <td>{data.user}</td>
                  <td>{data.mode}</td>
                  <td>{data.amount}</td>
                  <td>{data.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {transdata.length === 0 ? (
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

export default Transactions;
