import { Link } from "react-router-dom";

const GoHome = () => {
  return (
    <div className="fixed left-0 top-0 m-4 ml-10 mt-10">
      <Link to="/">
        <button className="rounded-md bg-blue-500 p-4 text-white hover:bg-blue-700 focus:border-blue-300 focus:outline-none focus:ring">
          ⏎ Return To Home
        </button>
      </Link>
    </div>
  );
};

export default GoHome;
