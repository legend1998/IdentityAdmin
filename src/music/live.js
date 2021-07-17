import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firedb } from "../Firebaseconfig";
import { useStateValue } from "../StateProvider";
import { useHistory } from "react-router";
import { AWN } from "awesome-notifications";

function Live() {
  const [show, setshow] = useState(false);
  const [filter, setfilter] = useState(false);
  const [artist, setartist] = useState([]);
  const [label, setlabel] = useState([]);
  const [album, setalbum] = useState([]);
  const history = useHistory();

  useEffect(() => {
    firedb.collection("album").onSnapshot((snaphshot) => {
      var a = [];
      snaphshot.forEach((snap) => {
        if (snap.data()?.status === "live" || !snap.data()?.status) {
          a.push({ ...snap.data(), id: snap.id });
        }
      });
      setalbum(a);
    });
  }, []);

  function handleClick(id) {
    history.push("/panel/ReviewAlbum/" + id);
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
                placeholder="Search by Title, Artist, Label, UPC"
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
            <div className="grid grid-rows-2 grid-cols-3 gap-6">
              <div className="">
                <p className="text-white my-3">Release Date</p>
                <select
                  className="flex-grow h-12 p-2 outline-none text-gray-700 w-full"
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
                <p className="text-white my-3">Artist</p>
                <select
                  className="flex-grow h-12 p-2 outline-none text-gray-700 w-full"
                  type="text"
                  placeholder="Type"
                >
                  <option value="all">All</option>

                  {artist.map((art, index) => (
                    <option value={art.name} key={index}>
                      {art.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="">
                <p className="text-white my-3">Status</p>
                <select
                  className="flex-grow h-12 p-2 outline-none text-gray-700 w-full"
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
              <div className="">
                <p className="text-white my-3">Label</p>
                <select
                  className="flex-grow h-12 p-2 outline-none text-gray-700 w-full"
                  type="text"
                  placeholder="Type"
                >
                  <option value="default" defaultValue>
                    All
                  </option>
                  {label.map((lab, i) => (
                    <option key={i} value={lab.label}>
                      {lab.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className=" h-16 py-2 text-sm text-gray-500 flex items-end">
          {album.length === 0 ? "Nothing to show" : " Showing all Albums"}
        </div>
        <div>
          <div className="bg-white mt-2 max-h-screen overflow-y-scroll  ">
            <table className=" capitalize table-fixed text-sm text-black w-full text-left overflow-scroll border-b">
              <thead className=" ">
                <tr className="h-16 border-b font-medium tracking-wide text-base  ">
                  <th className=" w-24 "></th>
                  <th className=" w-2/6 pl-2 font-medium text-base">
                    Album Name
                  </th>
                  <th className=" w-1/6 font-medium text-base">Artist</th>
                  <th className=" w-1/6 font-medium text-base">Label</th>
                  <th className=" w-1/6 font-medium text-base">UPC</th>
                  <th className=" w-1/6 font-medium text-base">Release Date</th>
                </tr>
              </thead>
              <tbody className="cursor-pointer ">
                {album.map((a, index) => (
                  <tr
                    key={index}
                    onClick={() => handleClick(a.id)}
                    className="h-20 text-lg font-Regular text-filter hover:bg-hover border-b"
                  >
                    <td className="text-center pl-6">
                      <img src={a.coverImage} width="50px" alt="" />
                    </td>
                    <td className=" w-2/6  ">
                      <div className="flex justify-start items-center">
                        <p className="pl-2"> {a.title}</p>
                      </div>
                    </td>
                    <td className=" w-1/6">{a.primaryArtist}</td>
                    <td className=" w-2/6">{a.recordLabel}</td>
                    <td className=" w-1/6">{a.upcEan}</td>
                    <td className=" w-1/6">{a.releaseDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {album.length === 0 ? (
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

export default Live;
