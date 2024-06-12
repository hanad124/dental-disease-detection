import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const generateColorPalette = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const hue = (i * 137.5) % 360; // Use a constant to get a good distribution of colors
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }
  return colors;
};

const ApexChart = ({ data }) => {
  console.log("data", data.classes);
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "Confidence",
        data: data.confidences,
      },
    ],
    options: {
      chart: {
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      // colors: generateColorPalette(data.classes.length),
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
          columnWidth: "55%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: false,
      },
      stroke: {
        colors: ["transparent"],
        width: 4,
      },
      xaxis: {
        categories: data.classes,
      },
      yaxis: {
        title: {
          text: "Confidence",
        },
        categories: data.classes,
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
      },
      tooltip: {
        y: {
          formatter(val) {
            return val.toFixed(2);
          },
        },
      },
    },
  });

  console.log("chartData", chartData);

  useEffect(() => {
    setChartData((prevState) => ({
      ...prevState,
      series: [
        {
          ...prevState.series[0],
          data: data.confidences,
        },
      ],
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: data.classes,
        },
        yaxis: {
          ...prevState.options.yaxis,
          categories: data.classes,
        },
        chart: {
          type: "bar",
          toolbar: {
            show: false,
          },
        },
        colors: [
          "#475BE8",
          "#CFC8FF",
          "#FFB8B8",
          "#FFD3B6",
          "#FFEEC5",
          "#D3F8E2",
        ],
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: false,
            columnWidth: "55%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          show: false,
        },
        stroke: {
          colors: ["transparent"],
          width: 4,
        },
      },
    }));
  }, [data]);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ApexChart;
