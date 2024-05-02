import React, { useState } from "react";
import { AdminLayout } from "../components/layouts/AdminLayout";
import Modal from "../components/Modals/Modal";
import { history, usersInfo } from "../components/dashboards/data";
import { MdDeleteForever } from "react-icons/md";
import UploadButton from "../components/sharedUi/UploadButton";

type Props = {};

interface UserHistoryProps {
  amount: number;
  date: string;
  method: string;
  status: string;
  fullname: string;
  id: string;
  userId: string;
  screenshot: string;
}

const AdminWithdrawal = (props: Props) => {
  const [loading, setLoading] = useState<{ [id: string]: boolean }>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [depositId, setDepositId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleUpdateWithdrawalStatus = (userId: string, id: string) => {
    let success = false;
    setLoading((prevLoading) => ({ ...prevLoading, [id]: true }));

    setTimeout(() => {
      
    }, 1000);
    setTimeout(() => {
      if (success) {
        setLoading((prevLoading) => ({ ...prevLoading, [id]: false }));
      }
    }, 500);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const showDeleteWithdrawalModal = (userId: string, depositId: string) => {
    setUserId(userId);
    setDepositId(depositId);
    setShowModal(true);
  };

  const handleRemoveWithdrawal = () => {
    setTimeout(() => {
      if (!userId) {
        return;
      }
      try {
        alert("remove");
      } catch (error) {
        console.log(error);
      } finally {
        setShowModal(false);
      }
    }, 1000);
  };

  return (
    <AdminLayout>
      <Modal
        show={showModal}
        closeModal={closeModal}
        title="Delete Deposit"
        height={270}
        width={400}
      >
        <div className="flex text-center items-center justify-center">
          <div>
            <h2 className="text-xl">
              Are you sure you want to delete this Withdrawal.
            </h2>
            <div className="flex justify-center gap-x-4 mt-8">
              <button
                onClick={handleRemoveWithdrawal}
                className="bg-meta-3 flex justify-center items-center text-white rounded-md font-medium px-8 py-2"
                type="submit"
              >
                Yes
              </button>
              <button
                onClick={closeModal}
                className="bg-danger flex justify-center items-center text-white rounded-md font-medium px-8 py-2"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </Modal>
      {usersInfo?.length > 0 && (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <h2 className="font-bold text-xl mb-5">ALL USERS WITHDRAWALS</h2>
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-primary text-left dark:bg-meta-4">
                  <th className="min-w-[100px] py-4 px-4 font-medium text-white dark:text-white">
                    S/N
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-white dark:text-white">
                    Fullname
                  </th>
                  <th className="min-w-[180px] py-4 px-4 font-medium text-white dark:text-white">
                    Withdrawal Method
                  </th>
                  <th className="min-w-[100px] py-4 px-4 font-medium text-white dark:text-white">
                    Amount
                  </th>

                  <th className="min-w-[160px] py-4 px-4 font-medium text-white dark:text-white">
                    Date
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-white dark:text-white">
                    Status
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-white dark:text-white">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {history.map((userHistory: UserHistoryProps, key: number) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="text-black  dark:text-white">{key + 1}</h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {userHistory.fullname}
                      </h5>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {userHistory.method}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        ${userHistory.amount}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-white">
                        {userHistory.date}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                          userHistory.status === "Completed"
                            ? "text-success bg-success"
                            : "text-warning bg-warning"
                        }`}
                      >
                        {userHistory.status}
                      </p>
                    </td>
                    {userHistory.status === "Pending" && (
                      <td className="border-b border-[#eee] py-5 px-4 flex items-center gap-x-2 dark:border-strokedark">
                        <UploadButton
                          approveBtnClick={handleUpdateWithdrawalStatus}
                          userId={userHistory.userId}
                          id={userHistory.id}
                          loading={loading[userHistory.id] || false}
                          btnText="Approve"
                        />
                        <button
                          onClick={() =>
                            showDeleteWithdrawalModal(
                              userHistory.userId,
                              userHistory.id
                            )
                          }
                          className="w-[110px] rounded-md  bg-danger text-white py-2 px-3 flex items-center justify-center  gap-x-2"
                        >
                          <MdDeleteForever />
                          Remove
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminWithdrawal;
