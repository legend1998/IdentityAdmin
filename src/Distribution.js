import React, { useState } from "react";
import { firedb } from "./Firebaseconfig";
import { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from "react-router-dom";

function Distribution() {
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
        if (snap.data()?.status === "live") {
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
          Distribution
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
          <i className="fas fa-phone mx-5"></i> Ringtone
        </div>
        <div
          onClick={() => settab(3)}
          className={`flex-grow py-5 cursor-pointer hover:text-black ${
            tab === 3 ? active : passive
          }`}
        >
          <i className="fas fa-music mx-5"></i> Video
        </div>
      </div>
      <div className="lg:px-12 md:px-1 py-5 ">
        <div className="bg-white">
          <div className="flex h-14 items-center flex-wrap">
            <button
              onClick={() => setfilter(!filter)}
              className={`px-7 hidden lg:block focus:outline-none ${
                filter ? "bg-black text-white h-full" : null
              } `}
            >
              Filters &#x2304;
            </button>
            <div className="flex-grow flex items-center">
              <i className="fas fa-search p-2"></i>
              <input
                className="flex-grow h-7 outline-none text-gray-700"
                type="text"
                placeholder="Search by title, artist, label, UPC"
              />
            </div>
            <div className="duration-200">
              <button
                onClick={() => setshow(!show)}
                className=" bg-blue-700 hover:bg-blue-800 w-64 h-14  focus:outline-none text-white"
              >
                Actions &#x2304;
              </button>
              {show ? (
                <ul className="absolute bg-white w-64 rounded font-Light shadow-lg  border cursor-pointer">
                  <li className="h-7 pt-1  pl-5 hover:bg-gray-100">
                    Create new release
                  </li>
                  <li className="h-6 pl-5  hover:bg-gray-100">
                    Download full catalog (CSV)
                  </li>
                  <li className="h-6 pl-5 hover:bg-gray-100">
                    Download full catalog (XLSX)
                  </li>
                </ul>
              ) : null}
            </div>
          </div>
          <div className={filter ? "py-5 px-5 bg-black" : "hidden"}>
            <div className="grid grid-rows-2 grid-cols-3 gap-6">
              <div className="">
                <p className="text-white my-3">Release Date</p>
                <select
                  className="flex-grow h-12 p-2 outline-none text-gray-700 w-full"
                  type="text"
                  placeholder="Type"
                >
                  <option value="all">All</option>
                  <option value="l7d">Last 7 days</option>
                  <option value="tm">This Month</option>
                  <option value="lm">Last Month</option>
                  <option value="ty">This Year</option>
                </select>
              </div>
              <div className="">
                <p className="text-white my-3">Artist</p>
                <select
                  className="flex-grow h-12 p-2 outline-none text-gray-700 w-full"
                  type="text"
                  placeholder="Type"
                >
                  <option value="all">All</option>
                </select>
              </div>
              <div className="">
                <p className="text-white my-3">Status</p>
                <select
                  className="flex-grow h-12 p-2 outline-none text-gray-700 w-full"
                  type="text"
                  placeholder="Type"
                >
                  <option value="all">All</option>
                </select>
              </div>
              <div className="">
                <p className="text-white my-3">Genre</p>
                <select
                  className="flex-grow h-12 p-2 outline-none text-gray-700 w-full"
                  type="text"
                  placeholder="Type"
                >
                  <option value="all">All</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className=" h-16 py-2 text-xs text-gray-500 flex items-end">
          Showing all Albums
        </div>
      </div>
      <div className="ml-10 mr-10 h-3/4 bg-white">
        <DataGrid rows={album} columns={columns} pageSize={20} />
      </div>
    </div>
  );
}

export default Distribution;
