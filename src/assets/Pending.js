import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { firedb } from "../Firebaseconfig";
import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from "react-router";
function Pending() {
  const [album, setalbum] = useState([]);

  //hooks

  const history = useHistory();

  useEffect(() => {
    firedb.collection("album").onSnapshot((snapshot) => {
      var a = [];
      var counter = 1;
      snapshot.forEach((snap) => {
        if (snap.data()?.status === "pending" || !snap.data()?.status) {
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
    <div className="m-10 h-4/6 bg-white">
      <DataGrid rows={album} columns={columns} pageSize={20} />
    </div>
  );
}

export default Pending;
