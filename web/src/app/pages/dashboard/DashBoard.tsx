import { Line } from "@ant-design/plots";
import { useAppDispatch } from "../../redux/hook";
import { useDispatch } from "react-redux";
import useDashboard from "../../hooks/useDashboard";
import { useState } from "react";
import { Spin } from "antd";
import Card from "./components/Card";
import useCourse from "../../hooks/useCreate";
import Table, { ColumnType, ColumnsType } from "antd/es/table";
import { CourseData } from "../../models/course.model";

type columnProps = {
  currentPage: number;
  displayData: number;
};

const DashBoard = () => {
  const data = [
    { Month: "10/2023", Orders: 4 },
    { Month: "11/2023", Orders: 5 },
    { Month: "12/2023", Orders: 2 },
    { Month: "1/2024", Orders: 6 },
    { Month: "2/2024", Orders: 7 },
    { Month: "3/2024", Orders: 9 },
    { Month: "4/2024", Orders: 13 },
  ];
  const config = {
    data,
    xField: "Month",
    yField: "Orders",
    point: {
      shapeField: "square",
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };

  const columns = ({
    currentPage,
    displayData,
  }: columnProps): ColumnsType<CourseData> => [
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
      dataIndex: "thumbnail",
      width: "5%",
      render: (thumbnail) => (
        <div className="w-[40px] h-[40px]">
          <img
            src={
              thumbnail.url ||
              "https://cdn.donmai.us/original/1e/f8/1ef80a41ffae75b8f58f75ff8e1981ea.png"
            }
            alt={thumbnail.public_id}
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
      title: "Price",
      dataIndex: "price",
      key: "stt",
      render: (price) => <div className=" text-md">{price}$</div>,
      width: "10%",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "stt",
      render: (level) => <div className=" text-md">{level}</div>,
      width: "10%",
    },
  ];

  // const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { dashboardLoading, countList } = useDashboard();
  const { courseAdaptersByPage, courseLoading, currentPage } = useCourse();
  const tableColumns = columns({ currentPage, displayData: 5 });

  return (
    <>
      {!countList ? (
        <div className="flex items-center flex-col justify-center mt-64">
          <Spin tip="Dashboard is loading..." size="large">
            <div className="content w-[500px]" />
          </Spin>
        </div>
      ) : (
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-5 gap-4">
            {countList.map((count, index) => (
              <div key={index}>
                <Card title={count.title} count={count.count} />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-5 ">
            <div className="border-2 rounded-lg w-full h-full">
              <Line {...config} />
            </div>
            <div>
              {/* <div>Recent Courses</div> */}
              <Table
                columns={tableColumns}
                dataSource={courseAdaptersByPage[currentPage]}
                loading={!courseLoading}
                pagination={false}
                bordered={true}
                rowKey={(record) => record.id}
                className="items-center"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashBoard;
