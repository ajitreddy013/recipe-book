const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5500;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/recipedb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Recipe Schema
const recipeSchema = new mongoose.Schema({
  name: String,
  ingredients: [String],
  steps: String,
  cookingTime: Number,
  category: String,
});

const Recipe = mongoose.model("Recipe", recipeSchema);

// Route to Add Recipe
app.post("/addRecipe", async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.status(201).json({ message: "Recipe added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to Get Recipes
app.get("/getRecipes", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
