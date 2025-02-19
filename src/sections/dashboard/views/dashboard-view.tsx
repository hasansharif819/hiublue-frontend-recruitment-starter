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

const Dashboard: React.FC = () => {
  return (
    <Box display="flex">
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ my: 3 }}
        >
          <Typography
            variant="h4"
            color="#1C252E"
            fontWeight="bold"
            gutterBottom
          >
            Dashboard
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#fff", color: "#1C252E" }}
          >
            This week
          </Button>
        </Box>

        <Stack direction="row" spacing={3}>
          {/* Metric Cards */}
          <MetricCard title="Total active users" value="8.2k" change={8.2} />
          <MetricCard title="Total clicks" value="8.2k" change={8.2} />
          <MetricCard title="Total appearances" value="8.2k" change={-8.2} />
        </Stack>
        {/* Charts */}
        <Box
          display="flex"
          alignItems="center"
          flexDirection="row"
          gap={3}
          mt={5}
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
      </Container>
    </Box>
  );
};

export default Dashboard;
