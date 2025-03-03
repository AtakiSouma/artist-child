import { Content } from "antd/es/layout/layout";
import React from "react";

export default function MyContent({ children }: { children: React.ReactNode }) {
  return (
    <Content className="px-3 py-5">
      <main className="mt-14">
        {children}
      </main>
    </Content>
  );
}
