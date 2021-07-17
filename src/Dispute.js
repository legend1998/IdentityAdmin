import moment from "moment";
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { firedb } from "./Firebaseconfig";
import { statusSwitch } from "./utils/Utils";
import Inreview from "./dispute/inreview";
import Processing from "./dispute/processing";
import Approved from "./dispute/approved";
import Error from "./dispute/error";

function Dispute() {
  const [show, setshow] = useState(false);
  const [filter, setfilter] = useState(false);
  const [disputes, setdisputes] = useState([]);
  const [inreview, setInReview] = useState([]);
  const [processing, setProcessing] = useState([]);
  const [approved, setApproved] = useState([]);
  const [error, setError] = useState([]);
  const history = useHistory();
  const [tab, settab] = useState(1);

  //hooks
  let active = " bg-white font-medium ";
  let passive = "bg-tab text-sidetext hover:font-medium ";

  useEffect(() => {
    firedb.collection("dispute").onSnapshot((snaphshot) => {
      var a = [];
      snaphshot.forEach((snap) => {
        if (snap.data()?.status === "pending") {
          a.push({ ...snap.data(), id: snap.id });
        }
      });
      setInReview(a);
    });
  }, []);

  useEffect(() => {
    firedb.collection("dispute").onSnapshot((snaphshot) => {
      var a = [];
      snaphshot.forEach((snap) => {
        if (snap.data()?.status === "consideration") {
          a.push({ ...snap.data(), id: snap.id });
        }
      });
      setProcessing(a);
    });
  }, []);

  useEffect(() => {
    firedb.collection("dispute").onSnapshot((snaphshot) => {
      var a = [];
      snaphshot.forEach((snap) => {
        if (snap.data()?.status === "approved") {
          a.push({ ...snap.data(), id: snap.id });
        }
      });
      setApproved(a);
    });
  }, []);

  useEffect(() => {
    firedb.collection("dispute").onSnapshot((snaphshot) => {
      var a = [];
      snaphshot.forEach((snap) => {
        if (snap.data()?.status === "rejected") {
          a.push({ ...snap.data(), id: snap.id });
        }
      });
      setError(a);
    });
  }, []);

  function handleclick(id) {
    history.replace(`/panel/viewdispute/${id}`);
  }

  return (
    <div className="w-full bg-background min-h-screen ">
      <div className="w-full bg-white h-24 flex items-center shadow-sm">
        <h1 className="text-3xl font-semibold ml-8     font-sans ">Dispute</h1>
      </div>
      <div className=" ml-20 mr-20 mt-20 h-14 bg-white">
        <p className="font-normal pl-6 pt-4 text-lg">
          Switch between tabs to display dispute with different status.
        </p>
      </div>
      <div className="lg:px-12 md:px-1  py-5">
        <div className="flex  flex-wrap items-center h-16 ml-8 mr-8 mt-10">
          <div
            onClick={() => settab(1)}
            className={`flex-grow py-5 cursor-pointer hover:text-black   ${
              tab === 1 ? active : passive
            }`}
          >
            <h1 className="ml-8 ">In Review ({inreview.length})</h1>
          </div>
          <div
            onClick={() => settab(2)}
            className={`flex-grow py-5 cursor-pointer hover:text-black   ${
              tab === 2 ? active : passive
            }`}
          >
            <h1 className="ml-8 ">Processing ({processing.length})</h1>
          </div>
          <div
            onClick={() => settab(3)}
            className={`flex-grow py-5 cursor-pointer hover:text-black   ${
              tab === 3 ? active : passive
            }`}
          >
            <h1 className="ml-8 ">Approved ({approved.length})</h1>
          </div>
          <div
            onClick={() => settab(4)}
            className={`flex-grow py-5 cursor-pointer hover:text-black   ${
              tab === 4 ? active : passive
            }`}
          >
            <h1 className="ml-8 ">Errors ({error.length})</h1>
          </div>
        </div>
        {tab === 1 ? <Inreview /> : null}
        {tab === 2 ? <Processing /> : null}
        {tab === 3 ? <Approved /> : null}
        {tab === 4 ? <Error /> : null}
      </div>
    </div>
  );
}

export default Dispute;
