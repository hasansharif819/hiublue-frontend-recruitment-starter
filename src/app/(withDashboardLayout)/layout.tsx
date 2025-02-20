import DashboardDrawer from "@/components/Dashboard/DashboardDrawer/DashboardDrawer";
import AuthCheck from "./components/AuthCheck";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <AuthCheck>
        <DashboardDrawer>{children}</DashboardDrawer>
      </AuthCheck>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
