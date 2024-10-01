import React from "react";
import Navbar from "./Navbar";

const RootLayout = ({ children }) => {
  return (
    <div className="layout min-w-full h-fit">
      <Navbar />
      <main className="content h-fit">{children}</main>
    </div>
  );
};

export default  RootLayout;
