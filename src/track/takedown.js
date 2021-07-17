import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firedb } from "../Firebaseconfig";
import { useStateValue } from "../StateProvider";
import { useHistory } from "react-router";
import { AWN } from "awesome-notifications";

function InReview() {
  const [show, setshow] = useState(false);
  const [filter, setfilter] = useState(false);
  const [artist, setartist] = useState([]);
  const [label, setlabel] = useState([]);
  const [album, setalbum] = useState([]);
  const [track, setTracks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getTracks();
  }, []);

  async function getTracks() {
    var a = await firedb.collection("album").get();
    var b = [];
    for (const doc of a.docs) {
      if (doc.data().status !== "takedown") continue;
      var tracks = await firedb
        .collection("album")
        .doc(doc.id)
        .collection("tracks")
        .get();

      for (const track of tracks.docs) {
        b.push(track.data());
      }
    }

    setTracks(b);
  }

  function handleClick(id) {
    history.push("/panel/viewAlbum/" + id);
  }

  return (
    <div className=" ">
      <div className="">
        <div className="bg-white ">
          <div className="flex h-14  items-center flex-wrap">
            <button
              onClick={() => setfilter(!filter)}
              className={`px-7 hidden lg:block focus:outline-none ${
                filter ? "bg-filter text-white h-full" : null
              } `}
            >
              Filters <i class="fas fa-chevron-down ml-6"></i>
            </button>
            <div className="flex-grow flex items-center">
              <i className="fas fa-search p-2 text-gray-700 mt-2"></i>
              <input
                className="flex-grow h-7 outline-none text-gray-700"
                type="text"
                placeholder="Search by Title, Version, Artist, ISRC"
              />
            </div>
            <div className="duration-200">
              <button
                onClick={() => setshow(!show)}
                className=" bg-tabborder hover:bg-indigo-700 w-64 h-14   focus:outline-none text-white"
              >
                <span className="mx-16"> Actions</span>
                <i class="fas fa-chevron-down ml-6"></i>
              </button>
              {show ? (
                <ul className="absolute bg-white w-64  font-Light shadow-md  border cursor-pointer">
                  <li className="h-10 pt-3  pl-5 hover:bg-tab">
                    <Link to="/panel/create_new_release">
                      Create new release
                    </Link>
                  </li>
                  <li className="h-7 pl-5  hover:bg-tab">
                    Download full catalog (CSV)
                  </li>
                  <li className="h-8 pl-5  hover:bg-tab">
                    Download full catalog (XLSX)
                  </li>
                </ul>
              ) : null}
            </div>
          </div>
          <div className={filter ? "py-5 px-5 bg-filter" : "hidden"}>
            <div className="grid grid-rows-1 grid-cols-3 gap-6">
              <div className="">
                <p className="text-white my-3">Release Date</p>
                <select
                  className="flex-grow h-12 p-2 outline-none text-black w-full"
                  type="text"
                  placeholder="Type"
                >
                  <option value="all">All</option>
                  <option value="l7d">Last 7 days</option>
                  <option value="tm">This Month</option>
                  <option value="lm">Last Month</option>
                  <option value="ty">This Year</option>
                </select>
              </div>
              <div className="">
                <p className="text-white my-3">Version</p>
                <select
                  className="flex-grow h-12 p-2 outline-none text-black w-full"
                  type="text"
                  placeholder="Type"
                >
                  <option value="all">All</option>
                  <option value="cover">Cover</option>
                  <option value="remix">Remix</option>
                  <option value="orignal">Original</option>
                  <option value="extended">Extended</option>
                  <option value="instrumental">Instrumental</option>
                </select>
              </div>
              <div className="">
                <p className="text-white my-3">Status</p>
                <select
                  className="flex-grow h-12 p-2 outline-none text-black w-full"
                  type="text"
                  placeholder="Type"
                >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                  <option value="injested">Ingested</option>
                  <option value="moderation">Moderation</option>
                  <option value="approved">Approved</option>
                  <option value="live">Live</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className=" h-16 py-2 text-sm text-gray-500 flex items-end">
          {track.length === 0 ? "Nothing to show" : " Showing all Tracks"}
        </div>

        <div>
          <div className="bg-white mt-2 max-h-screen overflow-y-scroll  ">
            <table className=" capitalize table-fixed text-sm text-black w-full text-left overflow-scroll border-b">
              <thead className=" ">
                <tr className="h-16 border-b font-medium tracking-wide text-base  ">
                  <th className=" w-1/6 pl-8 font-medium text-base">
                    Track Title
                  </th>
                  <th className=" w-1/6 pl-8 font-medium text-base">Version</th>
                  <th className=" w-1/6 font-medium text-base">Artist</th>
                  <th className=" w-1/6 font-medium text-base">ISRC</th>
                  <th className=" w-2/6 font-medium text-base">Audio</th>
                </tr>
              </thead>
              <tbody className="cursor-pointer ">
                {track.map((t, index) => (
                  <tr
                    key={index}
                    className="h-20 text-lg font-Regular text-filter hover:bg-hover border-b"
                  >
                    <td className=" w-1/6  ">
                      <div className="flex justify-start items-center">
                        <p className="pl-8 "> {t.releaseTitle}</p>
                      </div>
                    </td>
                    <td className=" w-1/6  ">
                      <div className="flex justify-start items-center">
                        <p className="pl-8">{t.titleVersion}</p>
                      </div>
                    </td>
                    <td className=" w-1/6">{t.mainArtist}</td>
                    <td className=" w-2/6">{t.isrc}</td>
                    <td className=" w-2/6">
                      {" "}
                      <audio
                        src={t.trackURL}
                        className="w-full "
                        controls
                      ></audio>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {track.length === 0 ? (
              <div className="w-full h-56 flex items-center justify-center">
                <p className="text-sm text-sidetext">
                  You have no data to display.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InReview;
