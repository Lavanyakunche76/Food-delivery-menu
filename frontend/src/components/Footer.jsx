import React from "react";
import { assets } from "../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div
      className="bg-[#030712] border-t border-white/10 text-slate-300 pt-20 pb-10"
      id="footer"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2 space-y-8">
          <img src={assets.logo} alt="Logo" className="w-40" />
          <p className="max-w-md text-slate-400 font-light leading-loose">
            Join the food revolution. We deliver the best flavours right to your
            doorstep, crafted with passion and culinary precision.
          </p>
          <div className="flex gap-4">
            {[
              assets.facebook_icon,
              assets.twitter_icon,
              assets.linkedin_icon,
            ].map((icon, idx) => (
              <img
                key={idx}
                src={icon}
                alt="social"
                className="w-10 h-10 cursor-pointer p-2 bg-white/5 rounded-full border border-white/10 hover:border-orange-500 hover:shadow-[0_0_10px_rgba(234,88,12,0.4)] transition-all"
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-white text-xl font-bold mb-8 relative before:absolute before:-bottom-2 before:left-0 before:h-1 before:w-10 before:bg-orange-500">
            Company
          </h2>
          <ul className="space-y-4 text-slate-400">
            <li className="hover:text-orange-500 cursor-pointer transition-colors">
              Home
            </li>
            <li className="hover:text-orange-500 cursor-pointer transition-colors">
              About us
            </li>
            <li className="hover:text-orange-500 cursor-pointer transition-colors">
              Delivery
            </li>
            <li className="hover:text-orange-500 cursor-pointer transition-colors">
              Privacy Policy
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-white text-xl font-bold mb-8 relative before:absolute before:-bottom-2 before:left-0 before:h-1 before:w-10 before:bg-orange-500">
            Get in touch
          </h2>
          <ul className="space-y-4 text-slate-400">
            <li className="hover:text-orange-500 transition-colors">
              +92-308-4900522
            </li>
            <li className="hover:text-orange-500 transition-colors">
              contact@byteflow.com
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 text-center text-slate-500 text-sm">
        <p>Copyright 2024 @ Byteflow.com - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
