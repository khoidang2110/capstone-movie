import Header from "components/Header/Header";
import React from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";

const PurchaseTemplate = () => {
  return (
    <Layout className="min-h-screen">
      <Header />

      <Layout.Content className="bg-slate-800 mt-16 min-h-full">
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default PurchaseTemplate;
