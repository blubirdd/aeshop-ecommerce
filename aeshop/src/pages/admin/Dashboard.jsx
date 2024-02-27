import React, { useContext } from 'react';
import { toast } from 'react-toastify';
function Dashboard() {

  const handleClick = () => {
    toast.success("TEst")
  };

  return (
    <>
      <h1>Admin Dashboard</h1>
      <h2>hi ho</h2>
      <button onClick={handleClick}>Click me</button>
    </>
  );
}

export default Dashboard;
