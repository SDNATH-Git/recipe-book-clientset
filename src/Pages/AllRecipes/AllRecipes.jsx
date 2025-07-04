import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [cuisineTypes, setCuisineTypes] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState('All');

  useEffect(() => {
    fetch('https://recipe-book-server-blond.vercel.app/add-recipes')
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
        setFilteredRecipes(data);

        // Extract unique cuisine types
        const uniqueCuisines = ['All', ...new Set(data.map(recipe => recipe.cuisineType))];
        setCuisineTypes(uniqueCuisines);
      })
      .catch(err => console.error('Failed to fetch recipes:', err));
  }, []);

  const handleCuisineChange = (event) => {
    const selected = event.target.value;
    setSelectedCuisine(selected);

    if (selected === 'All') {
      setFilteredRecipes(recipes);
    } else {
      setFilteredRecipes(recipes.filter(recipe => recipe.cuisineType === selected));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-300 py-12 px-4 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
          All Recipes 🍽️
        </h2>

        {/* Filter Dropdown */}
        <div className="mb-12 text-center">
          <label className="text-lg font-semibold text-green-600 mr-2">Filter by Cuisine:</label>
          <select
            value={selectedCuisine}
            onChange={handleCuisineChange}
            className="bg-white border border-green-600 text-green-400 px-4 py-2 rounded-lg focus:outline-none"
          >
            {cuisineTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {filteredRecipes.length === 0 ? (
          <div className="text-center text-orange-300 text-lg">No recipes found 😔</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe._id}
                className="bg-gray-900 border border-orange-500 rounded-2xl shadow-lg p-6 flex flex-col justify-between"
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="h-40 w-full object-cover rounded-xl mb-4"
                />
                <div>
                  <h3 className="text-xl font-bold text-orange-400 mb-2">{recipe.title}</h3>
                  <p className="text-sm text-orange-300 mb-1">
                    Cuisine: <span className="text-white">{recipe.cuisineType}</span>
                  </p>
                  <p className="text-sm text-orange-300 mb-1">
                    Prep Time: <span className="text-white">{recipe.preparationTime} min</span>
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {recipe.categories?.map((cat, index) => (
                      <span
                        key={index}
                        className="text-xs bg-orange-700/30 border border-orange-500 px-2 py-1 rounded-full text-orange-200"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/recipes-details/${recipe._id}`}
                  className="mt-5 inline-block text-center bg-gradient-to-r from-orange-600 to-orange-500 text-white py-2 px-4 rounded-lg hover:opacity-90 transition duration-300 font-semibold"
                >
                  See Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRecipes;
