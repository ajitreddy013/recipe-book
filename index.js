const API_URL = "http://localhost:5500"; // Backend URL

// Global variable to store the currently edited recipe ID
let currentEditId = null;

document.addEventListener("DOMContentLoaded", () => {
  fetchRecipes();
  setupImagePreview();

  // Create buttons container and reorganize form buttons
  setupFormButtons();

  // Setup top button
  setupTopButton();
});

// Setup form buttons
function setupFormButtons() {
  const submitButton = document.querySelector(
    "#recipeForm button[type='submit']"
  );
  const buttonsContainer = document.querySelector(".form-buttons");

  // Create reset button
  const resetButton = document.createElement("button");
  resetButton.type = "button";
  resetButton.className = "reset-btn";
  resetButton.innerHTML = '<i class="fas fa-sync-alt"></i> Reset';
  resetButton.onclick = resetForm;

  // Add reset button to the container
  buttonsContainer.appendChild(resetButton);
}

// Setup scroll-to-top button
function setupTopButton() {
  const topButton = document.getElementById("topButton");

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      topButton.classList.add("visible");
    } else {
      topButton.classList.remove("visible");
    }
  });

  // Scroll to top on click
  topButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

const recipeForm = document.querySelector("#recipeForm");
const searchInput = document.querySelector("#search");
searchInput.addEventListener("input", filterRecipes);

// Add image preview functionality
function setupImagePreview() {
  const imageInput = document.getElementById("recipeImage");
  const imagePreview = document.getElementById("imagePreview");

  imageInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imagePreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      imagePreview.src = "https://via.placeholder.com/150?text=Preview";
    }
  });
}

// Render Recipes in HTML
function renderRecipes(recipes) {
  const recipeList = document.getElementById("recipeList");
  recipeList.innerHTML = ""; // Clear existing content
  console.log("Rendering recipes:", recipes.length);

  if (recipes.length === 0) {
    recipeList.innerHTML = `<div class="no-recipes">No recipes found. Add your first recipe!</div>`;
    return;
  }

  recipes.forEach((recipe) => {
    console.log("Rendering recipe:", recipe.name);
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe", "recipe-card"); // Added "recipe" class for styling
    recipeCard.dataset.id = recipe._id; // Store recipe ID in the DOM

    // Format ingredients as a list
    const ingredientsList = recipe.ingredients
      .map((ingredient) => `<li>${ingredient}</li>`)
      .join("");

    // Diet type tag with proper icon - handle older recipes without dietType
    const dietType = recipe.dietType || "Unknown";
    const dietIcon =
      dietType === "Vegetarian"
        ? '<i class="fas fa-leaf"></i>'
        : '<i class="fas fa-drumstick-bite"></i>';

    recipeCard.innerHTML = `
      <div class="recipe-image">
        <img src="${
          recipe.imageUrl || "https://via.placeholder.com/400x300?text=No+Image"
        }" alt="${recipe.name}">
      </div>
      <div class="recipe-content">
        <div class="recipe-header">
          <h3>${recipe.name}</h3>
          <div class="recipe-tags">
            <span class="recipe-category">${recipe.category}</span>
            <span class="recipe-diet-type ${dietType.toLowerCase()}">${dietIcon} ${dietType}</span>
          </div>
        </div>
        <div class="recipe-time">
          <i class="fas fa-clock"></i> ${recipe.cookingTime} minutes
        </div>
        <div class="recipe-ingredients">
          <h4>Ingredients</h4>
          <ul>${ingredientsList}</ul>
        </div>
        <div class="recipe-steps">
          <h4>Instructions</h4>
          <p>${recipe.steps}</p>
        </div>
      </div>
      <div class="recipe-buttons">
        <button class="edit-btn" onclick="editRecipe('${recipe._id}')">
          <i class="fas fa-edit"></i> Edit
        </button>
        <button class="delete-btn" onclick="deleteRecipe('${recipe._id}')">
          <i class="fas fa-trash-alt"></i> Delete
        </button>
      </div>
    `;

    recipeList.appendChild(recipeCard);
  });
}

// Edit Recipe Function
async function editRecipe(recipeId) {
  try {
    const response = await fetch(`${API_URL}/getRecipe/${recipeId}`);
    const recipe = await response.json();

    // Update form title
    const formTitle = document.querySelector(".form-title");
    formTitle.textContent = "Edit Recipe";

    // Fill the form with recipe data
    document.querySelector("#recipeName").value = recipe.name;
    document.querySelector("#ingredients").value =
      recipe.ingredients.join(", ");
    document.querySelector("#steps").value = recipe.steps;
    document.querySelector("#cookingTime").value = recipe.cookingTime;
    document.querySelector("#category").value = recipe.category;

    // Handle diet type (for older recipes)
    if (recipe.dietType) {
      document.querySelector("#dietType").value = recipe.dietType;
    } else {
      document.querySelector("#dietType").value = "";
    }

    // Update image preview if exists
    if (recipe.imageUrl) {
      document.getElementById("imagePreview").src = recipe.imageUrl;
    } else {
      document.getElementById("imagePreview").src =
        "https://via.placeholder.com/150?text=Preview";
    }

    // Scroll to the form
    document
      .querySelector("#recipeForm")
      .scrollIntoView({ behavior: "smooth" });

    // Change button text
    const submitButton = document.querySelector(
      "#recipeForm button[type='submit']"
    );
    submitButton.innerHTML = '<i class="fas fa-save"></i> Update Recipe';

    // Store the current recipe ID for update
    currentEditId = recipeId;
  } catch (error) {
    console.error("Error fetching recipe for edit:", error);
  }
}

