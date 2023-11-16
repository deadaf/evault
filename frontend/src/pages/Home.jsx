import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <Link to="/login">
          <button className="p-4">Login using MetaMask</button>
        </Link>

        <Link to="/signup">
          <button className="p-4">Sign Up, If you are New!</button>
        </Link>
      </div>
    </>
  );
};

export default Home;
