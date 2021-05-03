import React from "react";
import PieChart, {
  CommonSeriesSettings,
  Legend,
  Series,
  Export,
  Label,
  Title,
  Tooltip,
  Subtitle,
} from "devextreme-react/pie-chart";
import { useState } from "react";
import PlatformViewsEarnings from "./PlatformViewsEarnings";
import { getEarnigns } from "./utils/Utils";
import { firedb } from "./Firebaseconfig";
import AWN from "awesome-notifications";

function ViewAlbumStats({ id, stats }) {
  const [data, setdata] = useState(stats ? stats : []);

  function customizeTooltip(arg) {
    return {
      text: `${arg.argumentText}<br>${arg.seriesName}: ${arg.valueText}B`,
    };
  }

  function handleclick() {
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
  return (
    <div>
      <PieChart
        id="pie"
        type="doughnut"
        innerRadius={0.2}
        palette="material"
        dataSource={data}
      >
        <Title text="Earnings and Streams">
          <Subtitle text="(From Music Platforms )" />
        </Title>
        <CommonSeriesSettings>
          <Label visible={false} />
        </CommonSeriesSettings>
        <Series
          name="earnings"
          argumentField="platform"
          valueField="earnings"
        />
        <Series name="views" argumentField="platform" valueField="views" />
        <Export enabled={true} />
        <Legend visible={true} />
        <Tooltip enabled={true} customizeTooltip={customizeTooltip} />
      </PieChart>
      <div className="my-5">
        <div className="shadow-lg flex justify-between items-center bg-white ">
          <h1 className="font-semibold text-lg mx-4 ">Earnings</h1>
          <span className="h-14 py-4 w-32 bg-blue-500 text-white text-center my-auto">
            <i className="fas fa-rupee-sign mx-2"></i>
            {data ? getEarnigns(data) : 0}
          </span>
        </div>
      </div>
      <div className="">
        <div className="flex items-center justify-between">
          <h1 className="m-5">Add Views and Earnings</h1>
          <button
            className="focus:outline-none m-3 p-3 w-44 bg-indigo-400 text-white"
            onClick={() => handleclick()}
          >
            Save Changes
          </button>
        </div>
        <PlatformViewsEarnings data={data} setdata={setdata} />
        <h1 className="m-5">update Views and Earnings</h1>

        {data.map((d, index) => (
          <PlatformViewsEarnings
            key={index}
            d={d}
            data={data}
            setdata={setdata}
          />
        ))}
      </div>
    </div>
  );
}

export default ViewAlbumStats;
