import { Card, CardContent, Stack, Typography } from "@mui/material";
import downicon from "@/assets/icons/ic-solar_double-alt-arrow-down-bold-duotone.png";
import upicon from "@/assets/icons/ic-solar_double-alt-arrow-up-bold-duotone.png";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change }) => {
  return (
    <Card sx={{ width: "100%", p: 2, textAlign: "left" }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="left"
          gap={1}
        >
          <Typography variant="body2" color={change >= 0 ? "green" : "red"}>
            {change >= 0 ? (
              <img src={upicon.src} alt="up" />
            ) : (
              <img src={downicon.src} alt="down" />
            )}
          </Typography>
          <Typography variant="body2" color="#637381">
            previous month
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
