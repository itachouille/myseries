import "dotenv/config";
import fetch from "node-fetch";
import successResponse from '../utils/successResponse.js';

export const search = async (req, res) => {
  try {
    const { query } = req.body;

    if (typeof query !== 'string') {
      return res.status(400).json({ error: "'search' must be a string" });
    }

    const apiKey = process.env.TMDB_API_KEY;

    const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}`;
    const response = await fetch(url);
    const data = await response.json();
    return successResponse(res, 'Searching success', data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error during search" });
  }
};
