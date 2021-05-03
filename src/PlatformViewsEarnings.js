import React from "react";
import { useRef } from "react";
import validateRefs from "./utils/Utils";
import AWN from "awesome-notifications";

function PlatformViewsEarnings({ d, data, setdata }) {
  const platformref = useRef();
  const viewsref = useRef();
  const earningsref = useRef();

  console.log(data);

  var refs = [platformref, viewsref, earningsref];

  function handleclick() {
    var res = validateRefs(refs);
    if (res.success) {
      const d = {
        platform: platformref.current.value,
        views: viewsref.current.value,
        earnings: earningsref.current.value,
      };
      if (!data.find((a) => a.platform === d.platform)) {
        setdata([...data, d]);
      } else {
        data = data.map((d) => {
          if (d.platform === platformref.current.value) {
            d.views = viewsref.current.value;
            d.earnings = earningsref.current.value;
          }
          return d;
        });
        setdata(data);
      }
    } else {
      new AWN().warning(res.message);
    }
  }

  return (
    <div className="flex">
      <input
        ref={platformref}
        type="text"
        defaultValue={d?.platform}
        disabled={d?.platform}
        className="m-3 p-3 border focus:outline-none appearance-none"
        placeholder="platform"
      />
      <input
        ref={viewsref}
        type="number"
        defaultValue={d?.views}
        className="m-3 p-3 border focus:outline-none appearance-none"
        placeholder="views"
      />
      <input
        ref={earningsref}
        type="number"
        defaultValue={d?.earnings}
        className="m-3 p-3 border focus:outline-none appearance-none"
        placeholder="earnings"
      />
      <button
        className="focus:outline-none m-3 p-3 w-44 bg-indigo-400 text-white"
        onClick={() => handleclick()}
      >
        save
      </button>
    </div>
  );
}

export default PlatformViewsEarnings;
