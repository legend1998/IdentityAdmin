import AWN from "awesome-notifications";
import { Chart } from "devextreme-react";
import {
  CommonSeriesSettings,
  Export,
  Legend,
  Series,
  Title,
  Tooltip,
} from "devextreme-react/chart";
import React, { useState } from "react";
import { firedb } from "./Firebaseconfig";
import PlatformViewsEarnings from "./PlatformViewsEarnings";
import { getSum } from "./utils/Utils";

function EarningsStat({ id, stats }) {
  const [data, setdata] = useState(stats ? stats : []);

  function handleclick() {
    console.log(data);
    firedb
      .collection("album")
      .doc(id)
      .update({
        earnings: data,
      })
      .then(() => {
        new AWN().success("success");
      });
  }

  function customizeTooltip(arg) {
    return {
      text: `${arg.percentText} rupees: ${arg.valueText}`,
    };
  }

  return (
    <div className="w-full">
      <div className="my-5">
        <Chart id="chart" dataSource={data}>
          <Title
            text="Earnings from this album"
            subtitle="(Detailed Earnings from this album)"
          />

          <CommonSeriesSettings argumentField="month" type="fullstackedbar" />
          <Series valueField="gaana" name="gaana" />
          <Series valueField="wynk" name="wynk" />
          <Series valueField="hungama" name="hungama" />
          <Series valueField="spotify" name="spotify" />
          <Series valueField="saavan" name="saavan" />
          <Series valueField="crbt" name="crbt" />
          <Series valueField="crbt" name="crbt" />
          <Series valueField="other" name="other" />
          <Series valueField="youtubeContentID" name="youtube Content ID" />
          <Series valueField="amazonMusic" name="amazon music" />

          <Legend
            verticalAlignment="top"
            horizontalAlignment="center"
            itemTextPosition="right"
          />
          <Export enabled={true} />
          <Tooltip enabled={true} customizeTooltip={customizeTooltip} />
        </Chart>
        <div className="shadow-lg flex justify-between mt-10 items-center bg-white ">
          <h1 className="font-semibold text-lg mx-4 "> Total Earnings</h1>
          <span className="h-14 py-4 w-32 bg-blue-500 text-white text-center my-auto">
            <i className="fas fa-rupee-sign mx-2">{getSum(data)}</i>
          </span>
        </div>
      </div>
      <div className="">
        <div className="flex items-center justify-between">
          <h1 className="m-5">Add Earnings</h1>
          <button
            className="focus:outline-none p-3 w-44 bg-indigo-400 text-white"
            onClick={() => handleclick()}
          >
            Save Changes
          </button>
        </div>
        <PlatformViewsEarnings data={data} setdata={setdata} />
        <h1 className="m-5">update Views and Earnings</h1>
      </div>
    </div>
  );
}

export default EarningsStat;
