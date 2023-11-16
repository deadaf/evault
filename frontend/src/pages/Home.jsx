import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="flex flex-col gap-3">
        <Link to="/login">
          <button className="rounded-md bg-blue-500 p-4 text-white hover:bg-blue-700 focus:border-blue-300 focus:outline-none focus:ring">
            Login using MetaMask
          </button>
        </Link>

        <Link to="/signup">
          <button className="rounded-md bg-green-500 p-4 text-white hover:bg-green-700 focus:border-green-300 focus:outline-none focus:ring">
            Sign Up, If you are New!
          </button>
        </Link>
      </div>
    </>
  );
};

export default Home;
