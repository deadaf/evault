import { useState } from "react";

const Home = () => {
  const [isMetaMaskConnected, setMetaMaskConnected] = useState(false);

  return (
    <>
      {isMetaMaskConnected ? (
        <div>Connected hai Bro</div>
      ) : (
        <div className="flex flex-col gap-3">
          <button className="p-4">Login using MetaMask</button>
          <button
            onClick={() => {
              setMetaMaskConnected(true);
            }}
            className="p-4"
          >
            Sign Up, If you are New!
          </button>
        </div>
      )}
    </>
  );
};

export default Home;
