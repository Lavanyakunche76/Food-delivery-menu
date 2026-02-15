import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const url = "https://food-backend-u0r6.onrender.com"

  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  /* ================= FOOD LIST ================= */
  const fetchFoodList = async () => {
    try {
      const res = await axios.get(`${url}/api/food/list`);
      if (res.data.success) {
        setFoodList(res.data.data);
      }
    } catch (error) {
      console.error("Fetch food list error:", error);
    }
  };

  /* ================= LOAD CART ================= */
  const loadCartData = async (authToken) => {
    if (!authToken) return;

    try {
      const res = await axios.post(
        `${url}/api/cart/get`,
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );

      if (res.data.success) {
        setCartItems(res.data.cartData || {});
      }
    } catch (error) {
      console.error("Load cart error:", error);
    }
  };

  /* ================= ADD TO CART (GUEST + USER) ================= */
  const addToCart = async (itemId) => {
    // ✅ Always update UI
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    // ✅ Sync only if logged in
    if (!token) return;

    try {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Add to cart sync failed:", error);
    }
  };

  /* ================= REMOVE FROM CART ================= */
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });

    if (!token) return;

    try {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Remove from cart sync failed:", error);
    }
  };

  /* ================= TOTAL ================= */
  const getTotalCartAmount = () => {
    let total = 0;

    for (const id in cartItems) {
      const item = food_list.find((f) => f._id === id);
      if (item) {
        total += item.price * cartItems[id];
      }
    }

    return total;
  };

  /* ================= INITIAL LOAD ================= */
  useEffect(() => {
    fetchFoodList();

    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      loadCartData(storedToken);
    }
  }, []);

  /* ================= CONTEXT VALUE ================= */
  const contextValue = {
    url,
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
