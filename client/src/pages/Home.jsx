import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/navbar/Navbar.jsx";
import Card from "../components/card/Card.jsx";
import { FaTrashAlt, FaChevronCircleDown, FaCheck, FaTimes } from "react-icons/fa";

function Home() {
  const [tvShowSaved, setTvShowSaved] = useState([]);
  const [modifiedCards, setModifiedCards] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [idDeleted, setIdDeleted] = useState(null);

  const openDeleteModal = (id) => {
    setDeleteModal(!deleteModal);
    setIdDeleted(id);
  };

  const closeDeleteModal = () => {
    setDeleteModal(!deleteModal);
    setIdDeleted(null);
  };

  const deleteTvShow = async () => {
    const id = idDeleted;
    try {
      await axios.delete(`https://myseries.onrender.com/api/items/${id}`);
      getTvShowSaved();
      closeDeleteModal();
    } catch (error) {
      console.log(error);
    }
  };

  const getTvShowSaved = async () => {
    try {
      const { data } = (await axios.get("https://myseries.onrender.com/api/items/myItems")).data;
      setTvShowSaved(
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleSeasonChange = (index, newSeason) => {
    const updatedTvShowSaved = [...tvShowSaved];
    updatedTvShowSaved[index].season = newSeason;
    setTvShowSaved(updatedTvShowSaved);
    markCardAsModified(index);
  };

  const handleEpisodeChange = (index, newEpisode) => {
    const updatedTvShowSaved = [...tvShowSaved];
    updatedTvShowSaved[index].episode = newEpisode;
    setTvShowSaved(updatedTvShowSaved);
    markCardAsModified(index);
  };

  const markCardAsModified = (index) => {
    if (!modifiedCards.includes(index)) {
      setModifiedCards([...modifiedCards, index]);
    }
  };

  const updateTvShow = async (itemId, newSeason, newEpisode) => {
    try {
      await axios.put(`https://myseries.onrender.com/api/items/${itemId}`, {
        season: newSeason,
        episode: newEpisode,
      });
      unmarkCardAsModified(
        tvShowSaved.findIndex((item) => item._id === itemId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const unmarkCardAsModified = (index) => {
    if (modifiedCards.includes(index)) {
      const updatedModifiedCards = modifiedCards.filter((i) => i !== index);
      setModifiedCards(updatedModifiedCards);
    }
  };

  useEffect(() => {
    getTvShowSaved();
  }, []);

  return (
    <>
      <Navbar />
      {deleteModal ? (
        <div className="flex flex-col justify-center items-center font-bold h-screen bg-slate-100">
          <div className="bg-slate-900 p-12 ">
            <div>
              <p className="text-slate-200">Are you sure ?</p>
            </div>
          <div className="flex justify-around pt-6">
            <button
              className="rounded-2xl p-2 bg-slate-100 hover:bg-lime-600 "
              onClick={() => deleteTvShow()}
            >
             <FaCheck />
            </button>
            <button
              className="rounded-2xl p-2 bg-slate-100 hover:bg-red-500 "
              onClick={() => closeDeleteModal()}
            >
              <FaTimes/>
            </button>
          </div>
        </div>
        </div>
        
      ) : (
        <div className=" pt-28 max-w-2xl mx-auto px-4 py-8 lg:max-w-7xl grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tvShowSaved.length > 0
            ? tvShowSaved.map((item, index) => (
                <div key={item._id}>
                  <Card info={item} />
                  <div className="font-bold py-2 rounded overflow-hidden shadow-xl">
                    <form
                      className="flex items-center justify-around"
                      onSubmit={(e) => e.preventDefault()}
                    >
                      <label htmlFor={`season-${index}`}>
                        Season
                        <input
                          className=" pl-2 w-12"
                          type="number"
                          min="0"
                          value={item.season}
                          required
                          onChange={(e) =>
                            handleSeasonChange(index, e.target.value)
                          }
                        />
                      </label>
                      <label htmlFor={`episode-${index}`}>
                        Episode
                        <input
                          className="pl-2 w-12"
                          type="number"
                          min="0"
                          value={item.episode}
                          required
                          onChange={(e) =>
                            handleEpisodeChange(index, e.target.value)
                          }
                        />
                      </label>
                      {modifiedCards.includes(index) ? (
                        <button
                          type="submit"
                          onClick={() =>
                            updateTvShow(item._id, item.season, item.episode)
                          }
                          className=" bg-lime-800 text-white py-2 px-2 rounded hover:bg-lime-600 
                        duration-500"
                        >
                          <FaChevronCircleDown />
                        </button>
                      ) : (
                        <button
                          onClick={() => openDeleteModal(item._id)}
                          className=" bg-red-800 text-white p-2 rounded hover:bg-red-400 
                        duration-500"
                        >
                          <FaTrashAlt />
                        </button>
                      )}
                    </form>
                  </div>
                </div>
              ))
            : "No Series Found.  Please add one"}
        </div>
      )}
    </>
  );
}

export default Home;
