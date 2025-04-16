import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import AuthProvider from "./Context/authContext";
import DashBoard from "./DashBoard";
import Privacy from "./PrivateContent";
import Choose from "./Choose";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/choose" element={<Choose />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route
              path="/dashboard"
              element={
                <Privacy>
                  <DashBoard />
                </Privacy>
              }
            ></Route>
            <Route></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
