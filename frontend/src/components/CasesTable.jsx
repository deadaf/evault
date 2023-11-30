/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../consts";


const CasesTable = ({ user }) => {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    const fetchCases = async () => {
      const res = await fetch(`${BACKEND_URL}/cases`, {
        headers: {
          walletAddress: user.walletAddress,
        },
      });
      const data = await res.json();
      setCases(data);
    };
    fetchCases();
  }, [user.walletAddress]);

  return (
    <>
      <div>{cases.length}</div>
    </>
  );
};

export default CasesTable;
