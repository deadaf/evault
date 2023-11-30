/* eslint-disable react/prop-types */
import { useState } from "react";
import CasesTable from "../components/CasesTable";
import CreateCaseBtn from "../components/createCaseBtn";

const Dashboard = ({ user }) => {
  return (
    <div className="container mx-auto mt-8">
      <h2 className="mb-4 text-2xl font-bold text-white">
        Welcome, {user.name}!
      </h2>
      <CreateCaseBtn
        walletAddress={user.walletAddress}
        userType={user.userType}
      />

      <CasesTable user={user} />
    </div>
  );
};

export default Dashboard;
