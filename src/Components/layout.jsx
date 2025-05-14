import React from "react";
import { Outlet } from "react-router";
import Header from "../layout/header";

function Layout() {
  return (
    <div>
      <Header />
      <main className="px-6 py-4">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
