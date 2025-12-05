import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_API } from "../config";

export const Navbar = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showBox, setShowBox] = useState(false);

  // Fetch suggestions
  const fetchSuggestions = async (text) => {
    try {
      if (!text.trim()) {
        setSuggestions([]);
        return;
      }

      const res = await axios.get(
        `${BASE_API}/api/search-suggestions?q=${text}`
      );
      setSuggestions(res.data);
    } catch (err) {
      console.log("Suggestion error", err);
    }
  };

  // When user types
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length > 0) {
      setShowBox(true);
      fetchSuggestions(value);
    } else {
      setShowBox(false);
      setSuggestions([]);
    }
  };

  // When user presses Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?q=${query}`);
      setShowBox(false);
      setSuggestions([]);
    }
  };

  // Click on a suggestion
  const handleSuggestionClick = (value) => {
    setQuery(value);
    navigate(`/search?q=${value}`);
    setShowBox(false);
    setSuggestions([]);
  };

  // Prevent closing dropdown when clicking inside
  const blockClose = (e) => e.stopPropagation();

  // Close dropdown on outside click
  useEffect(() => {
    const close = () => setShowBox(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <div
      className="
        flex items-center justify-between 
        p-3 bg-white shadow 
        sticky top-0 z-20 
      "
    >
      {/* LOGO */}
      <div
        className="text-xl font-bold text-pink-600 cursor-pointer select-none"
        onClick={() => navigate("/")}
      >
        Sweet Bites
      </div>

      {/* SEARCH BAR */}
      <div className="relative w-40 sm:w-52 md:w-60" onClick={blockClose}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          placeholder="Search cakes..."
          className="
            border rounded-full px-4 py-1 
            w-full text-sm 
            outline-none 
            focus:ring-2 focus:ring-pink-300
          "
        />

        {/* DROPDOWN */}
        {showBox && suggestions.length > 0 && (
          <div
            className="
              absolute top-10 left-0 w-full 
              bg-white shadow-xl rounded-xl 
              max-h-60 overflow-y-auto 
              p-2 z-30
            "
            onClick={blockClose}
            style={{
              WebkitOverflowScrolling: "touch", // iPhone smooth scroll
              scrollbarWidth: "none", // Firefox hide scrollbar
            }}
          >
            {suggestions.map((item, index) => (
              <p
                key={index}
                onClick={() => handleSuggestionClick(item)}
                className="
                  p-2 rounded-lg 
                  hover:bg-pink-100 
                  cursor-pointer 
                  text-sm 
                  active:bg-pink-200
                "
              >
                {item}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* ICONS */}
      <div className="flex gap-3 text-xl">
        <span>❤️</span>
        <span>☰</span>
      </div>
    </div>
  );
};

export default Navbar;
