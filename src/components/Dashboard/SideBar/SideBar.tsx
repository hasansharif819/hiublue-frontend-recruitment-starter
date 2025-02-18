import { Box, List, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { drawerItems } from "../DashboardDrawer/drawerItems";
import SidebarItem from "./SidebarItem";
import Image from "next/image";
import logo from "@/assets/images/logo.png";

const SideBar = () => {
  return (
    <Box>
      <Stack
        sx={{
          py: 1,
          mt: 1,
        }}
        direction="row"
        justifyContent="left"
        paddingLeft={5}
        alignItems="center"
        gap={1}
        component={Link}
        href="/"
      >
        <Image src={logo} width={48} height={48} alt="logo" />
      </Stack>
      <Stack direction="row" gap={1} paddingLeft={5}>
        <Typography variant="h6" color="#919EAB">
          Overview
        </Typography>
      </Stack>
      <List sx={{ pl: 2 }}>
        {drawerItems().map((item, index) => (
          <SidebarItem key={index} item={item} />
        ))}
      </List>
    </Box>
  );
};

export default SideBar;
