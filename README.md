# Recipe Book

## 📌 Overview
The **Recipe Book** is a web application that allows users to add, store, and retrieve recipes. The project uses **Node.js, Express.js, MongoDB, and JavaScript** for backend operations and a user-friendly frontend to interact with the system.

## 🚀 Features
- Add new recipes with name, ingredients, steps, cooking time, and category.
- Store recipes in **MongoDB Compass**.
- Fetch and display saved recipes.
- Search for recipes based on their names.

## 🛠 Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Compass

## 📂 Project Structure
```
recpie-book5/
│-- server.js
│-- index.js
│-- index.html
│-- index.css
│-- package.json
│-- README.md
```

## ⚡ Setup Instructions
### 1️⃣ Clone the repository
```bash
git clone https://github.com/ajitreddy013/recipe-book.git
cd recipe-book
```
### 2️⃣ Install dependencies
```bash
npm install
```
### 3️⃣ Start the server
```bash
node server.js
```
The server will run on **http://localhost:5500**

### 4️⃣ Open the frontend
Run the `index.html` file in a browser or use **Live Server** in VS Code.

## 🎯 API Endpoints
| Method | Endpoint      | Description           |
|--------|-------------|----------------------|
| POST   | /addRecipe  | Add a new recipe     |
| GET    | /getRecipes | Fetch all recipes    |

## 📝 Notes
- Ensure **MongoDB Compass** is running and connected properly.
- If data is not visible in Compass, verify the connection string in `server.js`.
- For any issues, check the browser console and server logs.

## 🤝 Contributing
Feel free to contribute by submitting issues or pull requests!

## 📜 License
This project is open-source and free to use.

