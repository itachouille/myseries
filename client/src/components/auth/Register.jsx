import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();


  const register = async (e) => {
    e.preventDefault();
    const user = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      await axios.post("https://myseries.onrender.com/api/auth/register", user);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen bg-indigo-800 text-slate-300">
    <div className=" max-w-xs m-auto">
    <h1 className="text-center font-bold text-2xl ">
       My Series
    </h1>
      <form className="mt-4" onSubmit={register}>
        <label
          className="block text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
          <input
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            type="text"
            name="name"
            placeholder="Full name"
            required
          />
        </label>
        <label
          className="block text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
          <input
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            type="email"
            name="email"
            placeholder="Email"
            required
          />
        </label>
        <label
          className="blocktext-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
          <input
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </label>
        <br />
        <button
          className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
          type="submit"
        >
          Register
        </button>
      </form>
      <div className="mt-4 flex items-center justify-between">
        <span className="border-b w-1/5 lg:w-1/4"></span>
        <a href="/" className="text-xs text-center uppercase">
          Return to Login
        </a>
        <span className="border-b w-1/5 lg:w-1/4"></span>
      </div>
    </div>
  </div>
  );
}
export default Register;
