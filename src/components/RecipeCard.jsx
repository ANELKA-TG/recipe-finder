const RecipeCard = ({ meal, onView }) => {
  return (
    <article className="recipe-card">
      <img src={meal.strMealThumb} alt={meal.strMeal} />
      <div className="recipe-info">
        <h3>{meal.strMeal}</h3>
        <p className="tags">
          {meal.strCategory || "Recipe"} . {meal.strArea || "Unknown"}
        </p>
        <button className="toggle-btn" onClick={onView}>
          View Recipe
        </button>
      </div>
    </article>
  );
};

export default RecipeCard;