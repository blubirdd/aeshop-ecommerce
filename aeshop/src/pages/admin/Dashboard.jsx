import React, { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dashboard() {

  const notify = () => toast("Wow so easy!");

  return (
    <>
      <h1>Admin Dashboard</h1>
      <h2>hi ho</h2>
      <button onClick={notify}>Click me</button>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
        transition:Bounce
        />
    </>
  );
}

export default Dashboard;
