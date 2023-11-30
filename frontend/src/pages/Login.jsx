import { useState, useEffect } from "react";
import { BACKEND_URL } from "../consts";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Login = ({ setUserProp }) => {
  const [user, setUser] = useState(null);
  const [showMetaMaskPrompt, setShowMetaMaskPrompt] = useState(false);
  const navigator = useNavigate();

  useEffect(() => {
    const checkMetaMask = async () => {
      if (typeof window.ethereum !== "undefined") {
        if (window.ethereum.isMetaMask) {
          try {
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            const walletAddress = accounts[0];

            const response = await fetch(
              BACKEND_URL + "/users/" + walletAddress,
            );
            if (response.status === 200) {
              const data = await response.json();
              setUser(data);
              setUserProp(data);
              // Navigate to the dashboard after a timeout
              setTimeout(() => {
                navigator("/dashboard");
              }, 2000);
            } else {
              alert(accounts);
              alert("User not found. Please sign up.");
              navigator("/signup");
            }
          } catch (error) {
            console.error("Error checking MetaMask:", error);
          }
        } else {
          setShowMetaMaskPrompt(true);
        }
      } else {
        setShowMetaMaskPrompt(true);
      }
    };

    checkMetaMask();
  }, [navigator, user, setUserProp]);

  return <div>{showMetaMaskPrompt && alert("MetaMask is not installed.")}</div>;
};

export default Login;
