import { useState, useEffect } from "react";
import { BACKEND_URL } from "../consts";
import { useNavigate } from "react-router-dom";

const Login = () => {
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
              // Navigate to the dashboard after a timeout

              console.log(user);
              setTimeout(() => {
                navigator("/dashboard", {
                  state: { data },
                });
              }, 2000);
            } else {
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
  }, [navigator, user]);

  return <div>{showMetaMaskPrompt && alert("MetaMask is not installed.")}</div>;
};

export default Login;
