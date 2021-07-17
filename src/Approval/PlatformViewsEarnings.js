import React from "react";
import { useRef } from "react";
import validateRefs from "./utils/Utils";
import AWN from "awesome-notifications";

function PlatformViewsEarnings({ d, data, setdata }) {
  const gaana = useRef();
  const wynk = useRef();
  const hungama = useRef();
  const spotify = useRef();
  const saavan = useRef();
  const amazonMusic = useRef();
  const youtube = useRef();
  const youtubeContentID = useRef();
  const other = useRef();
  const crbt = useRef();
  const dateyear = useRef();

  console.log(data);

  var refs = [
    gaana,
    dateyear,
    wynk,
    hungama,
    spotify,
    saavan,
    amazonMusic,
    youtube,
    youtubeContentID,
    other,
    crbt,
  ];

  function handleclick() {
    var res = validateRefs(refs);
    if (res.success) {
      const d = {
        year: new Date(dateyear.current.value).getFullYear(),
        month: new Date(dateyear.current.value).toLocaleString("default", {
          month: "long",
        }),
        gaana: Number.parseInt(gaana.current.value),
        wynk: Number.parseInt(wynk.current.value),
        hungama: Number.parseInt(hungama.current.value),
        spotify: Number.parseInt(spotify.current.value),
        saavan: Number.parseInt(saavan.current.value),
        amazonMusic: Number.parseInt(amazonMusic.current.value),
        youtube: Number.parseInt(youtube.current.value),
        youtubeContentID: Number.parseInt(youtubeContentID.current.value),
        other: Number.parseInt(other.current.value),
        crbt: Number.parseInt(crbt.current.value),
      };
      setdata([...data, d]);
    } else {
      new AWN().warning(res.message);
    }
  }

  return (
    <div className="">
      <div>
        <input
          type="date"
          name="date and year"
          id=""
          ref={dateyear}
          defaultValue={d?.dateyear}
        />
      </div>
      <div>
        <span className="w-48 bg-red-500  h-52"> gaana : </span>
        <input
          ref={gaana}
          type="number"
          defaultValue={d?.gaana}
          disabled={d?.gaana}
          min="0"
          className="m-3 p-3 border focus:outline-none appearance-none"
          placeholder="gaana"
        />
      </div>
      <p>
        wynk :
        <input
          ref={wynk}
          type="number"
          defaultValue={d?.wynk}
          disabled={d?.wynk}
          min="0"
          className="m-3 p-3 border focus:outline-none appearance-none"
          placeholder="wynk"
        />
      </p>
      <p>
        hungama :
        <input
          ref={hungama}
          type="number"
          defaultValue={d?.hungama}
          disabled={d?.hungama}
          min="0"
          className="m-3 p-3 border focus:outline-none appearance-none"
          placeholder="hungama"
        />
      </p>
      <p>
        spotify :
        <input
          ref={spotify}
          type="number"
          defaultValue={d?.spotify}
          disabled={d?.spotify}
          min="0"
          className="m-3 p-3 border focus:outline-none appearance-none"
          placeholder="spotify"
        />
      </p>
      <p>
        saavan :
        <input
          ref={saavan}
          type="number"
          defaultValue={d?.saavan}
          disabled={d?.saavan}
          min="0"
          className="m-3 p-3 border focus:outline-none appearance-none"
          placeholder="saavan"
        />
      </p>
      <p>
        amazonMusic :
        <input
          ref={amazonMusic}
          type="number"
          defaultValue={d?.amazonMusic}
          disabled={d?.amazonMusic}
          min="0"
          className="m-3 p-3 border focus:outline-none appearance-none"
          placeholder="amazon music"
        />
      </p>
      <p>
        youtube :
        <input
          ref={youtube}
          type="number"
          defaultValue={d?.youtube}
          disabled={d?.youtube}
          min="0"
          className="m-3 p-3 border focus:outline-none appearance-none"
          placeholder="youtube"
        />
      </p>
      <p>
        youtube content id :
        <input
          ref={youtubeContentID}
          type="number"
          defaultValue={d?.youtubeContentID}
          disabled={d?.youtubeContentID}
          min="0"
          className="m-3 p-3 border focus:outline-none appearance-none"
          placeholder="youtube content id"
        />
      </p>
      <p>
        other :
        <input
          ref={other}
          type="number"
          defaultValue={d?.other}
          disabled={d?.other}
          min="0"
          className="m-3 p-3 border focus:outline-none appearance-none"
          placeholder="other"
        />
      </p>
      <p>
        <span className="bg-red-100 w-44">crbt</span>
        <input
          ref={crbt}
          type="number"
          defaultValue={d?.crbt}
          disabled={d?.crbt}
          min="0"
          className="m-3 p-3 border focus:outline-none appearance-none"
          placeholder="crbt"
        />
      </p>
      <button
        className="focus:outline-none m-3 p-3 w-44 bg-indigo-400 text-white"
        onClick={() => handleclick()}
      >
        save
      </button>
    </div>
  );
}

export default PlatformViewsEarnings;
