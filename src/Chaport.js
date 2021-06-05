import React from "react";

function Chaport() {
  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="w-full bg-white h-24 flex items-center border-b shadow-sm">
        <h1 className="text-3xl font-semibold ml-8 pl-10 font-sans ">
          Live Chat
        </h1>
      </div>
      <iframe
        src="https://web.whatsapp.com/"
        className="min-h-screen w-full ml-5  mt-10"
        title="Chaport"
      ></iframe>
    </div>
  );
}

export default Chaport;
