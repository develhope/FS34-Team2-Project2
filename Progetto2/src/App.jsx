import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
