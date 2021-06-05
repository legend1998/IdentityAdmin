import React from "react";

function WhatsApp() {
  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="w-full bg-white h-24 flex items-center border-b shadow-sm">
        <h1 className="text-3xl font-semibold ml-8 pl-10 font-sans ">
          Live Chat
        </h1>
      </div>
      <div className="ml-5  mt-10 mr-5">
        <embed
          src="https://web.whatsapp.com/"
          className="min-h-screen w-full "
          title="Chaport"
        ></embed>
      </div>
    </div>
  );
}

export default WhatsApp;
