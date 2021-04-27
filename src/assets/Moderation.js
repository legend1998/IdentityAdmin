import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useEffect } from "react";
import { firedb } from "../Firebaseconfig";

function Moderation() {
  const [album, setalbum] = useState([]);

  useEffect(() => {
    firedb.collection("album").onSnapshot((snapshot) => {
      var a = [];
      var counter = 1;
      snapshot.forEach((snap) => {
        if (snap.data()?.status === "moderation") {
          a.push({ ...snap.data(), id: counter++ });
        }
      });
      setalbum(a);
    });
  }, []);

  console.log(album);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "titleVersion", headerName: "TitleVersion", width: 130 },
    { field: "primaryArtist", headerName: "Artist", width: 150 },
    { field: "label", headerName: "Label", width: 130 },
    { field: "releaseDate", headerName: "Release Date", width: 200 },
    { field: "upcEan", headerName: "UPC/EAN", width: 150 },
    { field: "isrc", headerName: "ISRC", width: 160 },
    { field: "actions", headerName: "Actions", width: 130 },
  ];

  return (
    <div className="m-10 h-5/6 bg-white">
      <DataGrid
        rows={album}
        columns={columns}
        pageSize={20}
        checkboxSelection
      />
    </div>
  );
}

export default Moderation;
