import React, { useEffect, useState } from "react";
import { firedb } from "../Firebaseconfig";

import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import AWN from "awesome-notifications";

function VIewTrackAlbum({ id }) {
  const [tracks, setracks] = useState([]);
  const [open, setopen] = useState(false);
  const params = useParams();
  const [lyrics, setlyrics] = useState(false);
  const [additional, setadditional] = useState(false);
  const [keyartist, setkeyartist] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({});
  const [track, settrack] = useState(false);

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
    <div>
      {tracks.map((t, index) => (
        <div className=" bg-background   ">
          <div className="bg-white h-auto w-full">
            <div className=" border-b m-6 ">
              <p className="font-base mb-5 pt-5 text-2xl"> Track - {index}</p>
            </div>
            <div className="grid grid-flow-col grid-cols-2 grid-rows-1 5 m-6">
              <div className=" m-6 mb-8">
                <p className="text-xl pb-2 font-medium">
                  Track Title <span className="text-red-500">*</span>
                </p>

                <input
                  type="text"
                  defaultValue={t.releaseTitle}
                  placeholder="The name of your release"
                  className="h-14 px-5 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
                />
              </div>
              <div className=" m-6 mb-8">
                <p className="text-xl pb-2 font-medium">
                  Title Version <span className="text-red-500">*</span>
                </p>
                <input
                  type="text"
                  defaultValue={t.titleVersion}
                  placeholder="Track version"
                  className="h-14 px-5 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
                />
              </div>
            </div>
            <div className=" ml-12 mr-12 pb-8">
              <p className="text-xl pb-2 font-medium">
                Audio<span className="text-red-500">*</span>{" "}
              </p>
              <input
                type="text"
                placeholder="Click here to upload your audio file (mp3 format file only.
                  Recommended min bitrate: 320kbps; sample rate: 44.1 kHz)"
                defaultValue={t.lyricLanguage}
                className="h-14 px-5 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
              />
            </div>
            <div className=" ml-12 mr-12 pb-8">
              <p className="text-xl pb-2 font-medium">
                Language of Lyrics<span className="text-red-500">*</span>{" "}
                <span className=" text-xs text-gray-500">
                  (Select "Instrumental" if track has no lyrics)
                </span>
              </p>
              <input
                type="text"
                placeholder="Lyrics Language"
                defaultValue={t.lyricLanguage}
                className="h-14 px-5 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
              />
            </div>
            <div className=" ml-12 mr-12 pb-8">
              <p className="text-xl pb-2 font-medium">
                Artist(s) – indicate ONLY ONE per field
                <span className="text-red-500">*</span>
              </p>
              <input
                type="text"
                defaultValue={t.mainArtist}
                placeholder="Artist Name"
                className="h-14 px-5 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
              />
            </div>
            <div className=" ml-12 mr-12 ">
              <p
                className="text-xl pb-2 font-medium cursor-pointer"
                onClick={() => setkeyartist(!keyartist)}
              >
                <i className="fas fa-caret-right mr-5"></i>Key Artists
                <span className="text-red-500"> *</span>
              </p>
            </div>
            <div className={keyartist ? "" : "hidden"}>
              {t?.artist?.map((ar) => (
                <div className="flex items-center justify-start ml-12 mr-12 mt-2">
                  <div className="w-56 capitalize bg-box text-left p-5 h-14 pt-4 text-black font-medium">
                    {ar.type}
                  </div>

                  <input
                    type="text"
                    placeholder="Name"
                    defaultValue={ar.artistname}
                    className="h-14 w-full ml-5 pl-5 bg-box appearance-none outline-none  border border-box focus:border-purple-700"
                  />
                </div>
              ))}{" "}
            </div>
            <div className=" ml-12 mr-12 mt-8 pb-8">
              <p className="text-xl pb-2 font-medium">
                ISRC
                <span className="text-red-500">*</span>
              </p>
              <input
                type="text"
                placeholder="ISRC"
                defaultValue={t?.isrc}
                className="h-14 px-5 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
              />
            </div>{" "}
            <div className=" ml-12 mr-12 pb-8">
              <p className="text-xl pb-2 font-medium">
                Explicit Lyrics
                <span className="text-red-500">*</span>
              </p>
              <input
                type="text"
                defaultValue={t?.explicit}
                placeholder="Explicit Lyrics"
                className="h-14 px-5 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
              />
            </div>{" "}
            <div className=" ml-12 mr-12 pb-8">
              <p className="text-xl pb-2 font-medium">CRBT Timing</p>
              <input
                type="text"
                defaultValue={t?.crbt}
                placeholder="Explicit Lyrics"
                className="h-14 px-5 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
              />
            </div>
            <div className="m-12">
              <h3
                className="cursor-pointer border-t py-4 text-2xl font-normal "
                onClick={() => setadditional(!additional)}
              >
                <i className="fas fa-caret-right mr-5"></i> Additional Info
              </h3>
              <div className={additional ? "" : "hidden"}>
                <div className="grid grid-cols-2 gap-6 my-5" name="additional">
                  <div className="col" name="additional">
                    <p className="text-lg  font-medium pb-2 ">(C) Line</p>
                    <input
                      type="text"
                      placeholder="Eg: 2021 Label Name"
                      defaultValue={t?.cline}
                      className="h-14 px-5 w-full bg-box appearance-none outline-none  focus:border-purple-700"
                    />
                  </div>
                  <div className="col">
                    <p className="text-lg  font-medium pb-2 ">(P) Line</p>
                    <input
                      type="text"
                      defaultValue={t?.pline}
                      placeholder="Eg: 2021 Label Name"
                      className="h-14 px-5 w-full bg-box appearance-none outline-none  focus:border-purple-700"
                    />
                  </div>
                </div>
              </div>
              <h3
                className="cursor-pointer border-t py-4 text-2xl font-normal"
                onClick={() => setlyrics(!lyrics)}
              >
                <i className="fas fa-caret-right mr-5"></i> Lyrics
              </h3>
              <textarea
                name="lyrics"
                defaultValue={t?.lyrics}
                className={
                  lyrics
                    ? "border border-box focus:border-blue-500 w-full h-64 focus:outline-none p-5 bg-box text-sm"
                    : "hidden"
                }
              ></textarea>
            </div>
            <button className="h-14 w-44 bg-indigo-500 ml-12 mb-8 text-white p-3 focus:outline-none">
              Save
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default VIewTrackAlbum;
