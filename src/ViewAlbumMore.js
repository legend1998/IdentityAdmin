import React from "react";

function ViewAlbumMore({ data }) {
  return (
    <div className="">
      <div className="h-14 bg-white ml-10 mr-10 ">
        <p className="text-black text-lg text-center justify-items-center pt-4">
          We’re currently in the process of Searching your release links on
          Music Platforms. We will update as soon as possible
        </p>
      </div>

      <div className="bg-white m-3 lg:m-10 ">
        <div className="bg-white">
          <table className=" capitalize table-fixed  text-gray-700 w-full text-left">
            <thead className=" text-center ">
              <tr className="h-14 border-b ">
                <th className=" w-1/6 "></th>
                <th className=" w-2/6 pr-24 ">Service</th>
                <th className=" w-3/6 ">Link</th>
              </tr>
            </thead>
            <tbody className=" text-2xl"></tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewAlbumMore;
