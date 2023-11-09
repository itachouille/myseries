import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Card from "./card/Card.jsx";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.post("https://myseries.onrender.com/api/search/search", { query });
      setResults(response.data.results);
      setQuery("");
    } catch (error) {
      console.log(error);
    }
  };

  const addTvShow = async (item) => {
    const newItem = {
      name: item.name, 
      apiID: item.id,
      backdrop_path: item.backdrop_path,
      season: 1,
      episode: 1,
    };
    try {
      await axios.post("https://myseries.onrender.com/api/items", newItem);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, [results]);

  return (
    <div className="pt-20">
      <div className=" max-w-xs m-auto">
      <label
          className=" text-gray-700 text-sm font-bold mb-2 flex"
          htmlFor="search"
        >
      <input
         className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 w-full appearance-none"
        type="text"
        name="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter serie name"
      />
      <button className="bg-gray-700 text-white font-bold ml-1 p-3 rounded hover:bg-gray-600" onClick={handleSearch}>
      <FaSearch/>
      </button>
     </label> 
      </div>
      <div className=" pt-4 max-w-2xl mx-auto px-4 py-8 lg:max-w-7xl grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {results.map((item) => (
          <div className="" key={item.id} >
             <Card info={item} />
          <button  onClick={() => addTvShow(item)}  className="bg-transparent w-full rounded hover:bg-green-500 text-green-700 font-semibold hover:text-white p-2 border border-green-500 hover:border-transparent">ADD</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
