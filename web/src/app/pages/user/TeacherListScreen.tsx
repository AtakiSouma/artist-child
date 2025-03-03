/* eslint-disable @typescript-eslint/no-explicit-any */
import Table, { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { TeachersData } from "../../models/user.models";
import { useAppDispatch } from "../../redux/hook";
import {
  Alert,
  Dropdown,
  Input,
  Menu,
  MenuProps,
  Modal,
  Pagination,
  Tag,
  notification,
} from "antd";
import useTeacher from "../../hooks/useTeacher";
import {
  setCurrentPage,
  setSearchValue,
  setTeacherLoading,
} from "../../redux/slice/teacherSlice";
import { TitleComponent } from "../../components/TextComponent/TextComponents";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { GoShieldCheck } from "react-icons/go";
import { BsEyeFill } from "react-icons/bs";
import { GoEye } from "react-icons/go";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import ModalComponentInTeacher from "../../components/ModalCompoenetInTeacher";
import agent from "../../utils/agent";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";

type columnProps = {
  currentPage: number;
  displayData: number;
};

const TeacherListScreen = () => {
  const navigate = useNavigate();
  const items = (record: TeachersData) => [
    {
      label: (
        <div
          className="flex flex-row items-center gap-2 hover:text-blue-400"
          onClick={() => showModal(record.id)}
        >
          <GoEye />
          <p>View</p>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div
          className={`flex flex-row items-center gap-2 hover:text-green-400 ${record.isCertified !== "Yes" ? "hidden" : ""}`}
          onClick={() => acceptInstructor(record.id)}
        >
          <GoShieldCheck />
          <p>Approve</p>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div
          className={`flex flex-row items-center gap-2 hover:text-red-400 ${record.isCertified !== "Yes" ? "hidden" : ""}`}
          onClick={() => handleRejectModal(record.id)}
        >
          <AiOutlineDelete />
          <p>Reject</p>
        </div>
      ),
      key: "2",
    },
  ];
  // handle modal
  const [modalRecord, setModalRecord] = useState<TeachersData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [rejectId, setRejectId] = useState("");
  const [message, setMessage] = useState("");

  const fetchDetail = async (id: string) => {
    try {
      const response = await agent.User.getInstructorDetail(id);
      console.log(response);
      setModalRecord(response);
      if (response) {
        setIsModalOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const showModal = (id: string) => {
    fetchDetail(id);
  };

  const acceptInstructor = async (id: string) => {
    try {
      const response = await agent.User.acceptInstructor(id);
      if (response) {
        notification.success({
          message: "Success",
          description: "Instructor has been accepted",
          placement: "topRight",
        });
        dispatch(setTeacherLoading(false));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectModal = async (id: string) => {
    setRejectId(id);
    setRejectModal(true);
  };

  const rejectInstructor = async (reasons: string) => {
    try {
      const response = await agent.User.rejectInstructor(rejectId, reasons);
      if (response) {
        notification.success({
          message: "Success",
          description: "Instructor has been rejected",
          placement: "topRight",
        });
        dispatch(setTeacherLoading(false));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = () => {
    if (!message) {
      notification.error({
        message: "Error",
        description: "Please provide rejection reasons.",
        placement: "topRight",
      });
      return;
    }
    rejectInstructor(message);
    setIsModalOpen(false);
    setRejectModal(false);
    setMessage("");
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setRejectModal(false);
  };
  const getMenu = (record: TeachersData) => (
    <Menu>
      {items(record).map((item) => (
        <Menu.Item key={item.key}>{item.label} </Menu.Item>
      ))}
    </Menu>
  );
  // handle modal
  const columns = ({
    currentPage,
    displayData,
  }: columnProps): ColumnsType<TeachersData> => [
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
      title: "Thumbnail",
      dataIndex: "photoUrl",
      width: "5%",
      render: (photoUrl) => (
        <div className="w-[40px] h-[40px]">
          <img
            src={
              photoUrl ||
              "https://cdn.donmai.us/original/1e/f8/1ef80a41ffae75b8f58f75ff8e1981ea.png"
            }
            alt={photoUrl}
            className="object-fill w-[100%] h-[100%] rounded-lg"
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
    {
      title: "Status Account",
      dataIndex: "isCertified",
      key: "stt",
      render: (isCertified) => {
        return (
          <>
            {isCertified === "Proccessing" ? (
              <Tag icon={<SyncOutlined spin />} color="processing">
                Processing
              </Tag>
            ) : (
              <>
                {isCertified === "Yes" ? (
                  <>
                    <Tag icon={<CheckCircleOutlined />} color="success">
                      Verified
                    </Tag>
                  </>
                ) : (
                  <>
                    <Tag icon={<CloseCircleOutlined />} color="error">
                      Not Yet
                    </Tag>
                  </>
                )}
              </>
            )}
          </>
        );
      },

      width: "10%",
    },
    {
      title: "Premium Account",
      dataIndex: "hasPaid",
      key: "stt",
      render: (hasPaid) => (
        <div className=" text-md">
          {hasPaid === true ? "Premium" : "Normal"}
        </div>
      ),
      width: "10%",
    },
    {
      title: "Date created",
      dataIndex: "createdAt",
      key: "stt",
      render: (createdAt: Date) => {
        const date = new Date(createdAt);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        return <div className="text-md">{formattedDate}</div>;
      },
      width: "10%",
    },
    {
      title: "Action",
      dataIndex: "id",
      width: "5%",
      render: (id, record) => (
        <>
          <Dropdown overlay={() => getMenu(record)} trigger={["click"]}>
            <div className="flex flex-col items-center">
              <BsThreeDots
                className="hover:cursor-pointer"
                size={15}
                onClick={(e) => e.preventDefault()}
              />
            </div>
          </Dropdown>
        </>
      ),
    },
  ];

  const dispatch = useAppDispatch();
  const { Search } = Input;
  const {
    currentPage,
    pageCount,
    teacherAdaptersByPage,
    teacherLoading,
    searchValue,
  } = useTeacher();
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    if (!teacherAdaptersByPage[page]) {
      dispatch(setTeacherLoading(false));
    }
  };
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(setTeacherLoading(false));
    }
  };
  const tableColumns = columns({ currentPage, displayData: 8 });

  return (
    <>
      <div className="container mx-auto px-8">
        <TitleComponent text="Course management" color="" level={2} />
        <div className="flex items-center justify-between mb-2">
          <Search
            placeholder="Search"
            className="w-[30%]"
            size="middle"
            onChange={(e: any) => dispatch(setSearchValue(e.target.value))}
            onKeyPress={handleSearchKeyPress}
          />
        </div>
        <Table
          columns={tableColumns}
          dataSource={teacherAdaptersByPage[currentPage]}
          loading={!teacherLoading}
          pagination={false}
          bordered={true}
          rowKey={(record) => record.id}
          className="items-center"
        />
        <Pagination
          className="flex justify-end mt-4"
          disabled={!teacherLoading}
          current={currentPage}
          total={pageCount * 10}
          onChange={handlePageChange}
        />
      </div>
      <ModalComponentInTeacher
        handleCancel={handleCancel}
        handleOk={handleOk}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        showModal={showModal}
        item={modalRecord}
      />
      <Modal
        title="Rejection Reasons"
        open={rejectModal}
        onOk={handleFormSubmit}
        onCancel={handleCancel}
      >
        <form onSubmit={handleFormSubmit}>
          <TextArea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter rejection reasons..."
          />
        </form>
      </Modal>
    </>
  );
};

export default TeacherListScreen;
