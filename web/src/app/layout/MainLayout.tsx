import { Layout, Spin } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Footer, MyContent, Navbar, SideBar } from "../components/index";
import { useAppDispatch } from "../redux/hook";
import { roleCheckSuccess } from "../redux/slice/roleSlice";
import agent from "../utils/agent";
import { LoadingOutlined } from "@ant-design/icons";
import { UserData } from "../models/auth.models";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const userDataObject: UserData = JSON.parse(localStorage.getItem("user")!);

  const initApp = useCallback(async () => {
    try {
      const fetchData = async () => {
        const response = await agent.Role.checkRole(userDataObject.user.id);
        dispatch(roleCheckSuccess(response));
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  if (loading)
    return (
      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
    );
  return (
    <Layout className="min-h-screen">
      <SideBar></SideBar>
      <Layout className=" bg-white">
        <Navbar />
        <MyContent children={children} />
        <Footer />
      </Layout>
    </Layout>
  );
};
export default MainLayout;
