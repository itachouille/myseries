import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./components/PrivateRoutes";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Search from "./pages/Search.jsx";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}> 
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
