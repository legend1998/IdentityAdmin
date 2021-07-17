import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { firedb } from "./Firebaseconfig";
import { useHistory } from "react-router";
import InReview from "./track/Pending";
import Injested from "./track/ingestion";
import Moderation from "./track/moderation";
import Approved from "./track/approved";
import Live from "./track/live";
import Rejected from "./track/rejected";
import Takedown from "./track/takedown";

function Track() {
  const [album, setalbum] = useState([]);
  const [tab, settab] = useState(1);

  //hooks
  let active = " bg-white font-medium";
  let passive = "bg-tab text-gray-600 ";
  const [inReview, setInreview] = useState([]);
  const [ingested, setIngested] = useState([]);
  const [moderation, setModeration] = useState([]);
  const [approved, setApproved] = useState([]);
  const [live, setLive] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [takedown, setTakedown] = useState([]);

  const history = useHistory();

  function handleclick(row) {
    history.replace(`/panel/viewAlbum/${row.albumId}`);
  }

  useEffect(() => {
    getPending();
    getIngested();
    getModeration();
    getApproved();
    getLive();
    getError();
    getTakedown();
  }, []);

  async function getPending() {
    var a = await firedb.collection("album").get();
    var b = [];
    for (const doc of a.docs) {
      if (doc.data().status !== "pending") continue;
      var tracks = await firedb
        .collection("album")
        .doc(doc.id)
        .collection("tracks")
        .get();

      for (const track of tracks.docs) {
        b.push(track.data());
      }
    }

    setInreview(b);
  }

  async function getIngested() {
    var a = await firedb.collection("album").get();
    var b = [];
    for (const doc of a.docs) {
      if (doc.data().status !== "injested") continue;
      var tracks = await firedb
        .collection("album")
        .doc(doc.id)
        .collection("tracks")
        .get();

      for (const track of tracks.docs) {
        b.push(track.data());
      }
    }

    setIngested(b);
  }

  async function getModeration() {
    var a = await firedb.collection("album").get();
    var b = [];
    for (const doc of a.docs) {
      if (doc.data().status !== "moderation") continue;
      var tracks = await firedb
        .collection("album")
        .doc(doc.id)
        .collection("tracks")
        .get();

      for (const track of tracks.docs) {
        b.push(track.data());
      }
    }

    setModeration(b);
  }

  async function getApproved() {
    var a = await firedb.collection("album").get();
    var b = [];
    for (const doc of a.docs) {
      if (doc.data().status !== "approved") continue;
      var tracks = await firedb
        .collection("album")
        .doc(doc.id)
        .collection("tracks")
        .get();

      for (const track of tracks.docs) {
        b.push(track.data());
      }
    }

    setApproved(b);
  }

  async function getLive() {
    var a = await firedb.collection("album").get();
    var b = [];
    for (const doc of a.docs) {
      if (doc.data().status !== "live") continue;
      var tracks = await firedb
        .collection("album")
        .doc(doc.id)
        .collection("tracks")
        .get();

      for (const track of tracks.docs) {
        b.push(track.data());
      }
    }

    setLive(b);
  }
  async function getError() {
    var a = await firedb.collection("album").get();
    var b = [];
    for (const doc of a.docs) {
      if (doc.data().status !== "rejected") continue;
      var tracks = await firedb
        .collection("album")
        .doc(doc.id)
        .collection("tracks")
        .get();

      for (const track of tracks.docs) {
        b.push(track.data());
      }
    }

    setRejected(b);
  }
  async function getTakedown() {
    var a = await firedb.collection("album").get();
    var b = [];
    for (const doc of a.docs) {
      if (doc.data().status !== "takedown") continue;
      var tracks = await firedb
        .collection("album")
        .doc(doc.id)
        .collection("tracks")
        .get();

      for (const track of tracks.docs) {
        b.push(track.data());
      }
    }

    setTakedown(b);
  }
  return (
    <div className="flex border flex-wrap items-center h-16 m-16 ">
      <div
        onClick={() => settab(1)}
        className={`flex-grow py-5 cursor-pointer hover:text-black   ${
          tab === 1 ? active : passive
        }`}
      >
        <h1 className="ml-8 ">In Review ({inReview.length})</h1>
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
  );
}

export default Track;
