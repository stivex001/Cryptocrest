import { CircleCheck, CircleMinus, CirclePlus } from "lucide-react";
import React from "react";
import { SummaryCardDataStats } from "./CardDataStats";
import { useUserContext } from "../../context/UserContext";

type Props = {};

export const AccountSummary = (props: Props) => {
  const { state } = useUserContext();

  console.log(state);

  return (
    <div className="bg-white rounded-lg">
      <div className="px-2 py-5  border-b border-b-gray">
        <h3 className="uppercase text-lg font-semibold">Account Summary</h3>
      </div>
      <div className="flex flex-col">
        <SummaryCardDataStats
          title="Total Deposit"
          icon={<CirclePlus color="#0064fa" size={30} />}
          desc="$199,000.00"
          action="Deposit"
          url="/user/deposit"
        />
        <SummaryCardDataStats
          title="Total Withdrawals"
          icon={<CircleMinus color="#0064fa" size={30} />}
          desc="0.00"
          action="Withdraw"
          url="/user/withdrawal"
        />
        <SummaryCardDataStats
          title="Verification"
          icon={<CircleCheck color="#0064fa" size={30} />}
          desc="Fully verified."
          action="Verified"
          url="/user/verify"
          verify
        />
      </div>
    </div>
  );
};
