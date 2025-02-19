"use client";

import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const VisitorsChart: React.FC = () => {
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "https://dummy-1.hiublue.com/api/dashboard/stat?filter=this-week",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        // Transform the API data into the required format
        const transformedSeries = [
          {
            name: "Desktop",
            data: [
              data.website_visits.monday.desktop,
              data.website_visits.tuesday.desktop,
              data.website_visits.wednesday.desktop,
              data.website_visits.thursday.desktop,
              data.website_visits.friday.desktop,
              data.website_visits.saturday.desktop,
              data.website_visits.sunday.desktop,
            ],
          },
          {
            name: "Mobile",
            data: [
              data.website_visits.monday.mobile,
              data.website_visits.tuesday.mobile,
              data.website_visits.wednesday.mobile,
              data.website_visits.thursday.mobile,
              data.website_visits.friday.mobile,
              data.website_visits.saturday.mobile,
              data.website_visits.sunday.mobile,
            ],
          },
        ];

        setSeries(transformedSeries);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const options = {
    chart: { type: "bar" as const },
    xaxis: { categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
    colors: ["#007867", "#FFAB00"],
    legend: { position: "top" as const },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    yaxis: {
      title: {
        text: "Visitors",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          return val + " visitors";
        },
      },
    },
  };

  return <Chart options={options} series={series} type="bar" height={318} />;
};

export default VisitorsChart;
