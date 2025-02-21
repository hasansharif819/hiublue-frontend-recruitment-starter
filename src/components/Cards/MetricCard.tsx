import { Card, CardContent, Stack, Typography } from "@mui/material";
import downicon from "@/assets/icons/ic-solar_double-alt-arrow-down-bold-duotone.png";
import upicon from "@/assets/icons/ic-solar_double-alt-arrow-up-bold-duotone.png";

interface MetricCardProps {
  title: string;
  currentValue: string;
  previousValue: string;
  change: number;
  sx?: any;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  currentValue,
  previousValue,
}) => {
  return (
    <Card sx={{ width: "100%", p: 2, textAlign: "left" }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4" fontWeight="bold">
          {currentValue}
        </Typography>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="left"
          gap={1}
        >
          <Typography
            variant="body2"
            color={
              Number(currentValue) >= Number(previousValue) &&
              Number(currentValue) !== 0
                ? "green"
                : "red"
            }
          >
            {Number(currentValue) >= Number(previousValue) ? (
              <img src={downicon.src} alt="up" />
            ) : (
              <img src={upicon.src} alt="down" />
            )}
          </Typography>
          <Typography variant="body2" color="#637381">
            {previousValue}
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

// import { Card, CardContent, Stack, Typography, Box } from "@mui/material";
// import Image from "next/image"; // ✅ Use Next.js Image for optimization
// import downicon from "@/assets/icons/ic-solar_double-alt-arrow-down-bold-duotone.png";
// import upicon from "@/assets/icons/ic-solar_double-alt-arrow-up-bold-duotone.png";

// interface MetricCardProps {
//   title: string;
//   currentValue: string;
//   previousValue: string;
//   change: number;
//   sx?: any;
// }

// const MetricCard: React.FC<MetricCardProps> = ({
//   title,
//   currentValue,
//   previousValue,
//   change,
// }) => {
//   const isPositiveChange =
//     Number(currentValue) >= Number(previousValue) &&
//     Number(previousValue) !== 0;

//   return (
//     <Card
//       sx={{
//         width: "100%",
//         p: 2,
//         textAlign: "left",
//       }}
//     >
//       <CardContent>
//         <Typography variant="h6">{title}</Typography>
//         <Typography variant="h4" fontWeight="bold">
//           {currentValue}
//         </Typography>

//         <Stack direction="row" alignItems="center" spacing={1}>
//           <Box
//             component="span"
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               color: isPositiveChange ? "green" : "red",
//             }}
//           >
//             <Image
//               src={isPositiveChange ? upicon : downicon}
//               alt={isPositiveChange ? "up" : "down"}
//               width={16}
//               height={16}
//             />
//             <Typography variant="body2" ml={0.5}>
//               {change.toFixed(1)}%
//             </Typography>
//           </Box>

//           <Typography variant="body2" color="#637381">
//             {previousValue} (Previous Month)
//           </Typography>
//         </Stack>
//       </CardContent>
//     </Card>
//   );
// };

// export default MetricCard;
