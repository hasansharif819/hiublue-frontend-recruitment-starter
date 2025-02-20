import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface DrawerItem {
  title: string;
  path: string;
  parentPath?: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string };
  child?: DrawerItem[];
  image?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface FormData {
  planType: string;
  refundable: boolean;
  onDemand: boolean;
  negotiable: boolean;
  price: number;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  loading: boolean;
}
