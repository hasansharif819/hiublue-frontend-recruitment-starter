"use client";

import { Box, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MetricCard from "./MetricCard";

interface ApiResponse {
  current: {
    active_users: number;
    clicks: number;
    appearance: number;
  };
  previous: {
    active_users: number;
    clicks: number;
    appearance: number;
  };
}

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://dummy-1.hiublue.com/api/dashboard/summary?filter=${typeFilter}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: ApiResponse = await response.json();

        // Set current values
        setCurrentActiveUsers(data.current.active_users);
        setCurrentClicks(data.current.clicks);
        setCurrentAppearances(data.current.appearance);
        setPreviousActiveUsers(data.previous.active_users);
        setPreviousClicks(data.previous.clicks);
        setPreviousAppearances(data.previous.appearance);

        // Calculate percentage changes
        const calculateChange = (current: number, previous: number) => {
          if (previous === 0) return 0;
          return ((current - previous) / previous) * 100;
        };

        setActiveUsersChange(
          calculateChange(data.current.active_users, data.previous.active_users)
        );
        setClicksChange(
          calculateChange(data.current.clicks, data.previous.clicks)
        );
        setAppearancesChange(
          calculateChange(data.current.appearance, data.previous.appearance)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [typeFilter]);

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
