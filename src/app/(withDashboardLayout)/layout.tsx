import DashboardDrawer from "@/components/Dashboard/DashboardDrawer/DashboardDrawer";
import AuthCheck from "./components/AuthCheck";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthCheck>
      <DashboardDrawer>{children}</DashboardDrawer>
    </AuthCheck>
  );
};

export default DashboardLayout;
