import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect } from "react";
import { useState } from "react";
import { firedb } from "../Firebaseconfig";
import { useHistory } from "react-router-dom";

function Approved() {
  const [album, setalbum] = useState([]);
  const history = useHistory();

  useEffect(() => {
    firedb.collection("album").onSnapshot((snapshot) => {
      var a = [];
      var counter = 1;
      snapshot.forEach((snap) => {
        if (snap.data()?.status === "approved") {
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
    { field: "id", headerName: "ID", width: 20 },
    { field: "title", headerName: "Title", width: 180 },
    { field: "titleVersion", headerName: "TitleVersion", width: 130 },
    { field: "primaryArtist", headerName: "Artist", width: 150 },
    { field: "label", headerName: "Label", width: 130 },
    { field: "releaseDate", headerName: "Release Date", width: 150 },
    { field: "upcEan", headerName: "UPC/EAN", width: 150 },
    { field: "isrc", headerName: "ISRC", width: 160 },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: ({ row }) => (
        <div className="w-full h-full">
          <button
            className="appearance-none focus:outline-none w-full h-full border"
            onClick={() => handleclick(row)}
          >
            <i className="fas fa-edit"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="m-10 h-5/6 bg-white">
      <DataGrid rows={album} columns={columns} pageSize={20} />
    </div>
  );
}

export default Approved;
