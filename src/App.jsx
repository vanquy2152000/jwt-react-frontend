import Header from "./components/Navigation/Header";
import AppRoutes from "./Routes/AppRoutes";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import { useContext } from 'react';
import { UserContext } from "./context/UserContext";
import { Rings } from 'react-loader-spinner'

const App = () => {
  const { user } = useContext(UserContext);

  console.log("user : ", user)

  return (
    <>
      {
        user && user.isLoading
          ?
          <div className="loading-container">
            <Rings
              height="100"
              width="100"
              color="#4fa94d"
              radius="10"
              visible={true}
              ariaLabel="rings-loading"
            />
            <div>Loading.....</div>
          </div>
          :
          <div className="app-container">
            <Header />
            <AppRoutes />
          </div>
      }
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
