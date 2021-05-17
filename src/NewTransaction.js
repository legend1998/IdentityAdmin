import React, { useLayoutEffect, useRef } from "react";
import { useState } from "react";
import { firedb } from "./Firebaseconfig";
import AWN from "awesome-notifications";
import { useHistory } from "react-router";

function NewTransaction() {
  const [users, setusers] = useState([]);
  const [userData, setuserData] = useState({});

  const userref = useRef();
  const amountref = useRef();
  const moderef = useRef();
  const statusref = useRef();

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

  console.log(userData);

  async function handletransaction() {
    if (
      userref.current.value === "default" ||
      amountref.current.value === "0" ||
      moderef.current.value === "default"
    ) {
      new AWN().alert("fill all details");
      return;
    }

    if (amountref.current.value > userData?.outstanding) {
      new AWN().alert("more than outstanding");
      return;
    }
    var dat = {
      amount: amountref.current.value,
      mode: moderef.current.value,
      status: statusref.current.value,
      date: Date.now(),
    };
    var result = await firedb
      .collection("transactions")
      .add({ ...dat, user: userref.current.value });

    if (!result.id) {
      new AWN().alert("something went wrong");
      return;
    }
    new AWN().success("sucess");
    history.goBack("/panel/transactions");
    return;
  }
  return (
    <div className="w-full bg-gray-100 h-full">
      <div className="w-full bg-white h-24 flex items-center justify-start shadow-sm">
        <i
          onClick={() => {
            history.replace("/panel/transactions");
          }}
          className="fas fa-arrow-left fa-2x py-5 px-5 hover:text-gray-600 cursor-pointer"
        ></i>
        <h1 className="text-3xl font-semibold ml-2 font-sans ">
          Create New Transaction
        </h1>
      </div>
      <div className="m-10 bg-white p-10">
        <div className="py-4">
          <select
            ref={userref}
            name=""
            onChange={() => {
              firedb
                .collection("user")
                .doc(userref.current.value)
                .get()
                .then((user) => {
                  setuserData(user.data().transactionStat);
                });
            }}
            id=""
            className="border h-12 p-2 focus:outline-none w-full text-xl"
          >
            <option value="default">--select a customer--</option>
            {users.map((u, i) => (
              <option key={i} value={u?.email}>
                {u?.fname + " " + u?.lname} ({" " + u?.email}) {u?.labelName}
              </option>
            ))}
          </select>
        </div>
        <div className="py-4">
          <select
            ref={moderef}
            name=""
            id=""
            className="border h-12 p-2 focus:outline-none w-full text-xl"
          >
            <option value="default" defaultChecked>
              --select a mode--
            </option>
            <option value="upi">UPI</option>
            <option value="paypal">Paypal</option>
          </select>
        </div>
        <div className="py-4">
          <input
            ref={amountref}
            type="number"
            defaultValue="0"
            min="0"
            className="border h-12 p-2 focus:outline-none w-full text-xl"
          />
        </div>
        <div className="py-4">
          <select
            ref={statusref}
            name=""
            id=""
            className="border h-12 p-2 focus:outline-none w-full text-xl"
          >
            <option value="paid" defaultChecked>
              paid
            </option>
          </select>
        </div>
        <button
          onClick={() => handletransaction()}
          className="border h-12 p-2 focus:outline-none w-full bg-blue-500 text-white hover:bg-blue-700"
        >
          Initiate Transaction
        </button>
      </div>
    </div>
  );
}

export default NewTransaction;
