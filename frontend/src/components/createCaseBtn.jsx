/* eslint-disable react/prop-types */
import { useState } from "react";
import { BACKEND_URL } from "../consts";

const CaseForm = ({ walletAddress, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    caseType: "",
    status: "",
    ownerAddress: "",
    judgeAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add lawyerAddress to formData
    const dataToSend = {
      ...formData,
      lawyerAddress: walletAddress,
    };

    dataToSend.caseType = parseInt(dataToSend.caseType, 10);
    dataToSend.status = parseInt(dataToSend.status, 10);

    // Make the PUT request
    try {
      const res = await fetch(`${BACKEND_URL}/cases`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          walletAddress: walletAddress,
        },
        body: JSON.stringify(dataToSend),
      });

      if (res.ok) {
        alert("Case created successfully!");
        onClose(); // Close the form after successful submission
      } else {
        alert("Error creating the case.");
      }
    } catch (error) {
      console.error("Error creating the case:", error);
    }
  };

  return (
    <div
      className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-white p-8 shadow-md"
      style={{ zIndex: 2 }}
    >
      <form onSubmit={handleSubmit}>
        <label className="mb-2 block">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          maxLength={255}
          required
          className="mb-4 w-full rounded border p-2"
        />

        <label className="mb-2 block">Description:</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          maxLength={255}
          required
          className="mb-4 w-full rounded border p-2"
        />

        <label className="mb-2 block">Case Type:</label>
        <select
          name="caseType"
          value={formData.caseType}
          onChange={handleChange}
          required
          className="mb-4 w-full rounded border p-2"
        >
          <option value="" disabled>
            Select Case Type
          </option>
          <option className="mb-4 w-full rounded border p-2" value="1">
            Civil
          </option>
          <option className="mb-4 w-full rounded border p-2" value="2">
            Criminal
          </option>
          <option className="mb-4 w-full rounded border p-2" value="3">
            Family
          </option>
          <option className="mb-4 w-full rounded border p-2" value="4">
            Labour
          </option>
          <option className="mb-4 w-full rounded border p-2" value="5">
            Consumer
          </option>
          <option className="mb-4 w-full rounded border p-2" value="6">
            Others
          </option>
        </select>

        <label className="mb-2 block">Status:</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="mb-4 w-full rounded border p-2"
        >
          <option className="mb-4 w-full rounded border p-2" value="" disabled>
            Select Status
          </option>
          <option className="mb-4 w-full rounded border p-2" value="1">
            Pending
          </option>
          <option className="mb-4 w-full rounded border p-2" value="2">
            Ongoing
          </option>
          <option className="mb-4 w-full rounded border p-2" value="3">
            Closed
          </option>
        </select>

        <label className="mb-2 block">Owner Address:</label>
        <input
          type="text"
          name="ownerAddress"
          value={formData.ownerAddress}
          onChange={handleChange}
          maxLength={255}
          required
          className="mb-4 w-full rounded border p-2"
        />

        <label className="mb-2 block">Judge Address:</label>
        <input
          type="text"
          name="judgeAddress"
          value={formData.judgeAddress}
          onChange={handleChange}
          maxLength={255}
          required
          className="mb-4 w-full rounded border p-2"
        />
        <button
          className="mr-2 rounded bg-green-500 p-2 text-white hover:bg-green-700"
          type="submit"
        >
          Submit
        </button>
        <button
          className="rounded bg-gray-500 p-2 text-white hover:bg-gray-700"
          type="button"
          onClick={onClose}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

const CreateCaseBtn = ({ walletAddress, userType }) => {
  console.log(userType);
  const [showForm, setShowForm] = useState(false);
  const handleClick = () => {
    if (userType !== 1) {
      alert("Only a Lawyer can create a case.");
      return;
    }
    setShowForm(true);
  };

  return (
    <div style={{ zIndex: 1 }}>
      <button
        onClick={handleClick}
        className="mb-4 rounded bg-purple-500 px-4 py-2 font-bold text-white hover:bg-purple-700"
      >
        Create Case
      </button>
      {showForm && (
        <CaseForm
          walletAddress={walletAddress}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default CreateCaseBtn;
