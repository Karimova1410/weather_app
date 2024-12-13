import { useState, useEffect } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  const addToFavorites = city => {
    if (city && !favorites.includes(city)) {
      setFavorites(prevFavorites => [...prevFavorites, city]);
    }
  };
  const removeFromFavorites = city => {
    setFavorites(prevFavorites => prevFavorites.filter(fav => fav !== city));
  };

  const loadFavorite = (cityName, fetchWeather) => {
    fetchWeather(cityName);
  };

  return { favorites, addToFavorites, loadFavorite, removeFromFavorites };
};

export default useFavorites;
