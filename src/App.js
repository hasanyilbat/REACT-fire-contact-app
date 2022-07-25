import "./App.css";
import Form from "./components/Form";
import Table from "./components/Table";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div
      className="d-flex justify-content-between align-items-center bg-image"
      style={{ height: "100vh" }}
    >
      <Form />
      <Table />
      <ToastContainer />
    </div>
  );
}

export default App;
