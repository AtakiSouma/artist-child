import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, Modal, Spin, notification } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiJWT from "../../utils/apiJwt";
import { useAuth } from "../../hooks/useAuth";
import { Header } from "antd/es/layout/layout";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state } = useAuth();
  const logOut = async () => {
    setLoading(true);
    try {
      const response = await apiJWT.post(`/api/v1/auth/logout`);
      if (response) {
        localStorage.clear();
        setLoading(false);
        navigate("/login");
      }
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Có lỗi xảy ra",
        placement: "bottomLeft",
      });
    }
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      icon: <UserOutlined></UserOutlined>,
      label: <Link to={`/account`}>User Profile</Link>,
    },
    {
      key: "2",
      icon: <LogoutOutlined></LogoutOutlined>,
      label: <div onClick={logOut}>Logout</div>,
    },
  ];
  return (
    <>
      <Header className="fixed z-50 flex flex-row justify-between w-full px-5 bg-[#ffffff] border-b border-gray-200">
        <Dropdown
          menu={{ items }}
          placement="bottomRight"
          trigger={["click"]}
          arrow
        >
          <Avatar
            className="fixed cursor-pointer right-3 top-2"
            size={40}
            icon={<UserOutlined />}
            src={
              // state.googleUser.data.user.photoUrl ||
              "https://upload-os-bbs.hoyolab.com/upload/2024/02/12/349567740/abbb8591430236b218af498cb4bdcef7_5647250500608824280.jpg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_80"
            }
          />
        </Dropdown>
        <Modal footer={null} closable={false} open={loading}>
          <div className="flex flex-col items-center justify-center">
            <Spin size="large"></Spin>
            <span>Logout...</span>
          </div>
        </Modal>
      </Header>
    </>
  );
};

export default Navbar;
