import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  // Helper to get headers easily
  const getAuthHeaders = () => {
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const addToCart = async (itemId) => {
    // Local State Update (For immediate UI feedback)
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    // Database Sync (Only if logged in)
    if (token) {
      try {
        await axios.post(url + "/api/cart/add", { itemId }, getAuthHeaders());
      } catch (error) {
        console.error("Sync Error:", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 0) {
        newCart[itemId] -= 1;
        if (newCart[itemId] === 0) delete newCart[itemId];
      }
      return newCart;
    });

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          getAuthHeaders()
        );
      } catch (error) {
        console.error("Sync Error:", error);
      }
    }
  };

  const loadCartData = async (token) => {
    try {
      // NOTE: We pass the token manually here because state might not be set yet during reload
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems(response.data.cartData);
    } catch (error) {
      console.error("Load Cart Error:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      // await fetchFoodList(); // Uncomment when ready
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
