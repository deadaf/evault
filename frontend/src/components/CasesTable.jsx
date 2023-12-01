/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../consts";
import BrowseFilesBtn from "./browseFilesBtn";

const CasesTable = ({ user }) => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchCases = async () => {
      const res = await fetch(`${BACKEND_URL}/cases`, {
        headers: {
          walletAddress: user.walletAddress,
        },
      });
      const data = await res.json();
      setCases(data);
    };
    fetchCases();
  }, [user.walletAddress]);

  const showCaseInfo = (caseInfo) => {
    // Implement logic to show case info popup
    console.log("Show Case Info:", caseInfo);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border p-2 text-white">#</th>
              <th className="border p-2 text-white">Case Title</th>
              <th className="border p-2 text-white">Show Case Info</th>
              <th className="border p-2 text-white">Browse Files</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((caseItem, index) => (
              <tr key={caseItem.caseId}>
                <td className="border p-2 text-white">{index + 1}</td>
                <td className="border p-2 text-white">{caseItem.title}</td>
                <td className="border p-2 text-white">
                  <button
                    onClick={() => showCaseInfo(caseItem)}
                    className="rounded bg-blue-500 p-2 text-white hover:bg-blue-700"
                  >
                    Show Info
                  </button>
                </td>
                <td className="border p-2">
                  <BrowseFilesBtn
                    walletAddress={user.walletAddress}
                    caseId={caseItem.caseId}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CasesTable;
