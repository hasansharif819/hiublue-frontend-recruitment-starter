"use client";

import { fetcher } from "@/utils";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import useSWR from "swr";

const OffersSentChart: React.FC = () => {
  const [series, setSeries] = useState<{ name: string; data: number[] }[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>("this-week");

  const { data: response, isLoading } = useSWR(
    `/dashboard/stat?filter=${typeFilter}`,
    fetcher
  );

  useEffect(() => {
    if (response?.offers_sent) {
      setSeries([
        {
          name: "Offers Sent",
          data: [
            response.offers_sent.sunday ?? 0,
            response.offers_sent.monday ?? 0,
            response.offers_sent.tuesday ?? 0,
            response.offers_sent.wednesday ?? 0,
            response.offers_sent.thursday ?? 0,
            response.offers_sent.friday ?? 0,
            response.offers_sent.saturday ?? 0,
          ],
        },
      ]);
    }
  }, [response]);

  const options = {
    chart: { type: "line" as const },
    xaxis: { categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
    stroke: { curve: "smooth" as const },
    colors: ["#000"],
  };

  if (isLoading) return <Box>Loading...</Box>;

  return (
    <Box width="100%">
      <Chart options={options} series={series} type="line" height={318} />
    </Box>
  );
};

export default OffersSentChart;
