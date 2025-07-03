import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Layouts/HomLayout/HomeLayout";
import Home from "../Pages/Home/Home";
import AllRecipes from "../Pages/AllRecipes/AllRecipes";
import AddRecipe from "../Pages/AddRecipe/AddRecipe";
import MyRecipes from "../Pages/MyRecipes/MyRecipes";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ForgetPassword from "../Pages/ForgetPassword/ForgetPassword";
import PrivateRoute from "../Provider/PrivateRoute";
import RecipesDetails from "../Pages/RecipesDetails/RecipesDetails";
import Error from "../Components/Error/Error";
import About from "../Components/About/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path : "/about-us",
        element : <About/>
      },
      {
        path: "/all-recipes",
        element: <AllRecipes />,
      },
      {
        path: "/recipes-details/:id",
        element: (
          <PrivateRoute>
            <RecipesDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-recipes",
        element: (
          <PrivateRoute>
            <AddRecipe />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-recipes",
        element: (
          <PrivateRoute>
            <MyRecipes />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/forgetPassword",
        element: <ForgetPassword />,
      },
    ],
  },
]);

export default router;
