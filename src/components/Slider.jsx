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

      {/* Horizontal scroll slider */}
      <div
        className="
          flex 
          overflow-x-auto 
          gap-4 
          no-scrollbar 
          w-full 
          pb-2
        "
        style={{ WebkitOverflowScrolling: "touch" }} // iPhone scroll fix
      >
        {(loading ? Array(4).fill({}) : categories).map((cat, index) => (
          <div
            key={cat._id || index}
            className="
              bg-white 
              rounded-xl 
              shadow 
              cursor-pointer 
              min-w-[150px] 
              transition-all 
              duration-200 
              hover:shadow-xl 
              active:scale-95
            "
            onClick={() =>
              cat.name && navigate(`/category/${encodeURIComponent(cat.name)}`)
            }
          >
            {/* IMAGE CONTAINER — FIXED HEIGHT FOR iPHONE */}
            <div className="w-full h-40 rounded-t-xl overflow-hidden">
              <img
                src={cat.image || "/placeholder.jpg"}
                alt={cat.name || "Category"}
                className="w-full h-full object-cover"
                onError={(e) => (e.target.src = "/placeholder.jpg")}
              />
            </div>

            {/* TEXT */}
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
