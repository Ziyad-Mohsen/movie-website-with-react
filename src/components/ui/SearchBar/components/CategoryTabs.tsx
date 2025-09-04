import type { SearchCategory } from "../types/SearchTypes";

interface CategoryTabsProps {
  activeCategory: SearchCategory;
  onCategoryChange: (category: SearchCategory) => void;
}

function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  const categories: SearchCategory[] = ["all", "movies", "series", "Person"];

  return (
    <div className="flex gap-2 mt-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeCategory === category
              ? "bg-primary text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default CategoryTabs;
