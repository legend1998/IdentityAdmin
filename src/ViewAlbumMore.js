import React, { useEffect, useState } from "react";
import { firedb } from "./Firebaseconfig";
import AWN from "awesome-notifications";
import { useParams } from "react-router";
import { statusSwitch } from "./utils/Utils";
import { Link } from "react-router-dom";

function ViewAlbumMore({ data }) {
  const [album, setalbum] = useState(null);
  const [showModal, setShowModal] = React.useState(false);

  const params = useParams();
  const [showg, setShowg] = React.useState(false);
  const [showw, setShoww] = React.useState(false);
  const [showh, setShowh] = React.useState(false);
  const [showj, setShowj] = React.useState(false);
  const [showy, setShowy] = React.useState(false);
  const [shows, setShows] = React.useState(false);
  const [showa, setShowa] = React.useState(false);
  const [showr, setShowr] = React.useState(false);
  const [showam, setShowam] = React.useState(false);
  const [gaana, setGaana] = React.useState(false);
  const [wynk, setWynk] = React.useState(false);
  const [hungama, setHuangama] = React.useState(false);
  const [saavan, setSaavan] = React.useState(false);
  const [youtube, setYoutube] = React.useState(false);
  const [spotify, setSpotify] = React.useState(false);
  const [apple, setApple] = React.useState(false);
  const [resso, setResso] = React.useState(false);
  const [amazon, setAmazon] = React.useState(false);

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

  function saveLinks() {
    firedb
      .collection("album")
      .doc(params.id)
      .update({
        links: {
          Gaana: gaana,
          Wynk: wynk,
          Hungama: hungama,
          Saavan: saavan,
          Ytmusic: youtube,
          Spotify: spotify,
          Apple: apple,
          Resso: resso,
          amazon: amazon,
        },
      })
      .then(() => {
        new AWN().success("Links have been added successfully");
        setShowModal(false);
      })
      .catch((e) => {
        new AWN().alert(e.message);
      });
  }

  return (
    <div className="">
      <div className="bg-white m-10">
        <div className="flex h-14  items-center flex-wrap">
          <div className="flex-grow flex items-center">
            <p className="pl-12">Release links must be updated here.</p>
          </div>
          <div className="duration-200">
            <button
              className=" bg-tabborder hover:bg-indigo-700 w-64 h-14   focus:outline-none text-white"
              onClick={() => setShowModal(true)}
            >
              <span className="mx-16"> Add Links</span>
            </button>
            {showModal ? (
              <>
                <div className="    ml-48 duration-200 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-full my-6 mx-auto max-w-5xl">
                    {/*content*/}
                    <div className="border-b   shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-3 pl-8 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-2xl font-medium">
                          Add Release Links
                        </h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-albums  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowModal(false)}
                        >
                          <span className=" text-red  h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 pl-6 h-96 overflow-scroll overflow-x-hidden">
                        <p className="mb-4 text-filter text-lg leading-relaxed">
                          Add Links here
                        </p>
                        <div>
                          <input
                            type="url"
                            placeholder="Gaana"
                            defaultValue={album?.links?.gaana}
                            onChange={(e) => setGaana(e.target.value)}
                            className="h-12 px-5 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
                          />
                        </div>
                        <div>
                          <input
                            type="url"
                            placeholder="Wynk Music"
                            defaultValue={album?.links?.wynk}
                            onChange={(e) => setWynk(e.target.value)}
                            className="h-12 px-5 mt-3 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
                          />
                        </div>
                        <div>
                          <input
                            type="url"
                            placeholder="Hungama"
                            defaultValue={album?.links?.hungama}
                            onChange={(e) => setHuangama(e.target.value)}
                            className="h-12 px-5 mt-3 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
                          />
                        </div>
                        <div>
                          <input
                            type="url"
                            placeholder="Jio Saavan"
                            defaultValue={album?.links?.saavan}
                            onChange={(e) => setSaavan(e.target.value)}
                            className="h-12 px-5 mt-3 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
                          />
                        </div>
                        <div>
                          <input
                            type="url"
                            placeholder="Youtube Music"
                            defaultValue={album?.links?.youtube}
                            onChange={(e) => setYoutube(e.target.value)}
                            className="h-12 px-5 mt-3 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
                          />
                        </div>
                        <div>
                          <input
                            type="url"
                            placeholder="Spotify"
                            defaultValue={album?.links?.spotify}
                            onChange={(e) => setSpotify(e.target.value)}
                            className="h-12 px-5 mt-3 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
                          />
                        </div>
                        <div>
                          <input
                            type="url"
                            placeholder="Apple Music"
                            defaultValue={album?.links?.apple}
                            onChange={(e) => setApple(e.target.value)}
                            className="h-12 px-5 mt-3 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
                          />
                        </div>
                        <div>
                          <input
                            type="url"
                            placeholder="Resso"
                            defaultValue={album?.links?.resso}
                            onChange={(e) => setResso(e.target.value)}
                            className="h-12 px-5 mt-3 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
                          />
                        </div>
                        <div>
                          <input
                            type="url"
                            placeholder="Amazon Music"
                            defaultValue={album?.links?.amazon}
                            onChange={(e) => setAmazon(e.target.value)}
                            className="h-12 px-5 mt-3 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
                          />
                        </div>
                        <div>
                          <button
                            className="bg-indigo-500 hover:bg-indigo-700 h-14 w-48 text-center text-white mt-3 focus:outline-none"
                            onClick={() => saveLinks()}
                          >
                            Add Link
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className="bg-white m-3 lg:m-10 ">
        <div className="bg-white">
          <table className=" table-fixed  text-black w-full text-left">
            <thead className="  ">
              <tr className="h-14 border-b tracking-wide  ">
                <th className=" w-1/6  font-medium "></th>
                <th className=" w-3/6 pr-24  font-medium ">Service</th>
                <th className=" w-1/6  font-medium  ">Release Date</th>
                <th className=" w-1/6 text-center  font-medium  ">Status</th>
              </tr>
            </thead>
            <tbody className="font-regular text-2xl ">
              <tr
                onClick={() => setShowg(true)}
                className="h-20 text-lg  hover:bg-gray-50 border-b cursor-pointer"
              >
                <td className=" w-1/6  ">
                  <img
                    className="h-12 mx-12"
                    src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fgaana.png?alt=media&token=532e2fb2-a8d6-46ca-a623-ccfd8d194641"
                    alt="logo"
                  ></img>
                </td>
                <td className=" w-3/6 pr-24 ">Gaana</td>
                <td className=" w-1/6  ">{album?.releaseDate}</td>
                <td className=" w-1/6 text-center ">
                  {statusSwitch(album?.status)}
                </td>
              </tr>
              {showg ? (
                <>
                  <tr className="h-14 text-lg  bg-hover border-b">
                    <td className=" w-1/6 text-center "></td>
                    <td className=" w-3/6 text-sm font-medium text-blue-600 cursor-pointer">
                      <a target="_blank" href={album?.links?.Gaana}>
                        View on service
                      </a>
                    </td>
                    <td className=" w-1/6  "></td>
                    <td className=" w-1/6 text-center "></td>
                  </tr>
                </>
              ) : null}

              <tr
                className="h-20 text-lg  hover:bg-gray-50 border-b"
                onClick={() => setShoww(true)}
              >
                <td className=" w-1/6  ">
                  <img
                    className="h-12 mx-12"
                    src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fwynk.png?alt=media&token=8a27c10e-a2f0-465c-bb2a-cc4b9d9cc94f"
                    alt="logo"
                  ></img>
                </td>
                <td className=" w-3/6 pr-24 ">Wynk Music</td>
                <td className=" w-1/6  ">{album?.releaseDate}</td>
                <td className=" w-1/6 text-center ">
                  {statusSwitch(album?.status)}
                </td>
              </tr>

              {showw ? (
                <>
                  <tr className="h-14 text-lg  bg-hover border-b">
                    <td className=" w-1/6 text-center "></td>
                    <td className=" w-3/6 text-sm font-medium text-blue-600 cursor-pointer">
                      <a target="_blank" href={album?.links?.Wynk}>
                        View on service
                      </a>
                    </td>
                    <td className=" w-1/6  "></td>
                    <td className=" w-1/6 text-center "></td>
                  </tr>
                </>
              ) : null}

              <tr
                className="h-20 text-lg  hover:bg-gray-50 border-b"
                onClick={() => setShowh(true)}
              >
                <td className=" w-1/6  ">
                  <img
                    className="h-12 mx-12"
                    src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fhungama.png?alt=media&token=f9428176-4a60-45ce-a6f3-06888e3d70e1"
                    alt="logo"
                  ></img>
                </td>
                <td className=" w-3/6 pr-24 ">Hungama</td>
                <td className=" w-1/6  ">{album?.releaseDate}</td>
                <td className=" w-1/6 text-center ">
                  {statusSwitch(album?.status)}
                </td>
              </tr>

              {showh ? (
                <>
                  <tr className="h-14 text-lg  bg-hover border-b">
                    <td className=" w-1/6 text-center "></td>
                    <td className=" w-3/6 text-sm font-medium text-blue-600 cursor-pointer">
                      <a target="_blank" href={album?.links?.Hungama}>
                        View on service
                      </a>
                    </td>
                    <td className=" w-1/6  "></td>
                    <td className=" w-1/6 text-center "></td>
                  </tr>
                </>
              ) : null}

              <tr
                className="h-20 text-lg  hover:bg-gray-50 border-b"
                onClick={() => setShowj(true)}
              >
                <td className=" w-1/6  ">
                  <img
                    className="h-12 mx-12"
                    src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fsaavan.png?alt=media&token=72d7273e-32b4-43e8-ba63-1f8d808a349d"
                    alt="logo"
                  ></img>
                </td>
                <td className=" w-3/6 pr-24 ">Jio Saavan</td>
                <td className=" w-1/6  ">{album?.releaseDate}</td>
                <td className=" w-1/6 text-center ">
                  {" "}
                  {statusSwitch(album?.status)}
                </td>
              </tr>

              {showj ? (
                <>
                  <tr className="h-14 text-lg  bg-hover border-b">
                    <td className=" w-1/6 text-center "></td>
                    <td className=" w-3/6 text-sm font-medium text-blue-600 cursor-pointer">
                      <a target="_blank" href={album?.links?.Saavan}>
                        View on service
                      </a>
                    </td>
                    <td className=" w-1/6  "></td>
                    <td className=" w-1/6 text-center "></td>
                  </tr>
                </>
              ) : null}

              <tr
                className="h-20 text-lg  hover:bg-gray-50 border-b"
                onClick={() => setShowy(true)}
              >
                <td className=" w-1/6  ">
                  <img
                    className="h-12 mx-12"
                    src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fyt%20music.png?alt=media&token=b33254a5-9d2f-4bcc-b3d3-697adbf665b3"
                    alt="logo"
                  ></img>
                </td>
                <td className=" w-3/6 pr-24 ">Youtube Music</td>
                <td className=" w-1/6  ">{album?.releaseDate}</td>
                <td className=" w-1/6 text-center ">
                  {" "}
                  {statusSwitch(album?.status)}
                </td>
              </tr>

              {showy ? (
                <>
                  <tr className="h-14 text-lg  bg-hover border-b">
                    <td className=" w-1/6 text-center "></td>
                    <td className=" w-3/6 text-sm font-medium text-blue-600 cursor-pointer">
                      <a target="_blank" href={album?.links?.Ytmusic}>
                        View on service
                      </a>
                    </td>
                    <td className=" w-1/6  "></td>
                    <td className=" w-1/6 text-center "></td>
                  </tr>
                </>
              ) : null}

              <tr
                className="h-20 text-lg  hover:bg-gray-50 border-b"
                onClick={() => setShows(true)}
              >
                <td className=" w-1/6  ">
                  <img
                    className="h-12 mx-12"
                    src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fspotify.png?alt=media&token=183ad3fe-3e58-4c11-96e2-0e4d6c8894ab"
                    alt="logo"
                  ></img>
                </td>
                <td className=" w-3/6 pr-24 ">Spotify</td>
                <td className=" w-1/6  ">{album?.releaseDate}</td>
                <td className=" w-1/6 text-center ">
                  {" "}
                  {statusSwitch(album?.status)}
                </td>
              </tr>

              {shows ? (
                <>
                  <tr className="h-14 text-lg  bg-hover border-b">
                    <td className=" w-1/6 text-center "></td>
                    <td className=" w-3/6 text-sm font-medium text-blue-600 cursor-pointer">
                      <a target="_blank" href={album?.links?.Spotify}>
                        View on service
                      </a>
                    </td>
                    <td className=" w-1/6  "></td>
                    <td className=" w-1/6 text-center "></td>
                  </tr>
                </>
              ) : null}

              <tr
                className="h-20 text-lg  hover:bg-gray-50 border-b"
                onClick={() => setShowa(true)}
              >
                <td className=" w-1/6  ">
                  <img
                    className="h-12 mx-12"
                    src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fapple.png?alt=media&token=28e9f65b-7215-49d6-ae4b-9b68b6c89afa"
                    alt="logo"
                  ></img>
                </td>
                <td className=" w-3/6 pr-24 ">Apple Music</td>
                <td className=" w-1/6  ">{album?.releaseDate}</td>
                <td className=" w-1/6 text-center ">
                  {" "}
                  {statusSwitch(album?.status)}
                </td>
              </tr>

              {showa ? (
                <>
                  <tr className="h-14 text-lg  bg-hover border-b">
                    <td className=" w-1/6 text-center "></td>
                    <td className=" w-3/6 text-sm font-medium text-blue-600 cursor-pointer">
                      <a target="_blank" href={album?.links?.Apple}>
                        View on service
                      </a>
                    </td>
                    <td className=" w-1/6  "></td>
                    <td className=" w-1/6 text-center "></td>
                  </tr>
                </>
              ) : null}

              <tr
                className="h-20 text-lg  hover:bg-gray-50 border-b"
                onClick={() => setShowr(true)}
              >
                <td className=" w-1/6  ">
                  <img
                    className="h-12 mx-12"
                    src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Fresso.png?alt=media&token=74e7f658-a9d2-4c7e-a6d6-ff7e3c99a426"
                    alt="logo"
                  ></img>
                </td>
                <td className=" w-3/6 pr-24 ">Resso</td>
                <td className=" w-1/6  ">{album?.releaseDate}</td>
                <td className=" w-1/6 text-center ">
                  {" "}
                  {statusSwitch(album?.status)}
                </td>
              </tr>

              {showr ? (
                <>
                  <tr className="h-14 text-lg  bg-hover border-b">
                    <td className=" w-1/6 text-center "></td>
                    <td className=" w-3/6 text-sm font-medium text-blue-600 cursor-pointer">
                      <a target="_blank" href={album?.links?.Resso}>
                        View on service
                      </a>
                    </td>
                    <td className=" w-1/6  "></td>
                    <td className=" w-1/6 text-center "></td>
                  </tr>
                </>
              ) : null}

              <tr
                className="h-20 text-lg  hover:bg-gray-50 border-b"
                onClick={() => setShowam(true)}
              >
                <td className=" w-1/6  ">
                  <img
                    className="h-12 mx-12"
                    src="https://firebasestorage.googleapis.com/v0/b/identity-c2803.appspot.com/o/Stores%20Logo%2Famazon.png?alt=media&token=325a6c0d-4712-452d-8eae-6e6030a4166a"
                    alt="logo"
                  ></img>
                </td>
                <td className=" w-3/6 pr-24 ">Amazon Music</td>
                <td className=" w-1/6  ">{album?.releaseDate}</td>
                <td className=" w-1/6 text-center ">
                  {" "}
                  {statusSwitch(album?.status)}
                </td>
              </tr>

              {showam ? (
                <>
                  <tr className="h-14 text-lg  bg-hover border-b">
                    <td className=" w-1/6 text-center "></td>
                    <td className=" w-3/6 text-sm font-medium text-blue-600 cursor-pointer">
                      <a target="_blank" href={album?.links?.amazon}>
                        View on service
                      </a>
                    </td>
                    <td className=" w-1/6  "></td>
                    <td className=" w-1/6 text-center "></td>
                  </tr>
                </>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewAlbumMore;
