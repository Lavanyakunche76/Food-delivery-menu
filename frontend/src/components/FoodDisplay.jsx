import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "./FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const [searchText, setSearchText] = useState("");

  return (
    <div className="py-12" id="food-display">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h2 className="text-3xl font-bold text-white border-l-4 border-orange-500 pl-4 uppercase tracking-wider">
          Top dishes near you
        </h2>

        {/* SEARCH BAR */}
        <input
          type="text"
          placeholder="Search food..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full md:w-64 px-4 py-2 rounded-xl
            bg-white/5 border border-white/10
            text-white placeholder:text-slate-400
            focus:outline-none focus:ring-2 focus:ring-orange-500/50"
        />
      </div>

      {/* FOOD GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {food_list
          .filter((item) => {
            const matchesCategory =
              category === "All" || category === item.category;

            const matchesSearch = item.name
              .toLowerCase()
              .includes(searchText.toLowerCase());

            return matchesCategory && matchesSearch;
          })
          .map((item, index) => (
            <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))}
      </div>

      {/* EMPTY STATE */}
      {food_list.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      ).length === 0 && (
        <p className="text-center text-slate-400 mt-12">
          No food items found 🍽️
        </p>
      )}
    </div>
  );
};

export default FoodDisplay;
