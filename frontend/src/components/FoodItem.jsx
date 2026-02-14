import React, { useContext } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { StoreContext } from "../context/StoreContext";
import { Plus, Minus, ShoppingCart } from "lucide-react";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <div className="group relative bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[2rem] overflow-hidden transition-all duration-500 hover:bg-white/[0.07] hover:border-white/20 hover:-translate-y-2 shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={url + "/images/" + image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Cart Controls Over Image */}
        <div className="absolute bottom-4 right-4">
          {!cartItems[id] ? (
            <div
              onClick={() => addToCart(id)}
              className="p-3 bg-white text-black rounded-full cursor-pointer shadow-2xl hover:bg-orange-500 hover:text-white transition-all transform active:scale-90"
            >
              <Plus size={20} />
            </div>
          ) : (
            <div className="flex items-center gap-3 bg-slate-900/90 backdrop-blur-md border border-white/20 px-3 py-2 rounded-full shadow-2xl">
              <Minus
                size={18}
                className="text-red-500 cursor-pointer hover:scale-120 transition-transform"
                onClick={() => removeFromCart(id)}
              />
              <p className="text-white font-bold min-w-[20px] text-center">
                {cartItems[id]}
              </p>
              <Plus
                size={18}
                className="text-green-500 cursor-pointer hover:scale-120 transition-transform"
                onClick={() => addToCart(id)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <p className="text-xl font-bold text-white tracking-tight">{name}</p>
          <img src={assets.rating_starts} alt="rating" className="h-4" />
        </div>
        <p className="text-slate-400 text-sm line-clamp-2 font-light leading-relaxed mb-4">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-black text-orange-500">${price}</p>
          <ShoppingCart
            size={18}
            className="text-white/20 group-hover:text-orange-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
