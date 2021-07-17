import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import { useHistory } from "react-router";
import { firedb } from "./Firebaseconfig";
import { AWN } from "awesome-notifications";

function Dashboard() {
  const [{ user }] = useStateValue();
  const history = useHistory();
  const [vidoes, setvidoes] = useState([]);
  const [releases, setreleases] = useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [showrelease, setShowrelease] = React.useState(false);
  const [video, setvideo] = useState({});
  const [release, setrelease] = useState({});

  useEffect(() => {
    firedb.collection("video").onSnapshot((snapshot) => {
      var a = [];
      snapshot.forEach((snap) => {
        a.push(snap.data());
      });
      setvidoes(a);
    });
  }, []);

  useEffect(() => {
    firedb.collection("release").onSnapshot((snapshot) => {
      var a = [];
      snapshot.forEach((snap) => {
        a.push(snap.data());
      });
      setreleases(a);
    });
  }, []);

  function createvideo() {
    if (!video?.src) return;
    firedb
      .collection("video")
      .add(video)
      .then(() => {
        setShowModal(false);
      })
      .catch((e) => {
        new AWN().alert(e.message);
      });
  }

  function createrelease() {
    if (!release?.src) return;
    firedb
      .collection("release")
      .add(release)
      .then(() => {
        setShowrelease(false);
      })
      .catch((e) => {
        new AWN().alert(e.message);
      });
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="w-full bg-white h-24 flex items-center shadow-sm">
        <h1 className="text-3xl font-medium ml-8 pl-10  capitalize">
          Hi, {user.fname}!
        </h1>
      </div>
      <div className="m-16 bg-white ">
        <div className=" m-5 py-3   border-b flex items-center justify-between text-gray-500">
          <h3 className="font-Regular text-2xl text-black ">Shortcuts</h3>
          <div></div>
        </div>
        <div className=" grid grid-flow-col grid-cols-2 grid-rows-2 gap-5 m-5 mt-10  items-center justify-center">
          <div className="mx-2">
            <div className=" h-auto w-full flex flex-grow-0">
              <span className="text-blue-600 h-20 w-20 rounded-full border-4  border-black p-3 flex items-center justify-center ml-16">
                <i className="fas fa-user fa-2x  "></i>
              </span>
              <span className="text-center text-2xl m-5">My Account</span>
            </div>
          </div>
          <div className=" h-auto w-full flex flex-grow-0">
            <h1>&nbsp;&nbsp;&nbsp; </h1>
            <span className="text-blue-600 h-20 w-20 rounded-full border-4  border-black p-3 flex items-center justify-center ml-16">
              <i className="fas fa-user fa-2x  "></i>
            </span>
            <span className="text-center text-2xl m-5">My Account</span>
          </div>
          <div className=" h-auto w-full flex flex-grow-0">
            <span className="text-blue-600 h-20 w-20 rounded-full border-4  border-black p-3 flex items-center justify-center ml-10">
              <i className="fas fa-user fa-2x  "></i>
            </span>
            <span className="text-center text-2xl m-5">My Account</span>
          </div>
          <div className=" h-auto w-full flex flex-grow-0">
            <span className="text-blue-600 h-20 w-20 rounded-full border-4  border-black p-3 flex items-center justify-center ml-10">
              <i className="fas fa-user fa-2x  "></i>
            </span>
            <span className="text-center text-2xl m-5">My Account</span>
          </div>
        </div>
        <div className="bg-white h-5"></div>
      </div>

      <div className="m-16 bg-white ">
        <div className=" m-5  py-3  border-b flex items-center justify-between text-gray-500">
          <h3 className="font-regular text-2xl text-black ">
            Account Setup Tutorials
          </h3>
          <div>
            <button
              className="bg-tabborder h-14 w-48 rounded-full hover:bg-blue-700
              shadow-lg "
              onClick={() => setShowModal(true)}
            >
              <p className="font-normal text-base text-center text-white ">
                Add Video
              </p>
            </button>
            {showModal ? (
              <>
                <div className=" ml-48 duration-200 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-full my-6 mx-auto max-w-5xl">
                    {/*content*/}
                    <div className="border-b   shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-3 pl-8 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-2xl font-medium">Add Video</h3>
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
                      <div className="relative p-6 pl-6 ">
                        <p className="mb-4 text-filter text-lg leading-relaxed">
                          Add Video URL and Title.
                        </p>
                        <div>
                          <input
                            type="url"
                            placeholder="Video URL"
                            onChange={(e) =>
                              setvideo({ ...video, src: e.target.value })
                            }
                            className="h-12 px-5 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
                          />
                        </div>
                        <div className="mt-2">
                          <input
                            type="text"
                            placeholder="Video Title"
                            onChange={(e) =>
                              setvideo({ ...video, title: e.target.value })
                            }
                            className="h-12 px-5 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
                          />
                        </div>

                        <div>
                          <button
                            className="h-12 mt-2 w-48 bg-tabborder text-white"
                            onClick={() => createvideo()}
                          >
                            <p>Add Video</p>
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
        <div className="h-auto py-6  overflow-scroll items-center justify-items-center bg-background  flex flex-col md:flex-row  border-4 border-white ">
          {vidoes.map((v, i) => (
            <div className="float-left m-5  bg-white ">
              <div className="px-4 p-3  font-base ">{v.title}</div>
              <iframe
                height="190"
                width="340"
                src={v.src}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>

      <div className="m-16 bg-white ">
        <div className=" m-5  py-3  border-b flex items-center justify-between text-gray-500">
          <h3 className="font-regular text-2xl text-black ">Latest Releases</h3>
          <div>
            <button
              className="bg-tabborder h-14 w-48 rounded-full hover:bg-blue-700
              shadow-lg "
              onClick={() => setShowrelease(true)}
            >
              <p className="font-normal text-base text-center text-white ">
                Add Release
              </p>
            </button>
            {showrelease ? (
              <>
                <div className=" ml-48 duration-200 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-full my-6 mx-auto max-w-5xl">
                    {/*content*/}
                    <div className="border-b   shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/*header*/}
                      <div className="flex items-start justify-between p-3 pl-8 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-2xl font-medium">Add Release</h3>
                        <button
                          className="p-1 ml-auto bg-transparent border-0 text-albums  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                          onClick={() => setShowrelease(false)}
                        >
                          <span className=" text-red  h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                          </span>
                        </button>
                      </div>
                      {/*body*/}
                      <div className="relative p-6 pl-6 ">
                        <p className="mb-4 text-filter text-lg leading-relaxed">
                          Add Video URL and Title.
                        </p>
                        <div>
                          <input
                            type="url"
                            placeholder="Video URL"
                            onChange={(e) =>
                              setrelease({ ...release, src: e.target.value })
                            }
                            className="h-12 px-5 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
                          />
                        </div>
                        <div className="mt-2">
                          <input
                            type="text"
                            placeholder="Video Title"
                            onChange={(e) =>
                              setrelease({ ...release, title: e.target.value })
                            }
                            className="h-12 px-5 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
                          />
                        </div>

                        <div>
                          <button
                            className="h-12 mt-2 w-48 bg-tabborder text-white"
                            onClick={() => createrelease()}
                          >
                            <p>Add Release</p>
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
        <div className="h-auto py-6  overflow-scroll items-center justify-items-center bg-background  flex flex-col md:flex-row  border-4 border-white ">
          {releases.map((b, i) => (
            <div className="float-left m-5  bg-white ">
              <div className="px-4 p-3  font-base ">{b.title}</div>
              <iframe
                height="190"
                width="340"
                src={b.src}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          ))}
        </div>
      </div>
      <div className="h-2"></div>
    </div>
  );
}

export default Dashboard;
