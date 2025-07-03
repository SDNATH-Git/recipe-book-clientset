import React from "react";
import AdvancedSwiper from "../../Components/AdvancedSwiper/AdvancedSwiper";
import FeaturedChefs from "../../Components/FeaturedChefs/FeaturedChefs";
import CookingTips from "../../Components/CookingTips/CookingTips";
import Feq from "../../Components/Feq/Feq";
import TopRecipes from "../../Components/TopRecipes/TopRecipes";

const Home = () => {
  return (
    <div className="bg-gray-300 text-black">
      <AdvancedSwiper></AdvancedSwiper>
      <TopRecipes></TopRecipes>
      <FeaturedChefs></FeaturedChefs>
      {/* <CookingTips></CookingTips> */}
      <Feq></Feq>
    </div>
  );
};

export default Home;
