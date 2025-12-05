import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API } from "../config";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_API}/api/categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Categories error:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full mt-3">
      <div
        className="
          flex gap-4 
          overflow-x-auto 
          scrollbar-hide 
          pb-3
          scroll-smooth
          snap-x snap-mandatory
          flex-nowrap
        "
        style={{
          WebkitOverflowScrolling: "touch", // iPhone smooth scroll
          msOverflowStyle: "none",         // IE/Edge
          scrollbarWidth: "none",          // Firefox
          touchAction: "pan-x",            // universal mobile scroll
        }}
      >
        {(loading ? Array(4).fill({}) : categories).map((cat, index) => (
          <div
            key={cat._id || index}
            className="
              min-w-[140px] sm:min-w-[150px] 
              bg-white rounded-lg flex-shrink-0 
              shadow cursor-pointer
              snap-start
              transition-all duration-200
              hover:shadow-xl active:scale-95
            "
            onClick={() =>
              cat.name && navigate(`/category/${encodeURIComponent(cat.name)}`)
            }
          >
            {/* IMAGE */}
            <div className="w-full h-36 sm:h-40 overflow-hidden rounded-t-xl">
              <img
                src={cat.image || "/placeholder.jpg"}
                alt={cat.name || "Category"}
                className="w-full h-full object-cover"
                onError={(e) => (e.target.src = "/placeholder.jpg")}
              />
            </div>

            {/* NAME */}
            {cat.name && (
              <p className="text-center py-2 text-sm font-semibold whitespace-nowrap">
                {cat.name}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
