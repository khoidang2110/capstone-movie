import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import { Layout } from "antd";

import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";

import PageLoading from "components/Loading/PageLoading";

const HomeTemplate = () => {
  return (
    <Layout className="min-h-screen">
      <Header></Header>

      <Layout.Content className=" bg-slate-300 mt-16 min-h-full">
        <Outlet />
      </Layout.Content>

      <Footer></Footer>
    </Layout>
  );
};

export default HomeTemplate;
