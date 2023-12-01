import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../consts";
import GoHome from "../components/goHome";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const walletAddress = accounts[0];

      await fetch(BACKEND_URL + "/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          userType: role,
          walletAddress,
        }),
      });

      navigate("/login");
    } else {
      alert("Please install MetaMask extension in your browser.");
    }
  };

  return (
    <div>
      <GoHome />
      <div className="flex h-screen flex-col items-center justify-center gap-4">
        <p className="font-bold text-white">Fill the form, to SignUp!</p>
        <form
          onSubmit={handleSubmit}
          className="mb-4  rounded bg-white px-8 pb-8 pt-6 shadow-md"
        >
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="username"
            >
              Name:
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="username"
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-2 block text-sm font-bold text-gray-700"
              htmlFor="role"
            >
              Role:
            </label>
            <select
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              id="role"
              value={role}
              onChange={handleRoleChange}
            >
              <option value="">Select a role</option>
              <option value="1">Lawyer</option>
              <option value="2">Judge</option>
              <option value="3">Client</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
