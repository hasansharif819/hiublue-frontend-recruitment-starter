import Link from "next/link";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { usePathname } from "next/navigation";
import { DrawerItem } from "@/types/common";
import Image from "next/image";

type IProps = {
  item: DrawerItem;
};

const SidebarItem = ({ item }: IProps) => {
  const linkPath = `/${item.path}`;
  const pathname = usePathname();

  return (
    <Link href={linkPath} style={{ textDecoration: "none" }}>
      <ListItem
        disablePadding
        sx={{
          ...(pathname === linkPath
            ? {
                "& svg": {
                  color: "#637381",
                },
              }
            : {}),
          mb: 1,
        }}
      >
        <ListItemButton>
          <ListItemIcon sx={{ mr: -2 }}>
            {item.image && (
              <Image src={item.image} width={24} height={24} alt="icon" />
            )}
          </ListItemIcon>
          <ListItemText
            primary={item.title}
            sx={{ color: "#637381", fontSize: 14 }}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarItem;
