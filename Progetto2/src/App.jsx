import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import AuthProvider from "./Context/authContext";
import DashBoard from "./DashBoard";
import Privacy from "./PrivateContent";
import Choose from "./Choose";
import Carrello from "./Carrello";
import Privacy2 from "./PrivateContent2";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import Orders from "./Orders";
import Profilo from "./Profilo";
function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/choose" element={<Choose />}></Route>
            <Route
              path="/login"
              element={
                <Privacy2>
                  <Login />
                </Privacy2>
              }
            ></Route>
            <Route
              path="/register"
              element={
                <Privacy2>
                  <Register />
                </Privacy2>
              }
            ></Route>
            <Route path="/carrello" element={<Carrello />}></Route>
            <Route
              path="/dashboard"
              element={
                <Privacy>
                  <DashBoard />
                </Privacy>
              }
            ></Route>
            <Route path="/dashBoard/ordini" element={<Orders />}></Route>
            <Route path="/dashBoard/profilo" element={<Profilo />}></Route>
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
