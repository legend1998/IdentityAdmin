import React, { useState } from "react";
import { firedb } from "./Firebaseconfig";
import { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from "react-router-dom";
import Album from "./LiveAlbum.js";
import Tracks from "./LiveTrack.js";

function Content() {
  const [tab, settab] = useState(1);
  const [show, setshow] = useState(false);
  const [filter, setfilter] = useState(false);
  const history = useHistory();
  const [album, setalbum] = useState([]);

  let active = "border-b-2 border-purple-700 bg-white";
  let passive = "bg-gray-50 text-gray-600 border";

  useEffect(() => {
    firedb.collection("album").onSnapshot((snapshot) => {
      var a = [];
      var counter = 1;
      snapshot.forEach((snap) => {
        if (snap.data()?.status === "pending") {
          a.push({ ...snap.data(), id: counter++, albumId: snap.id });
        }
      });
      setalbum(a);
    });
  }, []);

  function handleclick(row) {
    history.replace(`/panel/viewAlbum/${row.albumId}`);
  }

  const columns = [
    { field: "title", headerName: "Title", width: 190 },
    { field: "titleVersion", headerName: "TitleVersion", width: 110 },
    { field: "primaryArtist", headerName: "Artist", width: 200 },
    { field: "recordLabel", headerName: "Label", width: 200 },
    { field: "genre1", headerName: "Genre", width: 180 },
    { field: "upcEan", headerName: "UPC/EAN", width: 180 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: ({ row }) => (
        <div className="w-full h-full items-center ">
          <button
            className="appearance-none focus:outline-none w-20 h-8 bg-indigo-500   text-sm text-white"
            onClick={() => handleclick(row)}
          >
            View
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gray-100  h-screen">
      <div className="w-full bg-white h-24 flex items-center shadow-sm">
        <h1 className="text-3xl font-medium ml-8 pl-10 font-graphik ">
          Content
        </h1>
      </div>
      <div className="flex border flex-wrap items-center h-16 ">
        <div
          onClick={() => settab(1)}
          className={`flex-grow py-5 cursor-pointer hover:text-black   ${
            tab === 1 ? active : passive
          }`}
        >
          <i className="fas fa-record-vinyl mx-5"></i>Albums
        </div>
        <div
          onClick={() => settab(2)}
          className={`flex-grow py-5 cursor-pointer hover:text-black ${
            tab === 2 ? active : passive
          }`}
        >
          <i className="fas fa-music mx-5"></i> Tracks
        </div>
        <div
          onClick={() => settab(3)}
          className={`flex-grow py-5 cursor-pointer hover:text-black ${
            tab === 3 ? active : passive
          }`}
        >
          <i className="fas fa-video mx-5"></i> Video
        </div>
      </div>

      {tab === 1 ? <Album /> : null}
      {tab === 2 ? <Tracks /> : null}
    </div>
  );
}

export default Content;
