/* eslint-disable react/prop-types */

import { useState } from "react";
import { BACKEND_URL } from "../consts";

const BrowseFilesBtn = ({ walletAddress, caseId }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [files, setFiles] = useState([]);

  const onClick = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/cases/${caseId}/files`, {
        headers: {
          walletAddress: walletAddress,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setFiles(data);
        setShowPopup(true);
      } else {
        console.error("Error fetching files:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const addNewFile = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const res = await fetch(`${BACKEND_URL}/cases/${caseId}/files`, {
          method: "PUT",
          headers: {
            walletAddress: walletAddress,
          },
          body: formData,
        });

        if (res.ok) {
          // Fetch files again to get the updated list
          const updatedFilesRes = await fetch(
            `${BACKEND_URL}/cases/${caseId}/files`,
            {
              headers: {
                walletAddress: walletAddress,
              },
            },
          );

          if (updatedFilesRes.ok) {
            const updatedFilesData = await updatedFilesRes.json();
            setFiles(updatedFilesData);
          }
        } else {
          console.error("Error adding new file:", res.statusText);
        }
      } catch (error) {
        console.error("Error adding new file:", error);
      }
    }
  };

  const downloadFile = async (fileId) => {
    console.log(fileId);
    try {
      const fileToDownload = files.find((file) => file.fileId === fileId);

      if (fileToDownload) {
        const res = await fetch(
          `${BACKEND_URL}/cases/${caseId}/files/${fileId}`,
          {
            headers: {
              walletAddress: walletAddress,
            },
          },
        );
        const data = await res.blob();

        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileToDownload.name);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } else {
        console.error("File not found in the list");
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  return (
    <div className="relative inline-block">
      <button
        onClick={onClick}
        className="rounded bg-green-500 p-2 text-white hover:bg-green-700"
        style={{ zIndex: 1 }}
      >
        Browse Files
      </button>

      {showPopup && (
        <div
          className="fixed left-1/2 top-1/2 w-96 -translate-x-1/2 -translate-y-1/2 transform bg-white p-10 shadow-md"
          style={{ zIndex: 2 }}
        >
          <h2 className="mb-4 text-lg font-semibold">
            Files for Case ID: {caseId}
          </h2>
          <ul className="max-h-60 overflow-y-auto">
            {files.map((file, index) => (
              <li key={index} className="mb-2 flex items-center">
                <span className="mr-2">{index + 1}.</span>
                <span className="truncate" style={{ direction: "rtl" }}>
                  {file.name}
                </span>
                <button
                  onClick={() => downloadFile(file.fileId)}
                  className="ml-2 rounded bg-blue-500 p-1 text-xs text-white hover:bg-blue-700 "
                >
                  Download
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between gap-2">
            <label className="cursor-pointer rounded bg-blue-500 p-2 text-white hover:bg-blue-700">
              Add New File
              <input
                type="file"
                accept="*" // accepted file types
                className="hidden"
                onChange={addNewFile}
              />
            </label>
            <button
              onClick={closePopup}
              className="rounded bg-gray-500 p-2 text-white hover:bg-gray-700"
            >
              Close Popup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BrowseFilesBtn;
