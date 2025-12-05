import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_API } from "../config";
import { useNavigate } from "react-router-dom";

const CakeCard = ({ category }) => {
  const [cakes, setCakes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const url = category
      ? `${BASE_API}/cakes/${encodeURIComponent(category)}`
      : `${BASE_API}/cakes`;

    axios
      .get(url)
      .then((res) => setCakes(res.data.slice(0, 16)))
      .catch((err) => console.error("Error loading cakes:", err));
  }, [category]);

  return (
    <div
      className="
        grid 
        grid-cols-2 
        sm:grid-cols-2 
        md:grid-cols-3 
        gap-4 mt-4
      "
    >
      {cakes.map((cake) => {
        const originalPrice = cake.cutPrices?.[0] ?? null;
        const newPrice = cake.prices?.[0] ?? null;

        let discount = null;
        if (originalPrice && newPrice) {
          discount = Math.round(
            ((originalPrice - newPrice) / originalPrice) * 100
          );
        }

        return (
          <div
            key={cake._id}
            onClick={() => navigate(`/cake/${cake._id}`)}
            className="
              bg-white 
              rounded-2xl 
              shadow-sm 
              border 
              cursor-pointer 
              active:scale-[0.97] 
              transition 
              overflow-hidden
            "
          >
            {/* Image */}
            <div className="relative">
              <img
                src={cake.images?.[0] || '/placeholder.jpg'}
                className="
                  w-full 
                  h-36
                  sm:h-40
                  md:h-44 
                  object-cover 
                "
              />

              {/* Veg/Non-Veg Badge */}
              {cake.veg !== undefined && (
                <span
                  className={`
                    absolute top-2 right-2
                    text-[10px] px-2 py-[2px] rounded-full shadow-md 
                    ${cake.veg ? "bg-green-600" : "bg-red-600"} 
                    text-white
                  `}
                >
                  {cake.veg ? "Veg" : "Non-Veg"}
                </span>
              )}
            </div>

            {/* Text Area */}
            <div className="p-3 space-y-1">

              {/* Cake Name */}
              <p className="font-semibold text-[13px] leading-tight truncate">
                {cake.name}
              </p>

              {/* Price Row */}
              <div className="flex items-center gap-2 flex-wrap mt-1">
                {originalPrice && (
                  <span className="text-gray-400 line-through text-xs">
                    ₹{originalPrice}
                  </span>
                )}

                {newPrice && (
                  <span className="text-black font-bold text-sm">
                    ₹{newPrice}
                  </span>
                )}

                {discount > 0 && (
                  <span
                    className="
                      text-[9px] font-semibold text-green-800 
                      px-1.5 py-[1px] rounded-l-md 
                      bg-gradient-to-r from-green-100 to-green-300
                      relative inline-block
                    "
                  >
                    {discount}% OFF

                    <span
                      className="
                        absolute right-[-6px] top-0 h-full w-[6px] 
                        bg-gradient-to-r from-green-300 to-green-400 
                        skew-x-[20deg] rounded-r-md
                      "
                    ></span>
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CakeCard;
