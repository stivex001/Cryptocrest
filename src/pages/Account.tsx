import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AdminLayout } from "../components/layouts/AdminLayout";
import Modal from "../components/Modals/Modal";
import { usersInfo } from "../components/dashboards/data";
import UploadButton3 from "../components/sharedUi/UploadButton3";
import { SearchBar } from "../components/sharedUi/Searchbar";
import { Pagination } from "../components/sharedUi/Pagination";
import { User } from "../types/types";

type Props = {};

const Account = (props: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [accountInput, setAccountInput] = useState({
    balance: "",
    profit: "",
    bonus: "",
  });
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState<{ [currentUserId: string]: boolean }>(
    {}
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(usersInfo);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const results = usersInfo?.filter(
      (user) =>
        user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.firstname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.mobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.lastname?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(results);
  }, [searchTerm]);

  const pageSize = 5;

  const startIndex = (currentPage - 1) * pageSize;

  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAccountInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading((prevLoading) => ({ ...prevLoading, [userId]: true }));

    closeModal();
  };

  const handleClickToggleModal = (
    user: any,
    balance: string,
    profit: string,
    bonus: string
  ) => {
    setShowModal(true);
    setUserId(user);
    setAccountInput((prev) => {
      return { ...prev, balance, profit, bonus };
    });
  };

  return (
    <AdminLayout>
      <Modal
        show={showModal}
        closeModal={closeModal}
        title="Update Balance"
        width={500}
        height={500}
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-5 mt-10">
            <label className="mb-2.5 block font-medium text-black">
              Account Balance
            </label>
            <div className="relative">
              <input
                type="text"
                name="balance"
                required
                value={accountInput.balance}
                onChange={handleInputChange}
                placeholder="Balance"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
              />
            </div>
          </div>
          <div className="mb-5">
            <label className="mb-2.5 block font-medium text-black">
              Profit
            </label>
            <div className="relative">
              <input
                type="text"
                name="profit"
                required
                value={accountInput.profit}
                onChange={handleInputChange}
                placeholder="Profit"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
              />
            </div>
          </div>
          <div>
            <label className="mb-2.5 block font-medium text-black">Bonus</label>
            <div className="relative">
              <input
                type="text"
                name="bonus"
                required
                value={accountInput.bonus}
                onChange={handleInputChange}
                placeholder="Bonus"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none"
              />
            </div>
          </div>
          <div className="flex gap-x-4 mt-8">
            <button
              className="bg-meta-3 flex justify-center items-center text-black rounded-md font-medium px-8 py-2"
              type="submit"
            >
              Update
            </button>
            <button
              onClick={closeModal}
              className="bg-danger flex justify-center items-center text-black rounded-md font-medium px-8 py-2"
            >
              Close
            </button>
          </div>
        </form>
      </Modal>
      {usersInfo?.length > 0 && (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <h2 className="font-bold text-xl mb-5 bg-primary p-4 text-white rounded-md ">
            ALL USERS BALANCE
          </h2>
          <SearchBar
            classname="mb-5"
            onSearch={setSearchTerm}
            searchTerm={searchTerm}
          />
          <div className="max-w-full overflow-x-auto no-scrollbar">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left border-2">
                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-black">
                    S/N
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-black">
                    Fullname
                  </th>
                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-black">
                    Balance
                  </th>
                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-black">
                    Profit
                  </th>
                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-black">
                    Bonus
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-black">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers?.map((userItem: any, key: number) => (
                  <tr key={key}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="text-black  dark:text-black">{userItem?.userId}</h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-black">
                        {userItem?.firstname} {userItem?.lastname}
                      </h5>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-black">
                        ${userItem?.totalBalance}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-black">
                        ${userItem.totalProfit}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p className="text-black dark:text-black">
                        ${userItem.totalBonus}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 flex items-center gap-x-2 dark:border-strokedark">
                      <UploadButton3
                        approveBtnClick={handleClickToggleModal}
                        userId={userItem.userId}
                        loading={loading[userItem.userId] || false}
                        btnText="Update Account"
                        balance={userItem.totalBalance}
                        profit={userItem.totalProfit}
                        bonus={userItem.totalBonus}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            totalPages={Math.ceil(filteredUsers?.length / pageSize)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </AdminLayout>
  );
};

export default Account;
