import React, { useEffect, useState } from "react";
import { firedb } from "./Firebaseconfig";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

function VIewTrackAlbum({ id }) {
  const [tracks, setracks] = useState([]);
  const [open, setopen] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({});

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

  function viewTrack(t) {
    setCurrentTrack(t);
    setopen(true);
  }

  console.log(currentTrack);
  return (
    <div className="bg-white">
      <div>
        <Dialog
          open={open}
          maxWidth="lg"
          onClose={() => setopen(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Track Details</DialogTitle>
          <DialogContent>
            <div className="text-right">
              <p className="h-14 text-center p-5">crbt : {currentTrack.crbt}</p>
              <p className="h-14 text-center p-5">
                titleVersion : {currentTrack.titleVersion}
              </p>
              <p className="h-14 text-center p-5">isrc : {currentTrack.isrc}</p>
              <p className="h-14 text-center p-5">
                releaseTitle : {currentTrack.releaseTitle}
              </p>

              <p className="h-14 text-center p-5">
                Main Artist :
                {currentTrack?.mainArtist?.map((ar) => (
                  <span className="font-bold px-3">{ar}</span>
                ))}
              </p>

              <p className="h-14 text-center p-5">
                Artist :
                {currentTrack?.artist?.map((ar) => (
                  <span className="font-bold px-3">{ar}</span>
                ))}
              </p>
              <p className="h-14 text-center p-5">
                lyricLanguage : {currentTrack.lyricLanguage}
              </p>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setopen(false)} color="primary">
              back
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <table className="table-fixed text-gray-700 w-full h-full">
        <thead className="text-left">
          <tr className="h-12 border">
            <th className=" w-2/12 pl-10 font-medium ">Track Name</th>
            <th className="w-2/12 pl-5 font-medium ">Artist</th>
            <th className=" w-2/12 font-medium ">ISRC</th>
            <th className=" w-1/12 text-center font-medium ">CRBT Time</th>
            <th className="w-4/12 text-center font-medium ">Audio</th>
            <th className="w-1/12 text-center font-medium ">View</th>
          </tr>
        </thead>
        <tbody>
          {tracks.map((t, index) => (
            <tr
              key={index}
              className="h-16 text-left text-sm font-semibold border-b hover:bg-gray-50"
            >
              <td className=" w-2/12 pl-10 ">{t.releaseTitle}</td>
              <td className=" w-2/12 pl-5">{t.primaryArtist}</td>
              <td className=" w-2/12">{t.isrc}</td>
              <td className=" w-1/12 text-center">{t.crbt}</td>
              <td className=" w-4/12 pl-16">
                <audio src={t.trackURL} controls></audio>
              </td>
              <td className=" w-1/12 pl-8 ">
                <button
                  className="h-6 w-12 bg-blue-500 hover:bg-blue-800 text-white text-center justify-center"
                  onClick={() => {
                    setCurrentTrack(t);
                    setopen(true);
                  }}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VIewTrackAlbum;
