import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes/route";
import {App, ConfigProvider } from "antd";

export default function AppWrapper() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#135D66",
          },
        }}
      >
        <App>
        <RouterProvider router={router} />
        </App>
      </ConfigProvider>
    </>
  );
}
