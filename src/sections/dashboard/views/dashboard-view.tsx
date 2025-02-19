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
    <Box display="flex">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Metric Cards */}
        <Stack direction="row" spacing={3}>
          <CardsData />
        </Stack>

        {/* Charts */}
        <Box
          display="flex"
          alignItems="center"
          flexDirection="row"
          gap={3}
          my={5}
        >
          <Stack width="100%">
            <Typography
              variant="h6"
              color="#1C252E"
              fontWeight="bold"
              gutterBottom
            >
              Website visits
            </Typography>
            <Paper sx={{ p: 3 }}>
              <VisitorsChart />
            </Paper>
          </Stack>
          <Stack width="100%">
            <Typography
              variant="h6"
              color="#1C252E"
              fontWeight="bold"
              gutterBottom
            >
              Offers sent
            </Typography>
            <Paper sx={{ p: 3 }}>
              <OffersSentChart />
            </Paper>
          </Stack>
        </Box>

        {/* Offer List */}
        <Box>
          <OfferList />
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
