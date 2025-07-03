import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  // For update modal form data
  const [formData, setFormData] = useState({
    _id: "",
    image: "",
    title: "",
    ingredients: [],
    instructions: "",
    cuisineType: "Italian",
    preparationTime: "",
    categories: [],
    likeCount: 0,
  });

  // Modal visibility state
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userEmail) {
      setLoading(true);
      fetch(
        `http://localhost:3000/add-recipes?email=${userEmail}`
      )
        .then((res) => res.json())
        .then((data) => {
          setRecipes(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to fetch recipes.",
            background: "#1f2937",
            color: "#f97316",
            confirmButtonColor: "#f97316",
          });
        });
    }
  }, [userEmail]);

  const handleDelete = (id) => {
    const swalWithDarkTheme = Swal.mixin({
      customClass: {
        confirmButton:
          "bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded",
        cancelButton:
          "bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded  mr-4",
        popup: "swal2-dark",
      },
      buttonsStyling: false,
      background: "#1f2937",
      color: "#f97316",
    });

    swalWithDarkTheme
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(`http://localhost:3000/add-recipes/${id}`, {
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.deletedCount) {
                setRecipes((prevRecipes) =>
                  prevRecipes.filter((recipe) => recipe._id !== id)
                );

                swalWithDarkTheme.fire({
                  title: "Deleted!",
                  text: "Your recipe has been deleted.",
                  icon: "success",
                });
              }
            })
            .catch(() => {
              swalWithDarkTheme.fire({
                title: "Error",
                text: "Failed to delete recipe.",
                icon: "error",
              });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithDarkTheme.fire({
            title: "Cancelled",
            text: "Your recipe is safe :)",
            icon: "error",
          });
        }
      });
  };

  // Open modal & populate form with selected recipe data
  const openUpdateModal = (recipe) => {
    setFormData({
      _id: recipe._id,
      image: recipe.image,
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      cuisineType: recipe.cuisineType,
      preparationTime: recipe.preparationTime,
      categories: recipe.categories,
      likeCount: recipe.likeCount,
    });
    setModalOpen(true);
  };

  // Handle form inputs changes
  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "categories") {
      if (checked) {
        setFormData((prev) => ({
          ...prev,
          categories: [...prev.categories, value],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          categories: prev.categories.filter((cat) => cat !== value),
        }));
      }
    } else if (name === "ingredients") {
      // Ingredients is an array, handle as comma separated string in input
      const ingArr = value.split(",").map((i) => i.trim()).filter(i => i);
      setFormData((prev) => ({
        ...prev,
        ingredients: ingArr,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle form submission to update recipe
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare updatedData object manually from formData state
    const updatedData = {
      _id: formData._id,
      image: formData.image,
      title: formData.title,
      ingredients: formData.ingredients,
      instructions: formData.instructions,
      cuisineType: formData.cuisineType,
      preparationTime: formData.preparationTime,
      categories: formData.categories,
      likeCount: formData.likeCount,
    };

    fetch(`http://localhost:3000/add-recipes/${formData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result?.modifiedCount) {
          // Update recipes state with new data
          setRecipes((prev) =>
            prev.map((recipe) =>
              recipe._id === formData._id ? { ...recipe, ...updatedData } : recipe
            )
          );

          Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "Your recipe has been updated.",
            background: "#1f2937",
            color: "#f97316",
            confirmButtonColor: "#f97316",
          });

          setModalOpen(false);
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to update recipe.",
          background: "#1f2937",
          color: "#f97316",
          confirmButtonColor: "#f97316",
        });
      });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-300 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-500 mb-8 text-center">My Recipes</h1>

        {recipes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-orange-400">No recipes found. Add some recipes to see them here!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div
                key={recipe._id}
                className="border-2 border-orange-600 rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] bg-gray-800 flex flex-col"
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
                  }}
                />
                <div className="p-4 space-y-2 text-orange-500 flex-grow">
                  <h2 className="text-xl font-bold truncate">{recipe.title}</h2>
                  <p className="line-clamp-2">
                    <span className="font-semibold">Ingredients:</span>{" "}
                    {recipe.ingredients.join(", ")}
                  </p>
                  <p className="line-clamp-3">
                    <span className="font-semibold">Instructions:</span>{" "}
                    {recipe.instructions}
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <p>
                      <span className="font-semibold">Cuisine:</span>{" "}
                      {recipe.cuisineType}
                    </p>
                    <p>
                      <span className="font-semibold">Prep Time:</span>{" "}
                      {recipe.preparationTime} mins
                    </p>
                    <p>
                      <span className="font-semibold">Category:</span>{" "}
                      {recipe.categories.join(", ")}
                    </p>
                    <p>
                      <span className="font-semibold">Likes:</span> {recipe.likeCount}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end gap-3 flex-wrap">
                    <button
                      onClick={() => openUpdateModal(recipe)}
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(recipe._id)}
                      className="px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 border border-orange-400 rounded-lg font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="bg-gray-900 p-6 rounded-lg w-full max-w-3xl relative text-orange-400 max-h-[90vh] overflow-y-auto">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-orange-400 hover:text-orange-600 transition-colors"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold mb-4">Update Recipe</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image URL */}
              <div>
                <label className="block mb-2 font-semibold">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-orange-600 rounded px-3 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  required
                />
              </div>

              {/* Title */}
              <div>
                <label className="block mb-2 font-semibold">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-orange-600 rounded px-3 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  required
                  maxLength={100}
                />
              </div>

              {/* Ingredients (comma separated) */}
              <div>
                <label className="block mb-2 font-semibold">
                  Ingredients (comma separated)
                </label>
                <input
                  type="text"
                  name="ingredients"
                  value={formData.ingredients.join(", ")}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-orange-600 rounded px-3 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  required
                />
                <p className="text-sm text-gray-400 mt-1">Separate ingredients with commas</p>
              </div>

              {/* Instructions */}
              <div>
                <label className="block mb-2 font-semibold">Instructions</label>
                <textarea
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-orange-600 rounded px-3 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  required
                  rows={4}
                  maxLength={1000}
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Cuisine Type */}
                <div>
                  <label className="block mb-2 font-semibold">Cuisine Type</label>
                  <select
                    name="cuisineType"
                    value={formData.cuisineType}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-orange-600 rounded px-3 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                  >
                    <option value="Italian">Italian</option>
                    <option value="French">French</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Indian">Indian</option>
                    <option value="Mexican">Mexican</option>
                    <option value="American">American</option>
                    <option value="Thai">Thai</option>
                    <option value="Mediterranean">Mediterranean</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Preparation Time */}
                <div>
                  <label className="block mb-2 font-semibold">
                    Preparation Time (mins)
                  </label>
                  <input
                    type="number"
                    name="preparationTime"
                    value={formData.preparationTime}
                    onChange={handleChange}
                    className="w-full bg-gray-800 border border-orange-600 rounded px-3 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                    required
                    min={1}
                    max={1000}
                  />
                </div>
              </div>

              {/* Categories (checkboxes) */}
              <div>
                <label className="block mb-2 font-semibold">Categories</label>
                <div className="flex flex-wrap gap-4">
                  {["Breakfast", "Lunch", "Dinner", "Dessert", "Vegan", "Vegetarian", "Gluten-Free", "Keto"].map(
                    (cat) => (
                      <label
                        key={cat}
                        className="inline-flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          name="categories"
                          value={cat}
                          checked={formData.categories.includes(cat)}
                          onChange={handleChange}
                          className="rounded text-orange-500 focus:ring-orange-600 border-gray-600"
                        />
                        <span>{cat}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded text-white font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-600 hover:bg-orange-700 rounded text-white font-medium transition-colors"
                >
                  Update Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRecipes;