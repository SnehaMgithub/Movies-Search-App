import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { moviesContext } from "../Pages/MoviesContext";

const Navbar = () => {
  const [val, setValue] = useState("");
  const { setMovies } = useContext(moviesContext);
  const navigate = useNavigate();

  const handleMovies = async () => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=9293d755&s=movie&type=movie`
      );
      // Ensure that you set the data properly if the API returns a list
      if (res.data.Response === "True" && res.data.Search) {
        setMovies(res.data.Search); // Store the array of movies
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSeries = async () => {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=9293d755&s=series&type=series`
      );
      // Ensure that you set the data properly if the API returns a list
      if (res.data.Response === "True" && res.data.Search) {
        setMovies(res.data.Search); // Store the array of series
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=9293d755&s=${val}`
      );
      if (res.data.Response === "True" && res.data.Search) {
        setMovies(res.data.Search);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
 
   const handleChange=(e)=>{
    const value = e.target.value;
    if (value === 'option1') {
      handleMovies();
    } else if (value === 'option2') {
      handleSeries();
    }
   }

  useEffect(() => {
    setMovies([]);
  }, []);

  return (
    <div className="container mx-auto flex justify-between items-center">
      <div>
        <img
          className="w-40 h-32"
          src="data:image/jpeg;base64,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"
          alt="logo"
        />
      </div>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            onChange={(e) => setValue(e.target.value)}
            className="block w-96 p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Your Movie..."
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      <div className="mr-36 hover:text-blue-300 font-serif">
        <Link to="/favorite">Favorites</Link>
      </div>
   <div className="relative inline-block w-64">
  <label htmlFor="options" className="block text-sm font-medium text-gray-700 mb-1">Pick a type of movie:</label>
  <select id="options" name="options"
        className="block w-full pl-3 pr-10 py-2 font-serif text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        onChange={handleChange}
        defaultValue="" >
    <option value="option1" >Movies</option>
    <option value="option2">Series</option>
  </select>
</div>
    </div>
  );
};

export default Navbar;
