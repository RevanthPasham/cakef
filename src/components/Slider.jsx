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
          flex gap-4 pb-3
          overflow-x-auto
          scrollbar-hide
          scroll-smooth
          snap-x snap-mandatory
          touch-pan-x
        "
        style={{ WebkitOverflowScrolling: "touch" }} // iPhone smooth scroll
      >
        {(loading ? Array(4).fill({}) : categories).map((cat, i) => (
          <div
            key={cat._id || i}
            className="
              min-w-[150px]
              bg-white
              rounded-lg
              flex-shrink-0
              snap-start
              shadow 
              cursor-pointer
              transition-all duration-200 
              hover:shadow-xl active:scale-95
            "
            onClick={() =>
              cat.name && navigate(`/category/${encodeURIComponent(cat.name)}`)
            }
          >
            {/* Image */}
            <div className="w-full h-40 overflow-hidden rounded-t-xl">
              <img
                src={cat.image || "/placeholder.jpg"}
                alt={cat.name || "Category"}
                className="w-full h-full object-cover"
                onError={(e) => (e.target.src = "/placeholder.jpg")}
              />
            </div>

            {/* Name */}
            {cat.name && (
              <p className="text-center mt-1 mb-2 text-sm font-semibold px-2">
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
