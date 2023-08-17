import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("https://myseries.onrender.com/api/auth/logout");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shadow-md w-full fixed">
      <div className="md:flex items-center justify-between text-slate-300 bg-indigo-800 py-4 md:px-10 px-7">
        <div className="font-bold text-2xl flex items-center">
          <h1>My Series</h1>
          <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <FaBars name={open ? "close" : "menu"}></FaBars>
        </div>
        </div>
      
        <ul
          className={`md:flex md:items-center md:pb-0 pb-8 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in bg-indigo-800 ${
            open ? "" : "top-[-490px]"
          }`}
        >
          <li className="md:ml-8 text-xl md:my-0 my-2">
            <Link
              to="/"
              className="hover:text-gray-400 duration-500"
            >
              Home
            </Link>
          </li>
          <li className="md:ml-8 text-xl md:my-0 my-7">
            <Link
              to="/search"
              className="hover:text-gray-400 duration-500"
            >
              Add Serie
            </Link>
          </li>
          <li className="md:ml-8 text-xl md:my-0 my-7">
            <Link
              to="/edit-profile"
              className="hover:text-gray-400 duration-500"
            >
              Edit Profile
            </Link>
          </li>
          <button
            onClick={handleLogout}
            className=" bg-red-700 text-white py-2 px-4 rounded md:ml-8 hover:bg-red-400 
    duration-500"
          >
            LOGOUT
          </button>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
