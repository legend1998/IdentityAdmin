import React, { useState } from "react";
import { statusSwitch } from "../utils/Utils";
import AWN from "awesome-notifications";
import "../app.css";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { firedb } from "../Firebaseconfig";

function Stores({ data }) {
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
        <div>
          <div className="bg-white h-auto w-full">
            <div className="  m-6">
              <p className="font-medium mb-5 text-lg">DSP's</p>
            </div>
          </div>
          <div className="h-full w-full p-2 mt-5 bg-white  mr-5 ">
            <p className="text-black text-lg p-2 ">{data?.storInfo.stores}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stores;
