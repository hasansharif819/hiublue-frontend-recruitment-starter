"use client";

import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MetricCard from "./MetricCard";
import useSWR from "swr";
import { fetcher } from "@/utils";

const CardsData: React.FC = () => {
  const [currentActiveUsers, setCurrentActiveUsers] = useState<number>(0);
  const [currentClicks, setCurrentClicks] = useState<number>(0);
  const [currentAppearances, setCurrentAppearances] = useState<number>(0);
  const [previousActiveUsers, setPreviousActiveUsers] = useState<number>(0);
  const [previousClicks, setPreviousClicks] = useState<number>(0);
  const [previousAppearances, setPreviousAppearances] = useState<number>(0);
  const [activeUsersChange, setActiveUsersChange] = useState<number>(0);
  const [clicksChange, setClicksChange] = useState<number>(0);
  const [appearancesChange, setAppearancesChange] = useState<number>(0);
  const [typeFilter, setTypeFilter] = useState<string>("this-week");

  const {
    data: response,
    error,
    isLoading,
  } = useSWR(`/dashboard/summary?filter=${typeFilter}`, fetcher);

  useEffect(() => {
    if (response) {
      // Set current values
      setCurrentActiveUsers(response?.current?.active_users || 0);
      setCurrentClicks(response?.current?.clicks || 0);
      setCurrentAppearances(response?.current?.appearance || 0);
      setPreviousActiveUsers(response?.previous?.active_users || 0);
      setPreviousClicks(response?.previous?.clicks || 0);
      setPreviousAppearances(response?.previous?.appearance || 0);

      // Calculate percentage changes
      const calculateChange = (current: number, previous: number) => {
        if (previous === 0) return 0;
        return ((current - previous) / previous) * 100;
      };

      setActiveUsersChange(
        calculateChange(
          response?.current?.active_users || 0,
          response?.previous?.active_users || 0
        )
      );
      setClicksChange(
        calculateChange(
          response?.current?.clicks || 0,
          response?.previous?.clicks || 0
        )
      );
      setAppearancesChange(
        calculateChange(
          response?.current?.appearance || 0,
          response?.previous?.appearance || 0
        )
      );
    }
  }, [response]);

  if (error) {
    throw new Error("Failed to fetch data");
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box width="100%">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ my: 3 }}
      >
        <Typography variant="h4" color="#1C252E" fontWeight="bold" gutterBottom>
          Dashboard
        </Typography>

        <Stack direction="row" spacing={3}>
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as string)}
            label="Type"
            sx={{ width: 150, height: 40, color: "#000" }}
          >
            <MenuItem value="this-week">This week</MenuItem>
            <MenuItem value="prev-week">Previous week</MenuItem>
          </Select>
        </Stack>
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        gap={3}
        // flexWrap="wrap"
        width="100%"
      >
        <MetricCard
          title="Total active users"
          currentValue={`${currentActiveUsers.toLocaleString()}`}
          previousValue={`${previousActiveUsers.toLocaleString()}`}
          change={activeUsersChange}
        />
        <MetricCard
          title="Total clicks"
          currentValue={`${currentClicks.toLocaleString()}`}
          previousValue={`${previousClicks.toLocaleString()}`}
          change={clicksChange}
        />
        <MetricCard
          title="Total appearances"
          currentValue={`${currentAppearances.toLocaleString()}`}
          previousValue={`${previousAppearances.toLocaleString()}`}
          change={appearancesChange}
        />
      </Box>
    </Box>
  );
};

export default CardsData;
