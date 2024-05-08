import { AdminLayout } from "../components/layouts/AdminLayout";
import { MarketOverview, StockMarket } from "react-ts-tradingview-widgets";
import DashboardTable from "../components/dashboards/DashboardTable";
import { TradingSession } from "../components/dashboards/TradingSession";
import { AccountSummary } from "../components/dashboards/AccountSummary";
import { CardDataStats } from "../components/dashboards/CardDataStats";
import { useUserContext } from "../context/UserContext";
import VerificationCard from "../components/dashboards/VerificationCard";
import { DepositState } from "../types/deposit";

type Props = {};

const tabs = [
  {
    title: "Cryptocurrency",
    symbols: [
      {
        s: "BITSTAMP:BTCUSD",
        d: "Bitcoin / U.S dollar",
      },
      {
        s: "BINANCE:ETHUSDT",
        d: "Ethereum / TetherUS",
      },
      {
        s: "BITSTAMP:ETHUSD",
        d: "Ethereum / U.S. dollar",
      },
      {
        s: "BINANCE:BNBUSDT",
        d: "Binance Coin / TetherUs",
      },
      {
        s: "BINANCE:SHIBUSDT",
        d: "SHIB / TetherUS",
      },
      {
        s: "BINANCE:DOGEUSDT",
        d: "Dogecoin / TetherUS",
      },
    ],
    originalTitle: "Cryptocurrency",
  },
  {
    title: "Indices",
    symbols: [
      {
        s: "FOREXCOM:SPXUSD",
        d: "S&P 500",
      },
      {
        s: "FOREXCOM:NSXUSD",
        d: "Nasdaq 100",
      },
      {
        s: "FOREXCOM:DJI",
        d: "Dow 30",
      },
      {
        s: "INDEX:NKY",
        d: "Nikkei 225",
      },
      {
        s: "INDEX:DEU30",
        d: "DAX Index",
      },
      {
        s: "FOREXCOM:UKXGBP",
        d: "UK 100",
      },
    ],
    originalTitle: "Indices",
  },
  {
    title: "Commodities",
    symbols: [
      {
        s: "CME_MINI:ES1!",
        d: "S&P 500",
      },
      {
        s: "CME:6E1!",
        d: "Euro",
      },
      {
        s: "COMEX:GC1!",
        d: "Gold",
      },
      {
        s: "NYMEX:CL1!",
        d: "Crude Oil",
      },
      {
        s: "NYMEX:NG1!",
        d: "Natural Gas",
      },
      {
        s: "CBOT:ZC1!",
        d: "Corn",
      },
    ],
    originalTitle: "Commodities",
  },
  {
    title: "Bonds",
    symbols: [
      {
        s: "CME:GE1!",
        d: "Eurodollar",
      },
      {
        s: "CBOT:ZB1!",
        d: "T-Bond",
      },
      {
        s: "CBOT:UB1!",
        d: "Ultra T-Bond",
      },
      {
        s: "EUREX:FGBL1!",
        d: "Euro Bund",
      },
      {
        s: "EUREX:FBTP1!",
        d: "Euro BTP",
      },
      {
        s: "EUREX:FGBM1!",
        d: "Euro BOBL",
      },
    ],
    originalTitle: "Bonds",
  },
  {
    title: "Forex",
    symbols: [
      {
        s: "FX:EURUSD",
      },
      {
        s: "FX:GBPUSD",
      },
      {
        s: "FX:USDJPY",
      },
      {
        s: "FX:USDCHF",
      },
      {
        s: "FX:AUDUSD",
      },
      {
        s: "FX:USDCAD",
      },
    ],
    originalTitle: "Forex",
  },
];

const UserDashboard = (props: Props) => {
  const { state } = useUserContext();

  const totalWithdrawal = state.withdrawals?.reduce(
    (acc, curr) =>
      curr.status === "Completed" ? acc + Number(curr.amount) : 0,
    0
  );
  const totalDeposit = state.deposits?.reduce(
    (acc, curr) =>
      curr.status === "Completed" ? acc + Number(curr.amount) : 0,
    0
  );

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 ">
          <CardDataStats
            title="Total Balance"
            totalUsd={` ${state.account.balance}`}
            totalBtc={(Number(state.account.balance) / state.bitcoin).toFixed(
              8
            )}
          />
          <CardDataStats
            title="Total Profit"
            totalUsd={` ${state.account.profit}`}
            totalBtc={(Number(state.account.profit) / state.bitcoin).toFixed(8)}
          />
          <CardDataStats
            title="Total Bonus"
            totalUsd={` ${state.account.bonus}`}
            totalBtc={(Number(state.account.bonus) / state.bitcoin).toFixed(8)}
          />
        </div>
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 ">
          <CardDataStats title="Total Deposit" totalUsd={` ${totalDeposit}`} />
          <CardDataStats
            title="Total Withdrawal"
            totalUsd={` ${totalWithdrawal}`}
          />
          <VerificationCard />
        </div>
        <div className=" grid grid-cols-12 gap-4 md:gap-6 ">
          <div className=" flex h-full flex-col gap-5 col-span-12 xl:col-span-8">
            <MarketOverview
              colorTheme="light"
              height={850}
              width="100%"
              showFloatingTooltip
              tabs={tabs}
            ></MarketOverview>

            {/* <StockMarket height={700} width="100%" showChart></StockMarket> */}
          </div>
          <div className="col-span-12 xl:col-span-4 flex flex-col gap-5">
            <TradingSession />
          </div>
        </div>
        <div className="col-span-12 xl:col-span-4 flex flex-col gap-5">
          <DashboardTable />
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserDashboard;
