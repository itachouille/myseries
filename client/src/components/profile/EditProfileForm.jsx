import { useEffect, useState } from "react";
import axios from "axios";

function EditProfileForm() {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/api/users/me");
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const updateUserInfo = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/api/users/me", user);
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-20 max-w-xs m-auto">
      <div>
        <form className="" onSubmit={updateProfile}>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Full Name :
            <input
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              name="name"
              type="text"
              placeholder="Full Name"
              required
              value={user.name}
              onChange={updateUserInfo}
            />
          </label>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email :
            <input
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
              name="email"
              type="email"
              placeholder="email"
              required
              value={user.email}
              onChange={updateUserInfo}
            />
          </label>
          <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600" type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileForm;
