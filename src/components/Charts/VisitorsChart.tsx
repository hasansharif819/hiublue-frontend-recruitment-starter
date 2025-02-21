"use client";

import { fetcher } from "@/utils";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import useSWR from "swr";

const VisitorsChart: React.FC = () => {
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>("this-week");

  const { data: response, isLoading } = useSWR(
    `/dashboard/stat?filter=${typeFilter}`,
    fetcher
  );
  useEffect(() => {
    if (response) {
      const transformedSeries = [
        {
          name: "Desktop",
          data: [
            response?.website_visits?.monday?.desktop || 0,
            response?.website_visits?.tuesday?.desktop || 0,
            response?.website_visits?.wednesday?.desktop || 0,
            response?.website_visits?.thursday?.desktop || 0,
            response?.website_visits?.friday?.desktop || 0,
            response?.website_visits?.saturday?.desktop || 0,
            response?.website_visits?.sunday?.desktop || 0,
          ],
        },
        {
          name: "Mobile",
          data: [
            response?.website_visits?.monday?.mobile || 0,
            response?.website_visits?.tuesday?.mobile || 0,
            response?.website_visits?.wednesday?.mobile || 0,
            response?.website_visits?.thursday?.mobile || 0,
            response?.website_visits?.friday?.mobile || 0,
            response?.website_visits?.saturday?.mobile || 0,
            response?.website_visits?.sunday?.mobile || 0,
          ],
        },
      ];

      setSeries(transformedSeries);
    }
  }, [response]);

  if (isLoading) return <Box>Loading...</Box>;

  const options = {
    chart: { type: "bar" as const },
    xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
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
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            stacked: true,
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
        },
      },
    ],
  };

  return (
    <Box gap={3} width="100%">
      <Box flex={1}>
        <Chart options={options} series={series} type="bar" height={318} />
      </Box>
    </Box>
  );
};

export default VisitorsChart;
