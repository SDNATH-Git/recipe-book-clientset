import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';

const TopRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://recipe-book-server-blond.vercel.app/top-recipes')
      .then(res => res.json())
      .then(data => setRecipes(data));
  }, []);

  return (
    <div className="py-10 px-4 container mx-auto">
      <h2 className="text-4xl font-bold text-red-600  my-4 text-center">
        Explore Our{' '}
        <span className="text-green-600">
          <Typewriter
            words={['Top Recipes', 'Most Loved Dishes', 'Tastiest Picks']}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </span>
      </h2>
      <p className="text-black  mb-12 max-w-2xl mx-auto text-center">
        These are our most loved recipes, selected based on user favorites. Dive in and explore the rich flavors and creativity behind every dish.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map(recipe => (
          <div key={recipe._id} className="border-2 border-orange-500 rounded-2xl shadow-lg overflow-hidden bg-gray-800">
            <img
              src={recipe.image || "https://via.placeholder.com/300"}
              alt={recipe.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-2xl font-semibold text-orange-500 mb-2">{recipe.title}</h3>
              <p className="text-gray-300"><strong className="text-orange-500">Cuisine:</strong> {recipe.cuisineType}</p>
              <p className="text-gray-300"><strong className="text-orange-500">Likes:</strong> {recipe.likeCount}</p>
              <button
                className="mt-4 px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition btn"
                onClick={() => navigate(`/recipes-details/${recipe._id}`)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/all-recipes">
          <button className="px-6 py-6 bg-orange-500 text-white text-lg font-medium rounded-lg hover:bg-orange-600 transition btn ">
            See All Recipes
          </button>
        </Link>
      </div>
    </div>
  );
};

export default TopRecipes;
