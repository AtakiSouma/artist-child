/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import Table, { ColumnsType } from "antd/es/table";
import {
  Button,
  Input,
  Pagination,
  Modal,
  Image,
  Avatar,
  message,
  Spin,
  Tag,
} from "antd";
import { useAppDispatch } from "../../redux/hook";

import { TitleComponent } from "../../components/TextComponent/TextComponents";
import {
  ResultData,
  setCurrentPage,
  setResultLoading,
  setSearchValue,
} from "../../redux/slice/resultSlice";
import useResult from "../../hooks/useResult";
import { CourseData } from "../../models/course.model";
import TextArea from "antd/es/input/TextArea";
import { UserData } from "../../models/auth.models";
import agent from "../../utils/agent";
import { CheckCircleOutlined, SyncOutlined } from "@ant-design/icons";

type columnProps = {
  currentPage: number;
  displayData: number;
};

const ResultList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [result, setResult] = useState<ResultData>();
  const [isOpenReply, setOpenReply] = useState(false);
  const [replyData, setReplyData] = useState("");
  const [loading, setLoading] = useState(false);
  const userDataObject: UserData = JSON.parse(localStorage.getItem("user")!);

  const showModal = (record: ResultData) => {
    console.log("record", record);
    setResult(record);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setLoading(true);
    try {
      const data = {
        instructorId: userDataObject.user.id,
        resultId: result?.id ?? "",
        replyMessage: replyData,
      };
      await agent.Result.replyResult(data);
      message.success("Reply successfully");
      dispatch(setResultLoading(false));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const openReply = () => {
    setOpenReply(!isOpenReply);
  };
  const columns = ({
    currentPage,
    displayData,
  }: columnProps): ColumnsType<ResultData> => [
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
      title: "Course",
      dataIndex: "course",
      key: "stt",
      render: (course) => <div className=" text-md">{course.name}</div>,
      width: "10%",
    },
    {
      title: "Children",
      dataIndex: "user",
      key: "stt",
      render: (user) => <div className=" text-md">{user.name}</div>,
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
      title: "Status",
      dataIndex: "status",
      width: "5%",
      render: (status) => (
        <>
          <div>
            {!status === true ? (
              <>
                <Tag icon={<SyncOutlined spin />} color="processing">
                  processing
                </Tag>
              </>
            ) : (
              <>
                <Tag icon={<CheckCircleOutlined />} color="success">
                  Replied
                </Tag>
              </>
            )}
          </div>
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      width: "5%",
      render: (id, record) => (
        <>
          <Button
            disabled={record.status === true ? true : false}
            onClick={() => showModal(record)}
          >
            Reply
          </Button>
        </>
      ),
    },
  ];
  const dispatch = useAppDispatch();
  const { Search } = Input;
  const {
    currentPage,
    pageCount,
    resultAdaptersByPage,
    resultLoading,
    searchValue,
  } = useResult();
  const tableColumns = columns({ currentPage, displayData: 8 });
  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    if (!resultAdaptersByPage[page]) {
      dispatch(setResultLoading(false));
    }
  };
  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(setResultLoading(false));
    }
  };
  return (
    <>
      {loading ? (
        <>
          <div className="flex items-center flex-col justify-center mt-64">
            <Spin tip="Send reply for children , please wait....." size="large">
              <div className="content w-[500px]" />
            </Spin>
          </div>
        </>
      ) : (
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
              dataSource={resultAdaptersByPage[currentPage]}
              loading={!resultLoading}
              pagination={false}
              bordered={true}
              rowKey={(record) => record.id}
              className="items-center"
            />
            <Pagination
              className="flex justify-end mt-4"
              disabled={!resultLoading}
              current={currentPage}
              total={pageCount * 10}
              onChange={handlePageChange}
            />
          </div>
          <Modal
            title="Reply Result"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <>
              <div className="flex flex-row w-full items-center gap-3">
                <div className="w-[60%] p-2 border-green-950 border-[1px] rounded-lg ">
                  <Image
                    className="object-cover w-full rounded-md"
                    src={
                      result?.image.url
                        ? result?.image.url
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
                    }
                  />
                </div>
                <div className="w-[40%] p-2 flex flex-col flex-start border-green-950 border-[1px] rounded-lg">
                  <div className="">{result?.message}</div>
                  <div className="flex flex-row items-center">
                    <div>
                      <Avatar src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png" />
                    </div>
                    <div className="text-gray-500">{result?.user.name}</div>
                  </div>
                </div>
              </div>
            </>
            <div className="py-2 px-2">
              <Button onClick={() => openReply()} type="default">
                Reply
              </Button>
            </div>
            {isOpenReply && (
              <form>
                <TextArea
                  placeholder="Reply the user"
                  onChange={(e) => setReplyData(e.target.value)}
                  value={replyData}
                />
              </form>
            )}
          </Modal>
        </>
      )}
    </>
  );
};

export default ResultList;
