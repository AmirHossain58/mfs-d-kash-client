import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "./../layouts/DashboardLayout";
import Login from "./../pages/Login/Login";
import SignUp from "./../pages/SignUp/SignUp";
import Profile from "../pages/dashboard/Common/Profile";
import SendMoney from "../pages/dashboard/user/SendMoney";
import PrivateRoute from "./PrivateRoute";
import CashOut from "./../pages/dashboard/user/CashOut";
import CashIn from "../pages/dashboard/user/CashIn";
import TransactionHistory from "../pages/dashboard/user/TransactionHistory";
import TransactionHistoryAgent from "../pages/dashboard/Agent/TransactionHistoryAgent";
import TransactionManagement from "../pages/dashboard/Agent/TransactionManagementAgent";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Profile />,
      },
      {
        path: "send-money",
        element: <SendMoney />,
      },
      {
        path: "cash-out",
        element: <CashOut />,
      },
      {
        path: "cash-in",
        element: <CashIn />,
      },
      {
        path: "transactions-history",
        element: <TransactionHistory />,
      },
      {
        path: "transaction-management",
        element: <TransactionManagement />,
      },
      {
        path: "transactions-history-agent",
        element: <TransactionHistoryAgent />,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
]);
export default router;
