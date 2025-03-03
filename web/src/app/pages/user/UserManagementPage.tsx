import Table, { ColumnsType } from "antd/es/table";
import { UserData } from "../../models/user.models";
import { useAppDispatch } from "../../redux/hook";
import { Input, Pagination } from "antd";
import useUser from "../../hooks/useUser.hooks";
import {
  setCurrentPage,
  setSearchValue,
  setUserLoading,
} from "../../redux/slice/userSlice";
import React from "react";
import { TitleComponent } from "../../components/TextComponent/TextComponents";
type columnProps = {
  currentPage: number;
  displayData: number;
};
const UserManagementPage = () => {
  const columns = ({
    currentPage,
    displayData,
  }: columnProps): ColumnsType<UserData> => [
    {
      title: "STT",
      dataIndex: "stt",
      render: (_, __, index) => {
        const pageSize = displayData;
        const calculatedIndex = (currentPage - 1) * pageSize + index + 1;
        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>{calculatedIndex}</span>
          </div>
        );
      },
      width: "5%",
    },
    {
      title: "Avatar",
      dataIndex: "photoUrl",
      width: "10%",
      render: (photoUrl) => (
        <div className="w-[40px] h-[40px]">
          <img
            src={
              photoUrl ||
              "https://cdn.donmai.us/original/1e/f8/1ef80a41ffae75b8f58f75ff8e1981ea.png"
            }
            alt={photoUrl}
            className="object-fill w-[100%] h-[100%] rounded-full"
          />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "stt",
      render: (name) => <div className=" text-md">{name}</div>,
      width: "10%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "stt",
      render: (email) => <div className=" text-md">{email}</div>,
      width: "10%",
    },
  ];

  const dispatch = useAppDispatch();
  const { Search } = Input;
  const { currentPage, pageCount, userAdaptersByPage, userLoading } = useUser();
  const tableColumns = columns({ currentPage, displayData: 8 });
  console.log("user ", userAdaptersByPage[currentPage]);
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    if (!userAdaptersByPage[page]) {
      dispatch(setUserLoading(false));
    }
  };
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(setUserLoading(false));
    }
  };

  return (
    <div className="container mx-auto px-8">
      <TitleComponent text="User management" color="" level={2} />
      <div className="flex items-center justify-between mb-2">
        <Search
          placeholder="Search"
          className="w-[30%]"
          size="middle"
          onChange={(e) => dispatch(setSearchValue(e.target.value))}
          onKeyPress={handleSearchKeyPress}
        />
      </div>
      <Table
        columns={tableColumns}
        dataSource={userAdaptersByPage[currentPage]}
        loading={!userLoading}
        pagination={false}
        bordered={true}
        rowKey={(record) => record.id}
      />
      <Pagination
        className="flex justify-end mt-4"
        disabled={!userLoading}
        current={currentPage}
        total={pageCount * 10}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default UserManagementPage;
