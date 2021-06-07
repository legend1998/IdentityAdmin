import React, { useState } from "react";
import Album from "./LiveAlbum.js";
import Tracks from "./LiveTrack.js";

function Content() {
  const [tab, settab] = useState(1);

  let active = "border-b-2 border-purple-700 bg-white";
  let passive = "bg-gray-50 text-gray-600 border";

  return (
    <div className="bg-gray-100  h-screen">
      <div className="w-full bg-white h-24 flex items-center shadow-sm">
        <h1 className="text-3xl font-medium ml-8 pl-10 font-graphik ">
          Content
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
          <i className="fas fa-music mx-5"></i> Tracks
        </div>
        <div
          onClick={() => settab(3)}
          className={`flex-grow py-5 cursor-pointer hover:text-black ${
            tab === 3 ? active : passive
          }`}
        >
          <i className="fas fa-video mx-5"></i> Video
        </div>
      </div>

      {tab === 1 ? <Album /> : null}
      {tab === 2 ? <Tracks /> : null}
    </div>
  );
}

export default Content;