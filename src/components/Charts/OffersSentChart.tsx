"use client";

import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const OffersSentChart: React.FC = () => {
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
            name: "Offers Sent",
            data: [
              data.offers_sent.monday,
              data.offers_sent.tuesday,
              data.offers_sent.wednesday,
              data.offers_sent.thursday,
              data.offers_sent.friday,
              data.offers_sent.saturday,
              data.offers_sent.sunday,
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
    chart: { type: "line" as const },
    xaxis: { categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
    stroke: { curve: "smooth" as const },
    colors: ["#000"],
  };

  return <Chart options={options} series={series} type="line" height={318} />;
};

export default OffersSentChart;
