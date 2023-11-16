import { useState } from "react";

const Dashboard = () => {
  const user = {
    walletAddress: "0x7b8b828c32a5b314998eeb839a647e8d469d0206",
    name: "rohitgahlyan",
    email: "gahlyanrohit18@gmail.com",
    userType: 1,
  };

  const cases = [
    {
      caseId: 1,
      title: "Sample Case 4",
      description: "This is a sample case 4 description.",
      caseType: 1,
      status: 1,
      ownerAddress: "0x7b8b828c32a5b314998eeb839a647e8d469d0206",
      judgeAddress: "789 Oak St, Countryside",
      lawyerAddress: "0x7B8B828C32a5b314998EeB839A647e8D469D0206",
      createdAt: "2023-11-16 14:14:51.219114",
    },
    {
      caseId: 2,
      title: "Sample Case 5",
      description: "This is a sample case 4 description.",
      caseType: 1,
      status: 1,
      ownerAddress: "0x7b8b828c32a5b314998eeb839a647e8d469d0206",
      judgeAddress: "789 Oak St, Countryside",
      lawyerAddress: "0x7B8B828C32a5b314998EeB839A647e8D469D0206",
      createdAt: "2023-11-16 14:14:56.375063",
    },
  ];

  const [selectedCase, setSelectedCase] = useState(null);
  const [editedCase, setEditedCase] = useState(null);

  const handleShowMore = (caseId) => {
    const selected = cases.find((c) => c.caseId === caseId);
    setSelectedCase(selected);
  };

  const handleEdit = (caseId) => {
    const selected = cases.find((c) => c.caseId === caseId);
    setEditedCase({ ...selected });
  };

  const handleEditSubmit = () => {
    // Replace this with your logic to submit the edited case data to /users
    console.log("Submitting edited case:", editedCase);
    // Close the popup
    setEditedCase(null);
  };

  const handleClosePopup = () => {
    setSelectedCase(null);
    setEditedCase(null);
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="mb-4 text-2xl font-bold">Welcome, {user.name}!</h2>
      <table className="min-w-full border border-gray-300 bg-white">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">Case ID</th>
            <th className="border-b px-4 py-2">Case Title</th>
            <th className="border-b px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c) => (
            <tr key={c.caseId}>
              <td className="border-b px-4 py-2">{c.caseId}</td>
              <td className="border-b px-4 py-2">{c.title}</td>
              <td className="border-b px-4 py-2">
                <button
                  className="mr-2 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                  onClick={() => handleShowMore(c.caseId)}
                >
                  Show More Data
                </button>
                <button
                  className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                  onClick={() => handleEdit(c.caseId)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedCase && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-md rounded-md bg-white p-8">
            <h3 className="mb-4 text-xl font-bold">Case Details</h3>
            <p>ID: {selectedCase.caseId}</p>
            <p>Title: {selectedCase.title}</p>
            <p>Description: {selectedCase.description}</p>
            <p>Status: {selectedCase.status}</p>
            <button
              className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              onClick={handleClosePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {editedCase && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-md rounded-md bg-white p-8">
            <h3 className="mb-4 text-xl font-bold">Edit Case</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <label className="mb-2 block" htmlFor="editCaseType">
                Case Type:
                <input
                  className="w-full border border-gray-300 p-2"
                  type="text"
                  id="editCaseType"
                  value={editedCase.caseType}
                  onChange={(e) =>
                    setEditedCase({ ...editedCase, caseType: e.target.value })
                  }
                />
              </label>

              <label className="mb-2 block" htmlFor="editTitle">
                Title:
                <input
                  className="w-full border border-gray-300 p-2"
                  type="text"
                  id="editTitle"
                  value={editedCase.title}
                  onChange={(e) =>
                    setEditedCase({ ...editedCase, title: e.target.value })
                  }
                />
              </label>

              <label className="mb-2 block" htmlFor="editDescription">
                Description:
                <input
                  className="w-full border border-gray-300 p-2"
                  type="text"
                  id="editDescription"
                  value={editedCase.description}
                  onChange={(e) =>
                    setEditedCase({
                      ...editedCase,
                      description: e.target.value,
                    })
                  }
                />
              </label>

              <label className="mb-2 block" htmlFor="editStatus">
                Status:
                <input
                  className="w-full border border-gray-300 p-2"
                  type="text"
                  id="editStatus"
                  value={editedCase.status}
                  onChange={(e) =>
                    setEditedCase({ ...editedCase, status: e.target.value })
                  }
                />
              </label>

              <label className="mb-2 block" htmlFor="editOwnerAddress">
                Owner Address:
                <input
                  className="w-full border border-gray-300 p-2"
                  type="text"
                  id="editOwnerAddress"
                  value={editedCase.ownerAddress}
                  readOnly
                />
              </label>

              <label className="mb-2 block" htmlFor="editJudgeAddress">
                Judge Address:
                <input
                  className="w-full border border-gray-300 p-2"
                  type="text"
                  id="editJudgeAddress"
                  value={editedCase.judgeAddress}
                  readOnly
                />
              </label>

              <label className="mb-2 block" htmlFor="editLawyerAddress">
                Lawyer Address:
                <input
                  className="w-full border border-gray-300 p-2"
                  type="text"
                  id="editLawyerAddress"
                  value={editedCase.lawyerAddress}
                  readOnly
                />
              </label>

              <label className="mb-2 block" htmlFor="editCreatedAt">
                Created At:
                <input
                  className="w-full border border-gray-300 p-2"
                  type="text"
                  id="editCreatedAt"
                  value={editedCase.createdAt}
                  readOnly
                />
              </label>

              <br />

              <button
                className="mt-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                onClick={handleEditSubmit}
              >
                Submit
              </button>
              <button
                className="ml-2 mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                onClick={handleClosePopup}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
