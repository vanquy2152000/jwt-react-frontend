import Header from "./components/Navigation/Header";
import AppRoutes from "./Routes/AppRoutes";
import "./App.scss";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <div className="app-header">
        <Header />
      </div>
      <div className="app-container">
        <AppRoutes />
      </div>
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
