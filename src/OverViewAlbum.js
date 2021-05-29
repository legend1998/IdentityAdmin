import React from "react";
import { statusSwitch } from "./utils/Utils";

function OverViewAlbum({ data }) {
  return (
    <div className=" flex items-center justify-center flex-wrap">
      <div className="">
        <img src={data?.coverImage} width="450px" alt="" />
      </div>
      <div className="bg-white flex-1 h-full m-5">
        <div className="pb-4 bg-gray-100  text-blue-600 border-b">
          <p className="h-auto bg-white py-3 pl-3  ">
            {statusSwitch(data?.status)}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a className="text-lg">{data?.message}</a>
            <br></br>
            <a className="text-lg text-red-500">{data?.error}</a>
          </p>
        </div>
        <h1 className="text-xl font-regular py-5 px-10 border-b ">
          Album Info
        </h1>
        <div className="m-10">
          <p className="capitalize">
            <span className="font-semibold">Language: </span> {data?.language}
          </p>
          <p className="">
            <span className="font-semibold">Title: </span> {data?.title}
          </p>
          <p className="">
            <span className="font-semibold">Title Version: </span>
            {data?.titleVersion}
          </p>
          <p className="">
            <span className="font-semibold">Label: </span> {data?.recordLabel}
          </p>
          <p className="">
            <span className="font-semibold">UPC: </span> {data?.upcEan}
          </p>
          <p>
            <span className="font-semibold">(P) Copyright: </span>
            {data?.pCopyright}
          </p>
          <p>
            <span className="font-semibold">(C) Copyright: </span>
            {data?.Ccopyright}
          </p>
          <p>
            <span className="font-semibold">Release Date: </span>
            {data?.releaseDate}
          </p>
          <p className="">
            <span className="font-semibold">Genre1:</span> {data?.genre1}
          </p>
          <p className="">
            <span className="font-semibold">Genre2:</span> {data?.genre2}
          </p>
        </div>
      </div>
      <div className="h-full w-full p-2 mt-5 bg-white  mr-5 ">
        <p className="text-black text-lg pl-4 pt-4">
          Stores: {data?.storInfo.stores}
        </p>
      </div>
      <div className="h-full w-full p-2 mt-5 bg-white  mr-5 ">
        <p className="text-black capitalize text-lg pl-4  pt-4">
          CRBT: {data?.storInfo.telecomPartners}
        </p>
      </div>
      <div className="h-full w-full p-2 mt-5 bg-white  mr-5 ">
        <p className="text-black capitalize text-lg pl-4  pt-4">
          CRBT: {data?.storInfo.youtube}
        </p>
      </div>
    </div>
  );
}

export default OverViewAlbum;
