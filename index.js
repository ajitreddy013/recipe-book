const API_URL = "http://localhost:5500"; // Backend URL

document.addEventListener("DOMContentLoaded", fetchRecipes);

const recipeForm = document.querySelector("#recipeForm");

recipeForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#recipeName").value;
  const ingredients = document
    .querySelector("#ingredients")
    .value.split(",")
    .map((item) => item.trim())
    .filter((item) => item);
  const steps = document.querySelector("#steps").value;
  const cookingTime = document.querySelector("#cookingTime").value;
  const category = document.querySelector("#category").value;

  const recipe = { name, ingredients, steps, cookingTime, category };

  try {
    const response = await fetch(`${API_URL}/addRecipe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    });

    if (response.ok) {
      alert("Recipe added successfully!");
      fetchRecipes(); // Refresh recipes list
      recipeForm.reset();
    } else {
      const errorData = await response.json();
      console.error("Error:", errorData);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

// Fetch Recipes from Backend
async function fetchRecipes() {
  try {
    const response = await fetch(`${API_URL}/getRecipes`);
    const recipes = await response.json();
    renderRecipes(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

// Render Recipes in HTML
function renderRecipes(recipes) {
  const recipeList = document.getElementById("recipeList");
  recipeList.innerHTML = ""; // Clear existing content

  recipes.forEach((recipe) => {
    const recipeItem = document.createElement("div");
    recipeItem.classList.add("recipe-item");
    recipeItem.innerHTML = `
        <h3>${recipe.name}</h3>
        <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
        <p><strong>Steps:</strong> ${recipe.steps}</p>
        <p><strong>Cooking Time:</strong> ${recipe.cookingTime} mins</p>
        <p><strong>Category:</strong> ${recipe.category}</p>
      `;
    recipeList.appendChild(recipeItem);
  });
}

recipes.forEach((recipe) => {
  const recipeCard = document.createElement("div");
  recipeCard.classList.add("recipe-card");
  recipeCard.innerHTML = `
      <h3>${recipe.name}</h3>
      <p><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</p>
      <p><strong>Instructions:</strong> ${recipe.steps}</p>
      <p><strong>Time:</strong> ${recipe.cookingTime} minutes</p>
      <p><strong>Category:</strong> ${recipe.category}</p>
    `;
  recipeList.appendChild(recipeCard);
});

// Filter Recipes (Search Function)
function filterRecipes() {
  const searchValue = document.querySelector("#search").value.toLowerCase();
  const recipes = document.querySelectorAll(".recipe-card");

  recipes.forEach((recipe) => {
    if (recipe.textContent.toLowerCase().includes(searchValue)) {
      recipe.style.display = "block";
    } else {
      recipe.style.display = "none";
    }
  });
}
