import "./App.css";
import { Routes, Route } from "react-router-dom";
import Connect from "./Connect";

function App() {
  return (
    <>
      <Routes>
        <Route path="/connect" element={<Connect />} />
      </Routes>
    </>
  );
}

export default App;
