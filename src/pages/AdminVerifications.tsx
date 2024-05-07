import React, { useEffect, useState } from "react";
import { AdminLayout } from "../components/layouts/AdminLayout";
import Modal from "../components/Modals/Modal";
import { usersInfo, verifications } from "../components/dashboards/data";
import { FaRegEyeSlash } from "react-icons/fa";
import UploadButton2 from "../components/sharedUi/UploadButton2";
import { MdDeleteForever } from "react-icons/md";
import { User } from "../types/types";
import { SearchBar } from "../components/sharedUi/Searchbar";
import { Pagination } from "../components/sharedUi/Pagination";

type Props = {};

const AdminVerifications = (props: Props) => {
  const [viewImg, setViewImg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState<{ [currentUserId: string]: boolean }>(
    {}
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState(verifications);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const results = verifications?.filter(
      (user) =>
        user?.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.document?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.userId?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredUsers(results);
  }, [searchTerm]);

  const pageSize = 5;

  const startIndex = (currentPage - 1) * pageSize;

  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviewImg = (img: string) => {
    setShowModal(true);
    if (img) {
      setViewImg(img);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setViewImg("");
  };

  const handleVerification = (userId: string) => {
    setLoading((prevLoading) => ({ ...prevLoading, [userId]: true }));

    if (!userId) {
      return;
    }

    setTimeout(() => {
      try {
        alert("verified");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading((prevLoading) => ({ ...prevLoading, [userId]: false }));
      }
    }, 1000);
  };

  return (
    <AdminLayout>
      {showModal && (
        <Modal
          show={showModal}
          closeModal={closeModal}
          title="User IDentification"
          height={450}
          width={400}
        >
          <div className="flex items-center justify-center">
            <img src={viewImg} alt="user id" height={300} width={380} />
          </div>
        </Modal>
      )}
      {usersInfo?.length > 0 && (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <h2 className="font-bold text-xl mb-5 bg-primary p-4 text-white rounded-md ">
            ALL USERS
          </h2>
          <SearchBar
            classname="mb-5"
            onSearch={setSearchTerm}
            searchTerm={searchTerm}
          />
          <div className="max-w-full overflow-x-auto no-scrollbar">
            <table className="w-full table-auto ">
              <thead>
                <tr className=" text-left border-2 ">
                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-black">
                    S/N
                  </th>
                  <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-black">
                    Fullname
                  </th>
                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-black">
                    Document
                  </th>
                  <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-black">
                    Status
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
                      <h5 className="text-black  dark:text-white">
                        {userItem?.userId}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <h5 className="font-medium text-black dark:text-white">
                        {userItem.fullname}
                      </h5>
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <button
                        onClick={() => handlePreviewImg(userItem.document)}
                        className="w-[110px] rounded-md  bg-meta-3 text-white py-2 px-3 flex items-center justify-center  gap-x-1"
                      >
                        Preview <FaRegEyeSlash />
                      </button>
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <p
                        className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                          userItem.status === "Verified"
                            ? "text-success bg-success"
                            : "text-warning bg-warning"
                        }`}
                      >
                        {userItem?.status}
                      </p>
                    </td>

                    {userItem.status === "Pending" && (
                      <td className="border-b border-[#eee] py-5 px-4 flex items-center gap-x-2 dark:border-strokedark">
                        <UploadButton2
                          approveBtnClick={handleVerification}
                          userId={userItem.userId}
                          loading={loading[userItem.userId] || false}
                          btnText="Approve"
                        />
                        <button className="w-[110px] rounded-md  bg-danger text-white py-2 px-3 flex items-center justify-center  gap-x-1">
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

export default AdminVerifications;
