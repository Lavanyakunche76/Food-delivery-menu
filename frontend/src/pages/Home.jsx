import React, { useState } from "react";
import Header from "../components/Header.jsx";
import ExploreMenu from "../components/ExploreMenu.jsx";
import FoodDisplay from "../components/FoodDisplay.jsx";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div className="relative min-h-screen bg-[#030712] overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        <Header />
        <div className="max-w-7xl mx-auto px-4">
          <ExploreMenu category={category} setCategory={setCategory} />
          <FoodDisplay category={category} />
        </div>
      </div>
    </div>
  );
};

export default Home;
