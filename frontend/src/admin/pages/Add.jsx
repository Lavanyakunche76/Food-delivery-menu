import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { StoreContext } from "../../context/StoreContext";
import { assets } from "../assets/assets";

const Add = ({ url = "http://localhost:4000" }) => {
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      toast.error("Admin login required");
      navigate("/admin/login");
    }
  }, []);

  /* ================= INPUT HANDLER ================= */
  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  /* ================= SUBMIT ================= */
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);
      formData.append("image", image);

      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(null);
      } else {
        toast.error(response.data.message);
      }
    } catch {
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="p-6 text-white max-w-3xl">
      <h2 className="text-2xl font-bold mb-6">Add New Food</h2>

      <form
        onSubmit={onSubmitHandler}
        className="space-y-6
          bg-white/10 backdrop-blur-xl
          p-6 rounded-2xl
          border border-white/20
          shadow-xl"
      >
        {/* IMAGE UPLOAD */}
        <div>
          <p className="mb-2 font-medium">Product Image</p>
          <label
            htmlFor="image"
            className="block w-48 h-48 rounded-xl
              border-2 border-dashed border-white/30
              cursor-pointer overflow-hidden
              hover:border-blue-500 transition"
          >
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload"
              className="w-full h-full object-cover"
            />
          </label>
          <input
            type="file"
            id="image"
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* NAME */}
        <div>
          <p className="mb-1">Product Name</p>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            placeholder="Enter product name"
            required
            className="w-full px-4 py-2 rounded-lg
              bg-black/40 border border-white/20
              text-white outline-none
              focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <p className="mb-1">Product Description</p>
          <textarea
            rows="4"
            name="description"
            value={data.description}
            onChange={onChangeHandler}
            placeholder="Enter description"
            required
            className="w-full px-4 py-2 rounded-lg
              bg-black/40 border border-white/20
              text-white outline-none
              focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* CATEGORY + PRICE */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="mb-1">Category</p>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
              className="w-full px-4 py-2 rounded-lg
                bg-black/40 border border-white/20
                text-white outline-none"
            >
              <option>Salad</option>
              <option>Rolls</option>
              <option>Deserts</option>
              <option>Sandwich</option>
              <option>Cake</option>
              <option>Pure Veg</option>
              <option>Pasta</option>
              <option>Noodles</option>
            </select>
          </div>

          <div>
            <p className="mb-1">Price</p>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={onChangeHandler}
              placeholder="$20"
              required
              className="w-full px-4 py-2 rounded-lg
                bg-black/40 border border-white/20
                text-white outline-none"
            />
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold
            bg-gradient-to-r from-blue-500 to-purple-500
            hover:from-blue-600 hover:to-purple-600
            shadow-lg hover:shadow-blue-500/50
            transition"
        >
          Add Food
        </button>
      </form>
    </div>
  );
};

export default Add;
