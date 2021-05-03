import React, { useEffect, useState } from "react";
import { firedb } from "./Firebaseconfig";

function VIewTrackAlbum({ id }) {
  const [tracks, setracks] = useState([]);

  useEffect(() => {
    firedb
      .collection("album")
      .doc(id)
      .collection("tracks")
      .onSnapshot((trackshot) => {
        var a = [];
        trackshot.forEach((snaptrack) => {
          a.push(snaptrack.data());
        });
        setracks(a);
      });
  }, []);
  return (
    <div className="bg-white">
      <table className="table-fixed text-xs text-gray-700 w-full h-60">
        <thead className="text-left">
          <tr className="h-12 border">
            <th className=" w-1/12"></th>
            <th className=" w-2/12">Track Name</th>
            <th className="w-2/12">Artist</th>
            <th className=" w-1/12">ISRC</th>
            <th className="w-4/12">Audio</th>
            <th className=" w-1/12">Language</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((t, index) => (
            <tr
              key={index}
              className="h-12 text-left text-sm    font-semibold border-b hover:bg-gray-50"
            >
              <td>
                <input
                  type="checkbox"
                  className="w-8 h-8 border focus:outline-none mx-4"
                />
              </td>
              <td>{t.releaseTitle}</td>
              <td>{t.primaryArtist}</td>
              <td>{t.isrc}</td>
              <td>
                <audio src={t.trackURL} controls></audio>
              </td>
              <td>{t.lyricLanguage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VIewTrackAlbum;
