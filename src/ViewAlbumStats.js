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

function ViewAlbumStats({ stats }) {
  var data = [
    {
      platform: "Brazil",
      views: 243,
      earnings: 233,
    },
    {
      platform: "Russia",
      views: 529,
      earnings: 335,
    },
    {
      platform: "India",
      views: 293,
      earnings: 489,
    },
    {
      platform: "China",
      views: 2049,
      earnings: 1818,
    },
    {
      platform: "Japan",
      views: 799,
      earnings: 886,
    },
    {
      platform: "USA",
      views: 1547,
      earnings: 2335,
    },
    {
      platform: "Canada",
      views: 455,
      earnings: 475,
    },
    {
      platform: "France",
      views: 569,
      earnings: 674,
    },
    {
      platform: "England",
      views: 468,
      earnings: 680,
    },
    {
      platform: "Germany",
      views: 1407,
      earnings: 1167,
    },
  ];

  function customizeTooltip(arg) {
    return {
      text: `${arg.argumentText}<br>${arg.seriesName}: ${arg.valueText}B`,
    };
  }
  return (
    <div>
      <PieChart
        id="pie"
        type="doughnut"
        innerRadius={0.6}
        palette="material"
        dataSource={data}
      >
        <Title text="Earnings and Streams">
          <Subtitle text="(From Music Platforms )" />
        </Title>

        <CommonSeriesSettings>
          <Label visible={false} />
        </CommonSeriesSettings>
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
            {stats?.earnings ? stats.earnings : 0}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ViewAlbumStats;
