import React, { useState } from "react";
import { statusSwitch } from "../utils/Utils";
import AWN from "awesome-notifications";
import "../app.css";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { firedb } from "../Firebaseconfig";

function OverViewAlbum({ data }) {
  const history = useHistory();
  const params = useParams();
  const [albums, setalbum] = useState(false);

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
  }, []);

  console.log(albums);

  function updateAlbum() {
    firedb
      .collection("album")
      .doc(params.id)
      .update(albums)
      .then(() => {
        new AWN().success("\t Data has been updated successfully");
      })
      .catch((e) => {
        new AWN().alert(e.message);
      });
  }

  function showdetails(status) {
    if (status?.error) {
      new AWN().modal(status?.error);
    }
  }

  return (
    <div className=" flex items-center justify-center flex-wrap">
      <div className="bg-white flex-1 h-full m-5">
        <div className="pb-4 bg-background  text-blue-600 ">
          <p className="h-auto bg-white py-3 pl-3  ">
            <button onClick={() => showdetails(data)}>
              {statusSwitch(data?.status)}
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a className="text-lg">{data?.message}</a>
            <br></br>
          </p>
        </div>

        <div>
          <div className="bg-white h-auto w-full">
            <div className=" border-b m-6">
              <p className="font-base mb-5 text-2xl"> Language</p>
            </div>
            <div className="  m-6">
              <p className="font-medium mb-5 text-lg">
                In what language will you be writing your titles, artist name(s)
                and release description?
              </p>
            </div>
            <div className=" m-6 mb-8">
              <input
                type="text"
                placeholder="Language"
                defaultValue={data?.language}
                onChange={(e) =>
                  setalbum({ ...albums, language: e.target.value })
                }
                className="h-14 px-5 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
              />
            </div>
          </div>
        </div>

        <div className="pt-8 bg-background   ">
          <div className="bg-white h-auto w-full">
            <div className=" border-b m-6 ">
              <p className="font-base mb-5 pt-5 text-2xl"> Title</p>
            </div>
            <div className="grid grid-flow-col grid-cols-2 grid-rows-1 5 m-6">
              <div className=" m-6 mb-8">
                <p className="text-xl pb-2 font-medium">
                  Release Title <span className="text-red-500">*</span>
                </p>

                <input
                  type="text"
                  placeholder="The name of your release"
                  defaultValue={data?.title}
                  onChange={(e) =>
                    setalbum({ ...albums, title: e.target.value })
                  }
                  className="h-14 px-5 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
                />
              </div>
              <div className=" m-6 mb-8">
                <p className="text-xl pb-2 font-medium">
                  Title Version <span className="text-red-500">*</span>
                </p>
                <input
                  type="text"
                  placeholder="Album version"
                  defaultValue={data?.titleVersion}
                  onChange={(e) =>
                    setalbum({ ...albums, titleVersion: e.target.value })
                  }
                  className="h-14 px-5 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16 bg-background   ">
          <div className="bg-white h-auto w-full pt-1 mb-5">
            <div className=" border-b m-6">
              <p className="font-base mb-5 text-2xl"> Artist</p>
            </div>
            <div className=" m-6 mb-8">
              <p className="text-xl pb-2 font-medium">
                Is this a compilation of various artists?
                <span className="text-red-500">*</span>
              </p>
              <input
                type="text"
                placeholder="Yes or No"
                defaultValue={data?.compilation}
                onChange={(e) =>
                  setalbum({ ...albums, compilation: e.target.value })
                }
                className="h-14 px-5 w-full capitalize bg-box appearance-none outline-none border border-box focus:border-purple-700"
              />
            </div>
            <div className=" m-6 mb-8">
              <p className="text-xl pb-2 font-medium">
                Artist(s) – indicate ONLY ONE per field{" "}
                <span className="text-red-500">*</span>
              </p>
              <input
                type="text"
                placeholder="Album version"
                defaultValue={data?.primaryArtist}
                onChange={(e) =>
                  setalbum({ ...albums, primaryArtist: e.target.value })
                }
                className="h-14 px-5 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
              />
            </div>
          </div>
        </div>

        <div className="pt-16 bg-background   ">
          <div className="bg-white h-auto w-full pt-1 mb-5">
            <div className=" border-b m-6">
              <p className="font-base mb-5 text-2xl"> Info</p>
            </div>
            <div className="grid grid-flow-col grid-cols-2 grid-rows-2 5 m-6">
              <div className=" m-6 mb-8">
                <p className="text-xl pb-2 font-medium">
                  Genre 1 <span className="text-red-500">*</span>
                </p>

                <input
                  type="text"
                  placeholder="The name of your release"
                  defaultValue={data?.genre1}
                  onChange={(e) =>
                    setalbum({ ...albums, genre1: e.target.value })
                  }
                  className="h-14 px-5 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
                />
              </div>
              <div className=" m-6 mb-8">
                <p className="text-xl pb-2 font-medium">
                  (C) Copyright <span className="text-red-500">*</span>
                </p>

                <input
                  type="text"
                  placeholder="Album version"
                  defaultValue={data?.Ccopyright}
                  onChange={(e) =>
                    setalbum({ ...albums, Ccopyright: e.target.value })
                  }
                  className="h-14 px-5 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
                />
              </div>
              <div className=" m-6 mb-8">
                <p className="text-xl pb-2 font-medium">
                  Genre 2 <span className="text-red-500">*</span>
                </p>
                <input
                  type="text"
                  placeholder="Album version"
                  defaultValue={data?.genre2}
                  onChange={(e) =>
                    setalbum({ ...albums, genre2: e.target.value })
                  }
                  className="h-14 px-5 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
                />
              </div>
              <div className=" m-6 mb-8">
                <p className="text-xl pb-2 font-medium">
                  (P) Copyright <span className="text-red-500">*</span>
                </p>
                <input
                  type="text"
                  placeholder="Album version"
                  defaultValue={data?.pCopyright}
                  onChange={(e) =>
                    setalbum({ ...albums, pCopyright: e.target.value })
                  }
                  className="h-14 px-5 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
                />
              </div>
            </div>

            <div className=" ml-12 mr-12">
              <p className="text-xl pb-2 font-medium">
                Release Date <span className="text-red-500">*</span>
              </p>
              <input
                type="date"
                defaultValue={data?.releaseDate}
                onChange={(e) =>
                  setalbum({ ...albums, releaseDate: e.target.value })
                }
                placeholder="Previously release date"
                className="h-12 px-5 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
              />
            </div>
            <div className=" ml-12 mr-12 mt-8">
              <p className="text-xl pb-2 font-medium">
                On a Record Label<span className="text-red-500">*</span>
              </p>
              <input
                type="text"
                defaultValue={data?.recordLabel}
                onChange={(e) =>
                  setalbum({ ...albums, recordLabel: e.target.value })
                }
                placeholder="Record label"
                className="h-12 px-5 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
              />
            </div>
            <div className=" ml-12 mr-12 mt-8">
              <p className="text-xl pb-2 font-medium">
                UPC<span className="text-red-500">*</span>
              </p>
              <input
                type="text"
                defaultValue={data?.upcEan}
                placeholder="UPC"
                onChange={(e) =>
                  setalbum({ ...albums, upcEan: e.target.value })
                }
                className="h-12 px-5 w-full bg-box appearance-none outline-none border border-box focus:border-purple-700"
              />
            </div>
            <div className=" ml-12 mr-12 mt-8">
              <button
                onClick={() => updateAlbum()}
                className="bg-blue-500 h-14 w-48 focus:outline-none text-white hover:bg-indigo-700"
              >
                Save Album
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverViewAlbum;
