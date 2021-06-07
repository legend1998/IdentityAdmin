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

function ViewsStats({ id, stats }) {
  const [data, setdata] = useState(stats ? stats : []);

  function handleclick() {
    console.log(data);
    firedb
      .collection("album")
      .doc(id)
      .update({
        stats: data,
      })
      .then(() => {
        new AWN().success("success");
      });
  }

  function customizeTooltip(arg) {
    return {
      text: `${arg.percentText} views: ${arg.valueText}`,
    };
  }

  return (
    <div className="w-full">
      <div className="my-5">
        <Chart id="chart" dataSource={data}>
          <Title
            text="Views on stores "
            subtitle="(Details view of views of album over different paltform )"
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
      </div>
      <div className="shadow-lg flex justify-between mt-10 items-center bg-white ">
        <h1 className="font-semibold text-lg mx-4 ">Total Views</h1>
        <span className="h-14 py-4 w-32 bg-blue-500 text-white text-center my-auto">
          {getSum(data)}
        </span>
      </div>
      <div className="">
        <div className="flex items-center justify-between">
          <h1 className="m-5">Add Views</h1>
          <button
            className="focus:outline-none m-3 p-3 w-44 bg-indigo-400 text-white"
            onClick={() => handleclick()}
          >
            Save Changes
          </button>
        </div>
        <PlatformViewsEarnings data={data} setdata={setdata} />
      </div>
    </div>
  );
}

export default ViewsStats;
