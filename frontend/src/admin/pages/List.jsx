import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const List = ({ url = "http://localhost:4000" }) => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  /* ================= FETCH FOOD LIST ================= */
  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to load food list");
      }
    } catch {
      toast.error("Server error");
    }
  };

  /* ================= REMOVE FOOD ================= */
  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(
        `${url}/api/food/remove`,
        { id: foodId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchList(); // refresh after delete
      } else {
        toast.error("Failed to delete food");
      }
    } catch {
      toast.error("Delete request failed");
    }
  };

  /* ================= AUTH CHECK + INITIAL FETCH ================= */
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");

    if (!adminToken) {
      toast.error("Admin login required");
      navigate("/admin/login");
      return;
    }

    fetchList();
  }, []);

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">Food List</h2>

      <div className="overflow-x-auto rounded-xl border border-white/20">
        <table className="w-full border-collapse">
          <thead className="bg-white/10 backdrop-blur">
            <tr className="text-left text-sm uppercase text-slate-300">
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {list.map((item) => (
              <tr
                key={item._id}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                <td className="p-3">
                  <img
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-lg"
                  />
                </td>

                <td className="p-3 font-medium">{item.name}</td>
                <td className="p-3 text-slate-300">{item.category}</td>
                <td className="p-3 font-semibold">${item.price}</td>

                <td className="p-3 text-center">
                  <button
                    onClick={() => removeFood(item._id)}
                    className="px-3 py-1 rounded-lg
                      bg-red-500/20 text-red-400
                      hover:bg-red-500 hover:text-white
                      transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {list.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-slate-400">
                  No food items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
