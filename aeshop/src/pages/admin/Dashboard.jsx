import React, { useContext } from 'react';
import { toast } from 'react-toastify';
function Dashboard() {

  const handleClick = () => {
    toast.success("Test")
  };

  return (
    <>
      <h1>Admin Dashboard</h1>
      <button onClick={handleClick}>Click me</button>
    </>
  );
}

export default Dashboard;
