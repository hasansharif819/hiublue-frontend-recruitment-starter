import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import MetricCard from "@/components/Cards/MetricCard";
import VisitorsChart from "@/components/Charts/VisitorsChart";
import OffersSentChart from "@/components/Charts/OffersSentChart";
import OfferList from "@/components/OfferList/OfferList";
import CardsData from "@/components/Cards/CardsData";

const Dashboard: React.FC = () => {
  return (
    <Box display="flex" width="100%">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Metric Cards */}
        <Stack direction="row" spacing={3}>
          <CardsData />
        </Stack>

        {/* Charts */}
        <Box
          display="flex"
          flexDirection={{ xs: "column", lg: "row" }}
          alignItems="stretch"
          gap={3}
          my={5}
        >
          <Box flex={1} width="100%" maxWidth="100%">
            <Typography
              variant="h6"
              color="#1C252E"
              fontWeight="bold"
              gutterBottom
            >
              Website visits
            </Typography>
            <Paper sx={{ p: 3, width: "100%" }}>
              <VisitorsChart />
            </Paper>
          </Box>

          <Box flex={1} width="100%" maxWidth="100%">
            <Typography
              variant="h6"
              color="#1C252E"
              fontWeight="bold"
              gutterBottom
            >
              Offers sent
            </Typography>
            <Paper sx={{ p: 3, width: "100%" }}>
              <OffersSentChart />
            </Paper>
          </Box>
        </Box>

        {/* Offer List */}
        <Box width="100%">
          <OfferList />
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
