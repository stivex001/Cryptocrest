import React from "react";
import { AdminLayout } from "../components/layouts/AdminLayout";
import { AdminCardDataStats } from "../components/dashboards/CardDataStats";
import { FaUsers } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { StockMarket } from "react-ts-tradingview-widgets";
import DashboardTable from "../components/dashboards/DashboardTable";
import { AccountSummary } from "../components/dashboards/AccountSummary";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4  ">
          <AdminCardDataStats
            title="Active Users"
            desc="259"
            icon={<FaUsers size={64} />}
            action="More info"
            url="/admin/users"
          />
          <AdminCardDataStats
            title="Blocked Users"
            desc="2"
            icon={<FaUsers size={64} />}
            action="More info"
            url="/admin/users"
          />
          <AdminCardDataStats
            title="Pending Verifications"
            desc="5"
            icon={<MdOutlineVerifiedUser size={64} />}
            action="More info"
            url="/admin/id-verification"
          />
          <AdminCardDataStats
            title="Pending Withdrawals"
            desc="79"
            icon={<IoWalletOutline size={64} />}
            action="More info"
            url="/admin/withdrawals"
          />
        </div>
        <StockMarket
          // colorTheme=""
          height={600}
          width="100%"
          showChart
        ></StockMarket>
        <DashboardTable />
        <AccountSummary />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
