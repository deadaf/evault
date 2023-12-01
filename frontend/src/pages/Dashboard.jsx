/* eslint-disable react/prop-types */
import CasesTable from "../components/CasesTable";
import CreateCaseBtn from "../components/createCaseBtn";
import GoHome from "../components/goHome";

const Dashboard = ({ user }) => {
  return (
    <div>
      <GoHome />
      <div className="container mx-auto mt-[250px] flex flex-col items-center justify-center">
        <h2 className="mb-4 text-center text-2xl font-bold text-white md:text-left">
          Welcome, {user.name} ({user.userType})!
        </h2>
        <CreateCaseBtn
          walletAddress={user.walletAddress}
          userType={user.userType}
        />
        <CasesTable user={user} />
      </div>
    </div>
  );
};

export default Dashboard;
