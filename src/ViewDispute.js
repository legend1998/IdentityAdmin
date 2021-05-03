import React, { useState } from "react";
import { firedb } from "./Firebaseconfig";
import { useStateValue } from "./StateProvider";
import AWN from "awesome-notifications";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { statusSwitch } from "./utils/Utils";

function ViewDispute() {
  const [{ user }] = useStateValue();
  const history = useHistory();
  const params = useParams();
  const [show, setshow] = useState(false);
  const [dispute, setdispute] = useState({
    createdAt: Date.now(),
    user: user.email,
  });

  useEffect(() => {
    firedb
      .collection("dispute")
      .doc(params.id)
      .get()
      .then((res) => {
        setdispute(res.data());
      })
      .catch((e) => {
        new AWN().alert(e.message);
      });
  }, []);

  console.log(dispute);

  function updateDispute() {
    firedb
      .collection("dispute")
      .doc(params.id)
      .update(dispute)
      .then(() => {
        new AWN().success("message has been sent");
        history.replace("/panel/dispute");
      })
      .catch((e) => {
        new AWN().alert(e.message);
      });
  }

  function setstatus(status) {
    setdispute({ ...dispute, status: status });
    setshow(false);
  }

  return (
    <div className="h-screen overflow-y-auto bg-gray-100">
      <div className="w-full bg-white h-24  flex items-center justify-between shadow-sm">
        <h1 className="text-3xl font-semibold ml-8 font-sans ">Dispute</h1>
        <p className="text-sm font-light mr-8 ">Dispute</p>
      </div>
      <div className="sticky flex items-center justify-between p-5">
        <div className="">{statusSwitch(dispute?.status)}</div>
        <div className="">
          <button
            onClick={() => setshow(!show)}
            className="bg-blue-700 hover:bg-blue-800 w-64 h-12 focus:outline-none text-white"
          >
            Actions &#x2304;
          </button>
          {show ? (
            <ul className="absolute bg-white w-64 rounded text-sm text-center border ">
              <li
                onClick={() => setstatus("rejected")}
                className="h-10 border-b p-2 hover:bg-gray-300 cursor-pointer"
              >
                reject
              </li>

              <li
                onClick={() => setstatus("consideration")}
                className="h-10 border-b p-2 hover:bg-gray-300 cursor-pointer"
              >
                consideration
              </li>
              <li
                onClick={() => setstatus("approved")}
                className="h-10 border-b p-2 hover:bg-gray-300 cursor-pointer"
              >
                approve
              </li>
            </ul>
          ) : null}
        </div>
      </div>
      <div className="p-5 ">
        <div className=" p-5 bg-white">
          <p className=" font-normal">Youtube Link</p>
          <input
            type="link"
            defaultValue={dispute?.youtubeLink}
            onChange={(e) =>
              setdispute({ ...dispute, youtubeLink: e.target.value })
            }
            readOnly
            placeholder="paste youtube link here"
            className=" appearance-none focus:outline-none bg-gray-100 border h-12 my-5 w-full px-5"
          />
          <br />
          <p className=" font-normal">Comments</p>
          <textarea
            name="comments"
            readOnly
            defaultValue={dispute?.comments}
            onChange={(e) =>
              setdispute({ ...dispute, comments: e.target.value })
            }
            placeholder="any comments"
            className={
              "border w-full h-64 focus:outline-none p-5 bg-gray-50 text-sm"
            }
          ></textarea>
          <textarea
            name="comments"
            disabled={dispute?.status === "approved"}
            defaultValue={dispute?.message}
            onChange={(e) =>
              setdispute({ ...dispute, message: e.target.value })
            }
            placeholder="reply a message ............"
            className={
              "border w-full h-64 focus:outline-none p-5 bg-gray-50 text-sm"
            }
          ></textarea>
          <button
            onClick={() => updateDispute()}
            className=" appearance-none focus:outline-none h-12 w-52 bg-indigo-600 text-white"
          >
            Update Dispute
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewDispute;
