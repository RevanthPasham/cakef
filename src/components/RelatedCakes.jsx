import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_API } from "../config";
import { useNavigate } from "react-router-dom";

const RelatedCakes = ({ cakeId, categories }) => {
  const [related, setRelated] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_API}/api/related-cakes/${cakeId}`)
      .then((res) => setRelated(res.data))
      .catch(() => setRelated([]));
  }, [cakeId]);

  if (!related.length) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-3">
        More in "{categories?.[0] || "Category"}"
      </h3>

      {/* Fully mobile-safe grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {related.map((cake) => {
          const price = cake.prices?.[0] ?? null;
          const cutPrice = cake.cutPrices?.[0] ?? null;

          const discount =
            cutPrice && price
              ? Math.round(((cutPrice - price) / cutPrice) * 100)
              : null;

          return (
            <div
              key={cake._id}
              onClick={() => navigate(`/cake/${cake._id}`)}
              className="
                bg-white rounded-xl shadow 
                active:scale-95 
                transition
                cursor-pointer
                flex-shrink-0
              "
            >
              {/* IMAGE */}
              <div className="relative w-full h-32 sm:h-36 overflow-hidden rounded-t-xl">
                <img
                  src={cake.images?.[0] || "/placeholder.jpg"}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Veg / Non-Veg Tag */}
                {cake.veg !== undefined && (
                  <span
                    className={`
                      absolute top-1 right-1 
                      text-[9px] px-1.5 py-[1px] rounded-full shadow 
                      ${cake.veg ? "bg-green-600 text-white" : "bg-red-600 text-white"}
                    `}
                  >
                    {cake.veg ? "Veg" : "Non-Veg"}
                  </span>
                )}
              </div>

              {/* DETAILS */}
              <div className="p-2">
                {/* Name */}
                <p className="font-semibold text-[12px] sm:text-[13px] leading-tight line-clamp-2">
                  {cake.name}
                </p>

                {/* Pricing */}
                <div className="flex items-center gap-1 mt-1 flex-wrap">
                  {cutPrice && (
                    <span className="text-gray-400 line-through text-[10px] sm:text-[11px]">
                      ₹{cutPrice}
                    </span>
                  )}

                  {price && (
                    <span className="text-black font-bold text-[12px] sm:text-[13px]">
                      ₹{price}
                    </span>
                  )}

                  {discount > 0 && (
                    <span
                      className="
                        text-[9px] font-semibold text-green-800 
                        px-1.5 py-[1px] rounded 
                        bg-green-100
                      "
                    >
                      {discount}% OFF
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedCakes;
