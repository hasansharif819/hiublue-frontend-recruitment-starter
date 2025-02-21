"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Pagination,
  Box,
  Typography,
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  InputAdornment,
  Tabs,
  Tab,
} from "@mui/material";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import MoreVertSharpIcon from "@mui/icons-material/MoreVertSharp";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

interface Offer {
  id: number;
  user_name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  status: string;
  type: string;
  price: number;
}

interface ApiResponse {
  data: Offer[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

const OffersList: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<Offer[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [tabIndex, setTabIndex] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const statusFilter = tabIndex === "accepted" ? "&status=accepted" : "";
        const response = await fetch(
          `https://dummy-1.hiublue.com/api/offers?page=${currentPage}&per_page=${pageSize}${statusFilter}`,
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
        setOffers(data.data);
        setFilteredOffers(data.data);
        setTotalPages(data.meta.last_page);
        setTotalItems(data.meta.total);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, pageSize, tabIndex]);

  useEffect(() => {
    const filtered = offers.filter((offer) => {
      const matchesSearchTerm =
        offer.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.company.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTypeFilter =
        typeFilter === "all" ||
        offer.type.toLowerCase() === typeFilter.toLowerCase();

      return matchesSearchTerm && matchesTypeFilter;
    });

    setFilteredOffers(filtered);
  }, [searchTerm, typeFilter, offers]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (event: any) => {
    setPageSize(event.target.value);
    setCurrentPage(1);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
    setCurrentPage(1);
  };

  const from = (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalItems);

  return (
    <Box sx={{ padding: 3, border: "1px solid #E0E0E0", borderRadius: "10px" }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", marginBottom: 3 }}
        gutterBottom
      >
        Offers List
      </Typography>

      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        sx={{
          mb: 3,
          "& .MuiTabs-indicator": {
            backgroundColor: "#1C252E",
          },
        }}
      >
        <Tab
          label="All"
          value="all"
          sx={{
            color: "#1C252E",
            "&.Mui-selected": {
              color: "#1C252E",
            },
          }}
        />
        <Tab
          label="Accepted"
          value="accepted"
          sx={{
            color: "#1C252E",
            "&.Mui-selected": {
              color: "#1C252E",
            },
          }}
        />
      </Tabs>

      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="Search"
          placeholder="Search..."
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ maxWidth: "50%" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchSharpIcon />
              </InputAdornment>
            ),
          }}
        />

        <FormControl variant="outlined" sx={{ minWidth: 150 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as string)}
            label="Type"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="pay-as-you-go">Pay As You Go</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Job Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Price</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOffers?.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell>{offer.user_name}</TableCell>
                <TableCell>{offer.email}</TableCell>
                <TableCell>{offer.phone}</TableCell>
                <TableCell>{offer.company}</TableCell>
                <TableCell>{offer.jobTitle}</TableCell>
                <TableCell>{offer.type}</TableCell>
                <TableCell>
                  {offer.status && offer.status === "accepted" ? (
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        borderRadius: "10px",
                        color: "#118D57",
                        backgroundColor: "#22C55E29",
                        fontSize: "12px",
                        textTransform: "capitalize",
                      }}
                    >
                      {offer.status}
                    </Button>
                  ) : offer.status && offer.status === "rejected" ? (
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        borderRadius: "10px",
                        color: "#B71D18",
                        backgroundColor: "#FF563029",
                        fontSize: "12px",
                        textTransform: "capitalize",
                      }}
                    >
                      {offer.status}
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        borderRadius: "10px",
                        color: "#B76E00",
                        backgroundColor: "#FFAB0029",
                        fontSize: "12px",
                        textTransform: "capitalize",
                      }}
                    >
                      {offer.status}
                    </Button>
                  )}
                </TableCell>
                <TableCell>${offer.price}</TableCell>
                <TableCell sx={{ cursor: "pointer" }}>
                  <EditSharpIcon />
                </TableCell>
                <TableCell sx={{ cursor: "pointer" }}>
                  <MoreVertSharpIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
          marginTop: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body1">Rows per page:</Typography>
          <FormControl variant="standard" sx={{ minWidth: 80 }}>
            <Select
              value={pageSize}
              onChange={handlePageSizeChange}
              label="Rows per page"
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="body1">
            {from}-{to} of {totalItems}
          </Typography>
        </Box>

        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          siblingCount={0}
          boundaryCount={0}
          showFirstButton={false}
          showLastButton={false}
          size="small"
        />
      </Box>
    </Box>
  );
};

export default OffersList;
