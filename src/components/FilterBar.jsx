import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API } from "../config";

const FilterBar = ({ filters, onFilterChange }) => {
  const [options, setOptions] = useState({
    flavours: [],
    weights: [],
  });

  useEffect(() => {
    axios.get(`${BASE_API}/api/filter-options`).then((res) => {
      setOptions({
        flavours: res.data.flavours || [],
        weights: res.data.weights || [],
      });
    });
  }, []);

  const getWrapperStyle = (key) => {
    const isActive =
      filters[key] !== "all" && filters[key] !== "default";

    return (
      "border rounded-full px-2 h-8 flex items-center " +
      (isActive
        ? "bg-amber-100 border-amber-400"
        : "bg-white border-gray-300")
    );
  };

  // ⭐ Smoothed Mobile-Friendly Select Style
  const selectStyle =
    "text-[11px] bg-transparent pr-6 pl-1 rounded-full " +
    "focus:outline-none appearance-none h-8 leading-8 cursor-pointer";

  return (
    <div className="
      flex gap-2 overflow-x-auto 
      scrollbar-hide w-full py-1 mt-2
    ">
      {/* Veg Option */}
      <div className={getWrapperStyle("veg")}>
        <select
          className={selectStyle}
          value={filters.veg}
          onChange={(e) => onFilterChange("veg", e.target.value)}
        >
          <option value="all">Veg/Non-Veg</option>
          <option value="veg">Veg Only</option>
          <option value="nonveg">Non-Veg</option>
        </select>
      </div>

      {/* Flavours */}
      <div className={getWrapperStyle("flavour")}>
        <select
          className={selectStyle}
          value={filters.flavour}
          onChange={(e) => onFilterChange("flavour", e.target.value)}
        >
          <option value="all">Flavours</option>
          {options.flavours.map((f, i) => (
            <option key={i} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      {/* Weights */}
      <div className={getWrapperStyle("weight")}>
        <select
          className={selectStyle}
          value={filters.weight}
          onChange={(e) => onFilterChange("weight", e.target.value)}
        >
          <option value="all">Weights</option>
          {options.weights.map((w, i) => (
            <option key={i} value={w}>
              {w}
            </option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div className={getWrapperStyle("sort")}>
        <select
          className={selectStyle}
          value={filters.sort}
          onChange={(e) => onFilterChange("sort", e.target.value)}
        >
          <option value="default">Sort</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
