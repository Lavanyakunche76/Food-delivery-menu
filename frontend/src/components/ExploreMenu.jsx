import React from "react";
import { menu_list } from "../assets/frontend_assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="py-12 flex flex-col items-center" id="explore-menu">
      <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
        Explore our menu
      </h1>
      <p className="max-w-3xl text-center text-slate-400 text-sm md:text-base mb-12">
        Choose from a diverse menu featuring a detectable array of dishes. Our
        mission is to satisfy your cravings.
      </p>

      <div className="flex gap-8 overflow-x-auto w-full px-4 scrollbar-hide py-4 justify-start md:justify-center">
        {menu_list.map((item, index) => {
          const isActive = category === item.menu_name;
          return (
            <div
              key={index}
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
              className="flex flex-col items-center flex-shrink-0 cursor-pointer transition-all duration-300"
            >
              <div
                className={`p-1 rounded-full transition-all duration-500 ${
                  isActive
                    ? "bg-gradient-to-tr from-orange-500 to-red-600 p-[3px] shadow-[0_0_20px_rgba(234,88,12,0.6)]"
                    : "bg-transparent"
                }`}
              >
                <img
                  className={`w-20 h-20 md:w-28 md:h-28 rounded-full object-cover border-4 border-[#030712] transition-transform duration-300 ${
                    isActive ? "scale-105" : "hover:scale-105"
                  }`}
                  src={item.menu_image}
                  alt={item.menu_name}
                />
              </div>
              <p
                className={`mt-4 text-sm font-medium transition-colors ${
                  isActive ? "text-orange-500 font-bold" : "text-slate-400"
                }`}
              >
                {item.menu_name}
              </p>
            </div>
          );
        })}
      </div>
      <div className="w-full h-[1px] bg-white/5 mt-12 max-w-6xl"></div>
    </div>
  );
};

export default ExploreMenu;
