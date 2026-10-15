import { useState, useEffect } from "react";
import RecipeModal from "./components/RecipeModal";
import RecipeCard from "./components/RecipeCard";
import SearchBar from "./components/SearchBar";

const API = "https://www.themealdb.com/api/json/v1/1";

async function fetchMeals(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Network error");
  const data = await res.json();
  return data.meals || [];
}

const App = () => {
  const [query, setQuery] = useState("");
  const [meals, setMeals] = useState([]);
  const [message, setMessage] = useState("Search for a recipe or get a random one!");
  const [selectedMeal, setSelectedMeal] = useState(null);

  useEffect(() => {
    async function loadInitialRecipes() {
      setMessage("Loading recipes...");
      try {
        const data = await fetchMeals(API + "/search.php?s=");
        setMeals(data.slice(0, 7));
        setMessage("Search for a recipe or get a random one!");
      } catch (err) {
        setMessage("Something went wrong. Please try again.");
      }
    }

    loadInitialRecipes();
  }, []);

  async function searchRecipes() {
    const q = query.trim();
    if (!q) {
      setMessage("Please type something to search.");
      return;
    }

    setMessage("Searching...");
    setMeals([]);

    try {
      const found = await fetchMeals(API + "/search.php?s=" + encodeURIComponent(q));
      if (found.length === 0) {
        setMessage(`No recipes found for "${q}".`);
        return;
      }
      setMeals(found);
      setMessage(`Found ${found.length} recipe(s) for "${q}"`);
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    }
  }

  async function getRandomRecipe() {
    setMessage("Finding a random recipe...");
    try {
      const found = await fetchMeals(API + "/random.php");
      setSelectedMeal(found[0]);
      setMessage("Here's a random recipe for you!");
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <>
      <main className="container">
        <h1>Recipe Finder</h1>

        <SearchBar query={query} setQuery={setQuery} onSearch={searchRecipes} />

        <button className="random-btn" onClick={getRandomRecipe}>
          Get Random Recipe
        </button>

        <p className="message">{message}</p>

        <div id="recipe-result">
          {meals.map((meal) => (
            <RecipeCard
              key={meal.idMeal}
              meal={meal}
              onView={() => setSelectedMeal(meal)}
            />
          ))}
        </div>
      </main>

      {selectedMeal && (
        <RecipeModal
          meal={selectedMeal}
          onClose={() => setSelectedMeal(null)}
        />
      )}
    </>
  );
};

export default App;