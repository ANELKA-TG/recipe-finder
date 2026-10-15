import { useEffect } from "react";

function getIngredients(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal["strIngredient" + i];
    const measure = meal["strMeasure" + i];
    if (ingredient && ingredient.trim()) {
      list.push(((measure || "").trim() + " " + ingredient.trim()).trim());
    }
  }
  return list;
}

const RecipeModal = ({ meal, onClose }) => {
  const ingredients = getIngredients(meal);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey); // cleanup
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        <img className="modal-img" src={meal.strMealThumb} alt={meal.strMeal} />
        <h2>{meal.strMeal}</h2>
        <p className="tags">
          {meal.strCategory || "Recipe"} . {meal.strArea || "Unknown"}
        </p>

        <h4>Ingredients</h4>
        <ul>
          {ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h4>Instructions</h4>
        <p>{meal.strInstructions}</p>
      </div>
    </div>
  );
};

export default RecipeModal;