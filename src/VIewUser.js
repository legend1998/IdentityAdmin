import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { firedb } from "./Firebaseconfig";
import AWN from "awesome-notifications";
import validateRefs from "./utils/Utils";

function VIewUser() {
  const params = useParams();
  const [user, setuser] = useState({});

  const subtyperef = useRef();
  const startdateref = useRef();
  const enddateref = useRef();

  const refs = [subtyperef, startdateref, enddateref];

  useEffect(() => {
    firedb
      .collection("user")
      .doc(params.email)
      .get()
      .then((res) => {
        setuser(res.data());
      })
      .catch((e) => {
        new AWN().alert(e.message);
      });
  }, []);

  function handleclick() {
    var res = validateRefs(refs);

    console.log(res);
    if (!res.success) {
      new AWN().warning(res.message);
      return;
    }
    firedb
      .collection("user")
      .doc(user.email)
      .update({
        subType: subtyperef.current.value,
        startDate: startdateref.current.value,
        endDate: enddateref.current.value,
      })
      .then((res) => {
        new AWN().success("updated");
      });
  }

  return (
    <div className="bg-gray-100  h-screen">
      <div className="w-full bg-white h-24 flex flex-col items-start justify-center shadow-sm">
        <h1 className="text-3xl font-semibold   pl-10   font-sans ">
          {user?.fname}
        </h1>
        <p className="text-gray-400 pl-10">{user.email}</p>
      </div>
      <div className="bg-white m-8 p-8">
        <input
          defaultValue={user.subType}
          disabled={user.subType}
          ref={subtyperef}
          className="focus:outline-none p-3 m-3 border "
          type="text"
          placeholder="subscription type"
        />
        <input
          defaultValue={user.startDate}
          disabled={user.startDate}
          ref={startdateref}
          className="focus:outline-none p-3 m-3 border "
          type="date"
          placeholder="start date"
        />
        <input
          defaultValue={user.endDate}
          disabled={user.endDate}
          ref={enddateref}
          className="focus:outline-none p-3 m-3 border "
          type="date"
          placeholder="end date"
        />
        {user?.endDate ? null : (
          <button
            disabled={user.endDate}
            onClick={() => {
              handleclick();
            }}
            className="focus:outline-none p-3 m-3 border bg-indigo-600 text-white"
          >
            Update
          </button>
        )}
        <div className="ml-5 font-semibold">
          <span>Account Name:</span>
        </div>
        <div className="bg-gray-50  pl-5 border h-14 w-full text-black font-regular text-lg pt-3 ml-3">
          {user.labelName}
        </div>
        <div className="ml-5 pt-3 font-semibold">
          <span>Payee Mode:</span>
        </div>
        <div className="bg-gray-50 capitalize pl-5 border h-14 w-full text-black font-regular text-lg pt-3 ml-3">
          {user.paymentPreference?.mode}
        </div>
        <div className="ml-5 pt-3 font-semibold">
          <span>Payee ID:</span>
        </div>
        <div className="bg-gray-50  pl-5 border h-14 w-full text-black font-regular text-lg pt-3 ml-3">
          {user.paymentPreference?.id}
        </div>
      </div>

      <div className="bg-white h-max  m-8 p-8">
        <div className="ml-5 font-semibold">
          <span>Total Earnings: </span>
        </div>
        <div className="bg-gray-50  pl-5 border h-14 w-full text-black font-regular text-lg pt-3 ml-3">
          {user.transactionStat?.total}
        </div>
      </div>
    </div>
  );
}

export default VIewUser;
