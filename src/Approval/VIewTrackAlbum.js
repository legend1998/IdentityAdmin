import React, { useEffect, useState } from "react";
import { firedb } from "../Firebaseconfig";
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
  console.log(currentTrack);
  return (
    <div className="bg-white">
      <div>
        <Dialog
          open={open}
          onClose={() => setopen(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Track Details</DialogTitle>
          <DialogContent>
            <div className="">
              <p className="h-14 text-center p-5">crbt : {currentTrack.crbt}</p>
              <p className="h-14 text-center p-5">
                titleVersion : {currentTrack.titleVersion}
              </p>
              <p className="h-14 text-center p-5">isrc : {currentTrack.isrc}</p>
              <p className="h-14 text-center p-5">
                releaseTitle : {currentTrack.releaseTitle}
              </p>

              <p className="h-14 text-center p-5">
                Main Artist: {currentTrack.mainArtist}
              </p>

              <div className=" text-left p-5">
                Artist :
                {currentTrack?.artist?.map((ar) => (
                  <p>
                    {" "}
                    <span className="font-bold px-3">{ar.type}</span>{" "}
                    <span className="font-bold px-3">{ar.artistname}</span>
                  </p>
                ))}
              </div>
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
      <div>
        <div className="bg-white mt-2 max-h-screen overflow-y-scroll  ">
          <table className=" capitalize table-fixed text-sm text-black w-full text-left overflow-scroll border-b">
            <thead className=" ">
              <tr className="h-16 border-b font-medium tracking-wide text-base  ">
                <th className=" w-24 "></th>
                <th className=" w-2/6 pl-2 font-medium text-base">
                  Track Name
                </th>
                <th className=" w-1/6 font-medium text-base">Artist</th>
                <th className=" w-1/6 font-medium text-base">Explicit</th>
                <th className=" w-1/6 font-medium text-base">Language</th>
                <th className=" w-1/6 font-medium text-base">ISRC</th>
              </tr>
            </thead>
            <tbody className="cursor-pointer ">
              {tracks.map((t, index) => (
                <tr
                  onClick={() => {
                    setCurrentTrack(t);
                    setopen(true);
                  }}
                  key={index}
                  className="h-20 text-lg font-Regular text-filter hover:bg-hover border-b"
                >
                  <td className="text-center pl-6"></td>
                  <td className=" w-2/6  ">
                    <div className="flex justify-start items-center">
                      <p className="pl-2"> {t.releaseTitle}</p>
                    </div>
                  </td>
                  <td className=" w-1/6">{t.mainArtist}</td>
                  <td className=" w-2/6">{t.explicit}</td>
                  <td className=" w-1/6">{t.lyricLanguage}</td>
                  <td className=" w-1/6">{t.isrc}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {tracks.length === 0 ? (
            <div className="w-full h-56 flex items-center justify-center">
              <p className="text-sm text-sidetext">
                You have no data to display.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default VIewTrackAlbum;
