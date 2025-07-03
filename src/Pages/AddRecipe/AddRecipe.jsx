import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

const AddRecipe = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    image: "",
    title: "",
    ingredients: "",
    instructions: "",
    cuisineType: "Italian",
    preparationTime: "",
    categories: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      let updatedCategories = [...formData.categories];
      if (checked) {
        updatedCategories.push(value);
      } else {
        updatedCategories = updatedCategories.filter((cat) => cat !== value);
      }
      setFormData({ ...formData, categories: updatedCategories });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const recipeData = {
      ...formData,
      ingredients: formData.ingredients
        ? formData.ingredients.split(",").map((i) => i.trim())
        : [],
      email: user?.email || "anonymous@example.com",
      userName: user?.displayName || "anonymous",
      likeCount: 0,
    };

    fetch("http://localhost:3000/add-recipes", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(recipeData),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Recipe added successfully! 🚀");
        setFormData({
          image: "",
          title: "",
          ingredients: "",
          instructions: "",
          cuisineType: "Italian",
          preparationTime: "",
          categories: [],
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Failed to add recipe! ❌");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-12 px-4 text-white">
      <div className="max-w-3xl mx-auto bg-gray-950/70 backdrop-blur-md rounded-3xl shadow-2xl p-10 border border-orange-700">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-orange-400 hover:text-orange-200 transition mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
          Add a New Recipe 🍴
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { label: "Image URL", name: "image" },
            { label: "Recipe Title", name: "title" },
            {
              label: "Ingredients (comma separated)",
              name: "ingredients",
              textarea: true,
            },
            { label: "Instructions", name: "instructions", textarea: true },
            {
              label: "Preparation Time (minutes)",
              name: "preparationTime",
              type: "number",
            },
          ].map(({ label, name, textarea, type }) => (
            <div key={name} className="relative">
              {textarea ? (
                <textarea
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  rows={3}
                  className="peer w-full bg-gray-900 border border-orange-700 text-white px-4 pt-6 pb-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-transparent"
                  placeholder={label}
                />
              ) : (
                <input
                  type={type || "text"}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="peer w-full bg-gray-900 border border-orange-700 text-white px-4 pt-6 pb-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-transparent"
                  placeholder={label}
                />
              )}
              <label className="absolute left-4 top-2 text-sm text-orange-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base transition-all">
                {label}
              </label>
            </div>
          ))}

          {/* Cuisine Type */}
          <div>
            <label className="block mb-2 text-orange-300 font-semibold">
              Cuisine Type
            </label>
            <select
              name="cuisineType"
              value={formData.cuisineType}
              onChange={handleChange}
              className="w-full bg-gray-900 border border-orange-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="Italian">Italian</option>
              <option value="Mexican">Mexican</option>
              <option value="Indian">Indian</option>
              <option value="Chinese">Chinese</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Categories */}
          <div>
            <label className="block mb-2 text-orange-300 font-semibold">
              Categories
            </label>
            <div className="flex flex-wrap gap-4">
              {["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan"].map(
                (cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-2 text-orange-100"
                  >
                    <input
                      type="checkbox"
                      name="categories"
                      value={cat}
                      onChange={handleChange}
                      checked={formData.categories.includes(cat)}
                      className="accent-orange-500"
                    />
                    {cat}
                  </label>
                )
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-6 rounded-lg bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold text-lg hover:opacity-90 transition duration-300 shadow-md btn"
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
