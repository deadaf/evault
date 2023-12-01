/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../consts";
import BrowseFilesBtn from "./browseFilesBtn";

const CasesTable = ({ user }) => {
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);

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
    setSelectedCase(caseInfo);
  };

  const closeCaseInfoPopup = () => {
    setSelectedCase(null);
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

      {/* Popup for Case Info */}
      {selectedCase && (
        <div
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-white p-10 shadow-md"
          style={{ zIndex: 2 }}
        >
          <h2 className="mb-4 text-lg font-semibold">
            Details for Case ID: {selectedCase.caseId}
          </h2>
          <p>
            <b>Title:</b> {selectedCase.title}{" "}
          </p>
          <p>
            <b>Description:</b> {selectedCase.description}
          </p>
          <p>
            <b>Status:</b> {selectedCase.status}
          </p>
          <p>
            <b>Case Type:</b> {selectedCase.caseType}
          </p>
          <p>
            <b>Owner Address:</b> {selectedCase.ownerAddress}
          </p>
          <p>
            <b>Judge Address:</b> {selectedCase.judgeAddress}
          </p>
          <p>
            <b>Lawyer Address:</b> {selectedCase.lawyerAddress}
          </p>
          <p>
            <b>Created At:</b> {selectedCase.createdAt}
          </p>

          <button
            onClick={closeCaseInfoPopup}
            className="rounded bg-gray-500 p-2 text-white hover:bg-gray-700"
          >
            Close Popup
          </button>
        </div>
      )}
    </>
  );
};

export default CasesTable;
