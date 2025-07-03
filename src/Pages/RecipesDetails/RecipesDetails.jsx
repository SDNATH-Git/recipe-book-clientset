import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";
import { AuthContext } from "../../Provider/AuthProvider";

const RecipesDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [likeCount, setLikeCount] = useState(0); // ✅ likeCount separate state
  const [errorMessage, setErrorMessage] = useState("");

  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  // Fetch recipe details on mount
  useEffect(() => {
    fetch(`http://localhost:3000/recipes-details/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data);
        setLikeCount(data.likeCount || 0); // ✅ Set likeCount
      })
      .catch((err) => {
        console.error("Error loading recipe:", err);
        navigate("/error");
      });
  }, [id, navigate]);

  // Handle Like button
  const handleLike = async () => {
    if (!recipe) return;

    if (recipe.email === userEmail) {
      setErrorMessage("You cannot like your own recipe.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3000/recipes-details/${id}/like`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });

      if (res.ok) {
        const data = await res.json();
        setLikeCount(data.likeCount);
        setErrorMessage("");
      } else {
        const error = await res.json();
        setErrorMessage(error.message || "Failed to like recipe.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Error sending like request.");
    }
  };

  if (!recipe) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-orange-300 text-xl font-medium">
        🍲 Loading your recipe...
      </div>
    );
  }

  // Convert instructions string to array
  const instructionsArray =
    typeof recipe.instructions === "string"
      ? recipe.instructions
        .split(".")
        .map((step) => step.trim())
        .filter((step) => step.length > 0)
      : Array.isArray(recipe.instructions)
        ? recipe.instructions
        : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white px-4 py-10 font-sans">
      <div className="max-w-5xl mx-auto bg-gray-900/80 border border-gray-700 rounded-3xl shadow-2xl overflow-hidden">
        <img src={recipe.image} alt={recipe.title} className="w-full h-96 object-cover" />

        <div className="p-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/all-recipes")}
            className="flex items-center text-orange-400 hover:text-orange-200 transition mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to All recipes
          </button>

          {/* Like Info */}
          <p className="text-orange-300 text-sm mb-2">
            {likeCount} people interested in this recipe
          </p>

          {/* Title & Like Button */}
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-orange-400">{recipe.title}</h1>
            <button
              onClick={handleLike}
              className="flex items-center gap-2 text-red-500 hover:text-red-400 transition"
            >
              <Heart className="w-5 h-5 fill-red-400" />
              <span className="text-lg">{likeCount}</span>
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && <p className="text-sm text-red-400 mb-2">{errorMessage}</p>}

          <p className="text-sm text-gray-400 mb-4">
            By <span className="text-orange-300 font-medium">{recipe.userName}</span> · {recipe.email}
          </p>

          {/* Recipe Info */}
          <div className="flex flex-wrap gap-3 text-sm mb-6">
            <span className="bg-gray-800 border border-gray-600 px-3 py-1 rounded-full">
              🍽 Cuisine: <span className="text-orange-300">{recipe.cuisineType}</span>
            </span>
            <span className="bg-gray-800 border border-gray-600 px-3 py-1 rounded-full">
              ⏱ Prep Time: <span className="text-orange-300">{recipe.preparationTime} min</span>
            </span>
            {recipe.categories?.map((cat, idx) => (
              <span
                key={idx}
                className="bg-gray-800 border border-gray-600 px-3 py-1 rounded-full"
              >
                📌 {cat}
              </span>
            ))}
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-orange-400 mb-2">Ingredients</h2>
            <ul className="list-disc list-inside text-gray-300">
              {recipe.ingredients?.map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div>
            <h2 className="text-xl font-bold text-orange-400 mb-2">Instructions</h2>
            <ol className="list-decimal list-inside text-gray-300 space-y-1">
              {instructionsArray.length > 0 ? (
                instructionsArray.map((step, idx) => <li key={idx}>{step}</li>)
              ) : (
                <li>No instructions available</li>
              )}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipesDetails;
