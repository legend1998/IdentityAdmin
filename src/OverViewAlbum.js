import React from "react";
import { statusSwitch } from "./utils/Utils";
import AWN from "awesome-notifications";

function OverViewAlbum({ data }) {
  function showdetails(status) {
    if (status?.error) {
      new AWN().modal(status?.error);
    }
  }

  return (
    <div className=" flex items-center justify-center flex-wrap">
      <div className="">
        <img src={data?.coverImage} width="450px" alt="" />
      </div>
      <div className="bg-white flex-1 h-full m-5">
        <div className="pb-4 bg-gray-100  text-blue-600 border-b">
          <p className="h-auto bg-white py-3 pl-3  ">
            <button onClick={() => showdetails(data)}>
              {statusSwitch(data?.status)}
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a className="text-lg">{data?.message}</a>
            <br></br>
          </p>
        </div>

        <h1 className="text-xl font-regular py-5 px-10 border-b ">
          Album Info
        </h1>
        <div className="m-10">
          <p className="capitalize">
            <span className="font-medium">Language: </span> {data?.language}
          </p>
          <p className="">
            <span className="font-medium">Title: </span> {data?.title}
          </p>
          <p className="">
            <span className="font-medium">Title Version: </span>
            {data?.titleVersion}
          </p>
          <p className="">
            <span className="font-medium">Label: </span> {data?.recordLabel}
          </p>
          <p className="">
            <span className="font-medium">UPC: </span> {data?.upcEan}
          </p>
          <p>
            <span className="font-medium">(P) Copyright: </span>
            {data?.pCopyright}
          </p>
          <p>
            <span className="font-medium">(C) Copyright: </span>
            {data?.Ccopyright}
          </p>
          <p>
            <span className="font-medium">Release Date: </span>
            {data?.releaseDate}
          </p>
          <p className="">
            <span className="font-medium">Genre1:</span> {data?.genre1}
          </p>
          <p className="">
            <span className="font-medium">Genre2:</span> {data?.genre2}
          </p>
        </div>
      </div>

      <div className="h-full w-full p-2 mt-5 bg-white  mr-5 ">
        <p className="text-black text-lg p-2 ">
          <span className="font-medium">Stores: </span>
          {data?.storInfo.stores}
        </p>
      </div>
      <div className="h-full w-full p-2 mt-5 bg-white  mr-5 ">
        <p className="text-black capitalize text-lg p-2 ">
          <span className="font-medium">CRBT: </span>{" "}
          {data?.storInfo.telecomPartners}
        </p>
      </div>
      <div className="h-full w-full p-2 mt-5 bg-white  mr-5 ">
        <p className="text-black capitalize text-lg p-2  ">
          <span className="font-medium ">Claim: </span> {data?.storInfo.youtube}
        </p>
      </div>
    </div>
  );
}

export default OverViewAlbum;
