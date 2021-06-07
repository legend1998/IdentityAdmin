import React, { useState } from "react";
import EarningsStat from "./Earnings";

import ViewsStats from "./ViewsStats";

function ViewAlbumStats({ id, stats, earnings }) {
  const [toggle, settoggle] = useState(true);
  var active = " bg-blue-600 rounded-full text-white  p-3 focus:outline-none ";
  var passive = " bg-gray-300 rounded-full  p-3 focus:outline-none";
  return (
    <div>
      <div className="flex justify-end w-full ">
        <div>
          <button
            onClick={() => settoggle(!toggle)}
            className={`rounded-r-none ${toggle ? active : passive}`}
          >
            Views
          </button>
          <button
            onClick={() => settoggle(!toggle)}
            className={`rounded-l-none ${toggle ? passive : active}`}
          >
            Earnings
          </button>
        </div>
      </div>

      {toggle ? (
        <ViewsStats stats={stats} id={id} />
      ) : (
        <EarningsStat stats={earnings} id={id} />
      )}
    </div>
  );
}

export default ViewAlbumStats;
