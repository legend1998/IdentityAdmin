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
                Artist :
                {currentTrack?.artist?.map((ar) => (
                  <span className="font-bold px-3">
                    {ar?.artistname}({ar?.type})
                  </span>
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
              <td>
                <button
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