// Delete Recipe Function
async function deleteRecipe(recipeId) {
  if (confirm("Are you sure you want to delete this recipe?")) {
    try {
      const response = await fetch(`${API_URL}/deleteRecipe/${recipeId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the card from the DOM
        const recipeCard = document.querySelector(
          `.recipe-card[data-id="${recipeId}"]`
        );
        if (recipeCard) {
          recipeCard.classList.add("deleting");
          // Wait for animation to complete
          setTimeout(() => {
            recipeCard.remove();

            // Check if there are no recipes left
            const remainingRecipes = document.querySelectorAll(".recipe-card");
            if (remainingRecipes.length === 0) {
              document.getElementById(
                "recipeList"
              ).innerHTML = `<div class="no-recipes">No recipes found. Add your first recipe!</div>`;
            }
          }, 300);
        }

        alert("Recipe deleted successfully!");
      } else {
        alert("Failed to delete recipe. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  }
}

// Modify the recipe form submit handler to support both add and edit
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
  const dietType = document.querySelector("#dietType").value;

  // Handle image
  const imageInput = document.querySelector("#recipeImage");
  let imageUrl = "";

  if (imageInput.files.length > 0) {
    try {
      const imageFile = imageInput.files[0];
      const formData = new FormData();
      formData.append("recipeImage", imageFile);

      // Upload the image first
      const imageResponse = await fetch(`${API_URL}/uploadImage`, {
        method: "POST",
        body: formData,
      });

      if (imageResponse.ok) {
        const imageData = await imageResponse.json();
        imageUrl = imageData.imageUrl;
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Could not upload image. Using placeholder instead.");
      imageUrl = "https://via.placeholder.com/400x300?text=No+Image";
    }
  } else if (currentEditId) {
    // If editing and no new image selected, keep the existing image URL
    const imagePreview = document.getElementById("imagePreview").src;
    if (!imagePreview.includes("via.placeholder.com")) {
      imageUrl = imagePreview;
    } else {
      imageUrl = "https://via.placeholder.com/400x300?text=No+Image";
    }
  } else {
    // Default placeholder if no image is uploaded
    imageUrl = "https://via.placeholder.com/400x300?text=No+Image";
  }

  const recipe = {
    name,
    ingredients,
    steps,
    cookingTime,
    category,
    dietType,
    imageUrl,
  };

  try {
    let url = `${API_URL}/addRecipe`;
    let method = "POST";

    // If editing, use the update endpoint
    if (currentEditId) {
      url = `${API_URL}/updateRecipe/${currentEditId}`;
      method = "PUT";
    }

    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recipe),
    });

    if (response.ok) {
      alert(
        currentEditId
          ? "Recipe updated successfully!"
          : "Recipe added successfully!"
      );
      fetchRecipes(); // Refresh recipes list
      resetForm();
    } else {
      const errorData = await response.json();
      console.error("Error:", errorData);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

// Function to reset the form and editing state
function resetForm() {
  recipeForm.reset();
  document.getElementById("imagePreview").src =
    "https://via.placeholder.com/150?text=Preview";

  // Reset form title
  const formTitle = document.querySelector(".form-title");
  formTitle.textContent = "Add New Recipe";

  // Reset edit state
  currentEditId = null;

  // Reset button text
  const submitButton = document.querySelector(
    "#recipeForm button[type='submit']"
  );
  submitButton.innerHTML = '<i class="fas fa-plus"></i> Add Recipe';
}

// Fetch Recipes from Backend
async function fetchRecipes() {
  try {
    const response = await fetch(`${API_URL}/getRecipes`);
    const recipes = await response.json();
    console.log("Fetched recipes:", recipes);
    renderRecipes(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

// Filter Recipes (Search Function)
function filterRecipes() {
  const searchValue = document.querySelector("#search").value.toLowerCase();
  const dietFilter = document.querySelector("#dietFilter").value;
  const categoryFilter = document.querySelector("#categoryFilter").value;
  const recipes = document.querySelectorAll(".recipe-card");
  let hasVisibleRecipes = false;

  recipes.forEach((recipe) => {
    const recipeText = recipe.textContent.toLowerCase();
    const recipeDietType = recipe.querySelector(".recipe-diet-type")
      ? recipe.querySelector(".recipe-diet-type").textContent.trim()
      : "";
    const recipeCategory = recipe.querySelector(".recipe-category")
      ? recipe.querySelector(".recipe-category").textContent.trim()
      : "";

    // Check if matches search text
    const matchesSearch = recipeText.includes(searchValue);

    // Check if matches diet filter
    const matchesDiet =
      dietFilter === "All" || recipeDietType.includes(dietFilter);

    // Check if matches category filter
    const matchesCategory =
      categoryFilter === "All" || recipeCategory === categoryFilter;

    // Show recipe only if it matches all active filters
    if (matchesSearch && matchesDiet && matchesCategory) {
      recipe.style.display = "block";
      hasVisibleRecipes = true;
    } else {
      recipe.style.display = "none";
    }
  });

  // Show "no results" message if no recipes match the search
  const recipeList = document.getElementById("recipeList");
  const noResultsMsg = document.querySelector(".no-results");

  if (!hasVisibleRecipes) {
    if (!noResultsMsg) {
      const message = document.createElement("div");
      message.classList.add("no-recipes", "no-results");
      message.textContent =
        "No recipes match your filters. Try different criteria.";
      recipeList.appendChild(message);
    }
  } else if (noResultsMsg) {
    noResultsMsg.remove();
  }
}

// Make the functions available globally
window.editRecipe = editRecipe;
window.deleteRecipe = deleteRecipe;
