import React, { useEffect, useState } from "react";
import OverViewAlbum from "./OverViewAlbum";
import VIewTrackAlbum from "./VIewTrackAlbum";
import ViewAlbumStats from "./ViewAlbumStats";
import ViewAlbumMore from "./ViewAlbumMore";
import { useParams } from "react-router";
import { firedb } from "./Firebaseconfig";
import AWN from "awesome-notifications";
import { useHistory } from "react-router-dom";
import { statusSwitch } from "./utils/Utils";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function Viewalbum() {
  const params = useParams();
  const history = useHistory();
  const [show, setshow] = useState(false);
  const [tab, setab] = useState(1);
  const [album, setalbum] = useState(null);
  const [open, setopen] = useState(false);
  const [status, setStatus] = useState("");
  const [message, setmessage] = useState("");
  const [error, seterror] = useState("");
  const [users, setusers] = useState([]);

  useEffect(() => {
    firedb
      .collection("album")
      .doc(params.id)
      .get()
      .then((res) => {
        setalbum(res.data());
      })
      .catch((e) => {
        new AWN().alert(e.message);
      });
  }, [params.id]);

  function confirmchanges() {
    let notifier = new AWN();
    firedb
      .collection("album")
      .doc(params.id)
      .update({
        status: status,
        message: message,
        error: error,
      })
      .then(() => {
        setalbum({ ...album, status: status, message: message, error: error });

        notifier.info("status updated.");
      })
      .catch((e) => {
        notifier.info(e.message);
      });
    setopen(false);
  }

  function setstatus(status) {
    setopen(true);
    setStatus(status);
  }

  const passive =
    "text-gray-500 border-b-2  border-tab text-base bg-tab w-1/4 text-center h-16 py-5 cursor-pointer";
  const active =
    "border-b-2  border-indigo-500 bg-white w-1/4 text-center py-5 h-16 font-medium cursor-pointer";

  function handleClose() {
    setopen(false);
  }

  if (!album)
    return (
      <div className="w-full flex items-center justify-center h-44">
        <i className="fas fa-spinner"></i>
      </div>
    );
  else
    return (
      <div>
        {/* header */}
        <Dialog
          open={open}
          maxWidth="md"
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Album Status</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Reason of changes or suggestion.
            </DialogContentText>
            <TextField
              autoFocus
              onChange={(e) => setmessage(e.target.value)}
              defaultValue=""
              margin="dense"
              id="name"
              label="Add Message"
              type="email"
              fullWidth
            />

            <textarea
              autoFocus
              id="name"
              label="Add Error"
              defaultValue={album?.error}
              onChange={(e) => seterror(e.target.value)}
              placeholder="Add Error"
              className={
                "border w-full h-64 focus:outline-none p-5 bg-gray-50 text-sm"
              }
            ></textarea>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmchanges} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
        <div className="flex px-3 py-8 flex-wrap">
          <div className="w-20 text-center">
            <i
              onClick={() => {
                history.replace("/panel/assets");
              }}
              className="fas fa-arrow-left fa-2x py-5 hover:text-gray-600 cursor-pointer"
            ></i>
          </div>
          <div className="flex-1 flex min-w-max">
            <img src={album.coverImage} width="180px" alt="" />
            <div className="px-5 w-full">
              <div className="flex items-center justify-center">
                <h2 className=" flex-1 text-3xl font-medium py-5 border-b">
                  {album.title}
                </h2>
                {statusSwitch(album?.status)}
              </div>
              <p className="">by {album.primaryArtist}</p>
              <p className="">Released Date: {album.releaseDate}</p>
              <p className="">UPC: {album.upcEan}</p>
              <p className="">User: {album.email}</p>
            </div>
          </div>
          {/* action */}
          <div className="py-3">
            <button
              onClick={() => setshow(!show)}
              className="bg-blue-700 hover:bg-blue-800 w-64 h-12 focus:outline-none text-white"
            >
              Actions &#x2304;
            </button>
            {show ? (
              <ul className="absolute bg-white w-64 rounded font-Light shadow-lg  border cursor-pointer">
                <li className="h-8 pl-5 p-2 hover:bg-gray-300 ">
                  <a href={album?.coverImage} className="" target="blank">
                    Download Artwork
                  </a>
                </li>
                <li className="h-6 pl-5  hover:bg-gray-100">
                  Download Metadata (CSV)
                </li>
                <li className="h-6 pl-5  hover:bg-gray-100">
                  Download Metadata (XLSX)
                </li>

                <li
                  onClick={() => setstatus("rejected")}
                  className="h-6 pl-5  hover:bg-gray-100"
                >
                  Reject Release
                </li>
                <li
                  onClick={() => setstatus("injested")}
                  className="h-6 pl-5  hover:bg-gray-100"
                >
                  Injest Release
                </li>
                <li
                  onClick={() => setstatus("moderation")}
                  className="h-6 pl-5  hover:bg-gray-100"
                >
                  Moderation Release
                </li>
                <li
                  onClick={() => setstatus("approved")}
                  className="h-6 pl-5  hover:bg-gray-100"
                >
                  Approve Release
                </li>
                <li
                  onClick={() => setstatus("live")}
                  className="h-6 pl-5  hover:bg-gray-100"
                >
                  Live Release
                </li>
                <li
                  onClick={() => setstatus("takedown")}
                  className="h-6 pl-5  hover:bg-gray-100"
                >
                  Takedown Release
                </li>
              </ul>
            ) : null}
          </div>
        </div>

        <div className="flex border">
          <span
            className={tab === 1 ? active : passive}
            onClick={() => setab(1)}
          >
            Overview
          </span>
          <span
            className={tab === 2 ? active : passive}
            onClick={() => setab(2)}
          >
            Tracks
          </span>
          <span
            className={tab === 3 ? active : passive}
            onClick={() => setab(3)}
          >
            Stats
          </span>
          <span
            className={tab === 4 ? active : passive}
            onClick={() => setab(4)}
          >
            More
          </span>
        </div>
        {/* body */}
        <div className="bg-background min-h-screen p-10">
          {tab === 1 ? <OverViewAlbum data={album} /> : null}
          {tab === 2 ? <VIewTrackAlbum id={params.id} /> : null}
          {tab === 3 ? (
            <ViewAlbumStats
              id={params.id}
              stats={album?.stats}
              earnings={album?.earnings}
            />
          ) : null}
          {tab === 4 ? <ViewAlbumMore codes={album?.codes} /> : null}
        </div>
      </div>
    );
}

export default Viewalbum;
