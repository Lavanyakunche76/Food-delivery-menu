import React from "react";

const Header = () => {
  return (
    <div className="relative h-[60vh] md:h-[75vh] w-full rounded-[2rem] overflow-hidden my-8 mx-auto max-w-7xl bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent flex flex-col items-start justify-center px-8 md:px-20 animate-fade-in">
        <h2 className="text-4xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          Order your <br />
          <span className="text-orange-500 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
            favourite food
          </span>{" "}
          here
        </h2>
        <p className="text-slate-300 mt-6 max-w-xl text-sm md:text-lg leading-relaxed font-light">
          Choose from a diverse menu featuring a delectable array of dishes
          crafted with the finest ingredients and culinary expertise. Elevate
          your dining experience today.
        </p>
        <button className="mt-10 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-500 shadow-[0_10px_30px_rgba(255,255,255,0.1)] active:scale-95">
          View Menu
        </button>
      </div>

      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#030712] to-transparent"></div>
    </div>
  );
};

export default Header;
