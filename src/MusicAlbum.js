import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import InReview from "./music/Pending";
import Injested from "./music/ingestion";
import Moderation from "./music/moderation";
import Approved from "./music/approved";
import Live from "./music/live";
import Rejected from "./music/rejected";
import Takedown from "./music/takedown";
import { firedb } from "./Firebaseconfig";

function Album() {
  const [tab, settab] = useState(1);
  const [inreview, setinreview] = useState([]);
  const [ingested, setingested] = useState([]);
  const [moderation, setmoderation] = useState([]);
  const [approved, setapproved] = useState([]);
  const [live, setlive] = useState([]);
  const [rejected, setrejected] = useState([]);
  const [takedown, settakedown] = useState([]);

  useEffect(() => {
    firedb.collection("album").onSnapshot((snaphshot) => {
      var a = [];
      snaphshot.forEach((snap) => {
        if (snap.data()?.status === "pending" || !snap.data()?.status) {
          a.push({ ...snap.data(), id: snap.id });
        }
      });
      setinreview(a);
    });
  }, []);
  useEffect(() => {
    firedb.collection("album").onSnapshot((snaphshot) => {
      var a = [];
      snaphshot.forEach((snap) => {
        if (snap.data()?.status === "injested") {
          a.push({ ...snap.data(), id: snap.id });
        }
      });
      setingested(a);
    });
  }, []);
  useEffect(() => {
    firedb.collection("album").onSnapshot((snaphshot) => {
      var a = [];
      snaphshot.forEach((snap) => {
        if (snap.data()?.status === "moderation") {
          a.push({ ...snap.data(), id: snap.id });
        }
      });
      setmoderation(a);
    });
  }, []);

  useEffect(() => {
    firedb.collection("album").onSnapshot((snaphshot) => {
      var a = [];
      snaphshot.forEach((snap) => {
        if (snap.data()?.status === "approved") {
          a.push({ ...snap.data(), id: snap.id });
        }
      });
      setapproved(a);
    });
  }, []);

  useEffect(() => {
    firedb.collection("album").onSnapshot((snaphshot) => {
      var a = [];
      snaphshot.forEach((snap) => {
        if (snap.data()?.status === "live") {
          a.push({ ...snap.data(), id: snap.id });
        }
      });
      setlive(a);
    });
  }, []);

  useEffect(() => {
    firedb.collection("album").onSnapshot((snaphshot) => {
      var a = [];
      snaphshot.forEach((snap) => {
        if (snap.data()?.status === "rejected") {
          a.push({ ...snap.data(), id: snap.id });
        }
      });
      setrejected(a);
    });
  }, []);

  useEffect(() => {
    firedb.collection("album").onSnapshot((snaphshot) => {
      var a = [];
      snaphshot.forEach((snap) => {
        if (snap.data()?.status === "takedown") {
          a.push({ ...snap.data(), id: snap.id });
        }
      });
      settakedown(a);
    });
  }, []);

  //hooks
  let active = " bg-white font-medium ";
  let passive = "bg-tab text-sidetext hover:font-medium ";

  return (
    <div className="bg-background  ">
      <div className="flex border flex-wrap items-center h-16 ml-16 mr-16 mt-16 ">
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
          <h1 className="ml-8 ">Ingested ({ingested.length})</h1>
        </div>
        <div
          onClick={() => settab(3)}
          className={`flex-grow py-5 cursor-pointer hover:text-black   ${
            tab === 3 ? active : passive
          }`}
        >
          <h1 className="ml-8 ">Moderation ({moderation.length})</h1>
        </div>
        <div
          onClick={() => settab(4)}
          className={`flex-grow py-5 cursor-pointer hover:text-black   ${
            tab === 4 ? active : passive
          }`}
        >
          <h1 className="ml-8 ">Approved ({approved.length})</h1>
        </div>
        <div
          onClick={() => settab(5)}
          className={`flex-grow py-5 cursor-pointer hover:text-black   ${
            tab === 5 ? active : passive
          }`}
        >
          <h1 className="ml-8 ">Live ({live.length})</h1>
        </div>
        <div
          onClick={() => settab(6)}
          className={`flex-grow py-5 cursor-pointer hover:text-black   ${
            tab === 6 ? active : passive
          }`}
        >
          <h1 className="ml-8 ">Error ({rejected.length})</h1>
        </div>
        <div
          onClick={() => settab(7)}
          className={`flex-grow py-5 cursor-pointer hover:text-black   ${
            tab === 7 ? active : passive
          }`}
        >
          <h1 className="ml-8 ">Takedown ({takedown.length})</h1>
        </div>
        {tab === 1 ? <InReview /> : null}
        {tab === 2 ? <Injested /> : null}
        {tab === 3 ? <Moderation /> : null}
        {tab === 4 ? <Approved /> : null}
        {tab === 5 ? <Live /> : null}
        {tab === 6 ? <Rejected /> : null}
        {tab === 7 ? <Takedown /> : null}
      </div>
    </div>
  );
}

export default Album;
