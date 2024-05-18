import { useUserContext } from "../../context/UserContext";
import { Deposit, DepositState } from "../../types/deposit";
import { WithdrawalState } from "../../types/types";
// import { withdrawalData } from "../dashboards/data";

export default function WithdrawalTable() {
  const { state } = useUserContext();
  const withdrawalData = state.withdrawals;

  if (!withdrawalData) {
    return null;
  }

  return (
    <>
      <div className="rounded-sm  bg-white px-5 pt-6 pb-2.5 shadow-default  dark:bg-transparent sm:px-7.5 xl:pb-1">
        <h2 className="font-bold text-xl mb-5">Withdrawal History</h2>
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                  Method
                </th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                  Amount
                </th>

                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Status
                </th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {withdrawalData.length > 0 &&
                withdrawalData.map((data: WithdrawalState, key: number) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="text-black  dark:text-white">
                        {data.method}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        ${data.amount}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                          data.status === "Completed"
                            ? "text-success bg-success"
                            : data.status === "UnCompleted"
                            ? "text-danger bg-danger"
                            : "text-warning bg-warning"
                        }`}
                      >
                        {data.status}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {data.date}
                      </h5>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {withdrawalData.length < 1 && (
            <p className="text-center mt-5 text-xl">No Recent Withdrawal</p>
          )}
        </div>
      </div>
    </>
  );
}
