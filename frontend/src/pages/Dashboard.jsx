/* eslint-disable react/prop-types */
import CasesTable from "../components/CasesTable";
import CreateCaseBtn from "../components/createCaseBtn";
import GoHome from "../components/goHome";

const Dashboard = ({ user }) => {
  return (
    <div className="container mx-auto mt-8">
      <GoHome />
      <h2 className="mb-4 text-2xl font-bold text-white">
        Welcome, {user.name} ({user.userType})!
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
