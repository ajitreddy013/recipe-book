# 🍳 Culinary Collection - Recipe Book

<div align="center">
  <h3>A modern, full-stack recipe management application</h3>
  <p>Built with Node.js, Express.js, MongoDB, and vanilla JavaScript</p>
</div>

---

## 📌 Overview

**Culinary Collection** is a comprehensive recipe management web application that allows users to create, store, search, and manage their favorite recipes. The application features a modern, responsive UI with image upload capabilities, advanced filtering options, and full CRUD operations.

## ✨ Key Features

### 🍽️ Recipe Management
- **Add new recipes** with detailed information (name, ingredients, instructions, cooking time)
- **Upload recipe images** with real-time preview
- **Categorize recipes** by meal type (Breakfast, Lunch, Dinner, Desserts, Beverages, Snacks)
- **Specify diet types** (Vegetarian, Non-Vegetarian)
- **Edit existing recipes** with inline action buttons
- **Delete recipes** with automatic image cleanup

### 🔍 Search & Filter
- **Real-time search** by recipe name
- **Filter by diet type** (All, Vegetarian, Non-Vegetarian)
- **Filter by category** (All categories or specific meal types)
- **Combined filtering** for precise recipe discovery

### 🎨 User Experience
- **Modern, responsive design** with professional typography
- **Intuitive time input** with visual clock icon
- **Image preview functionality** for uploaded photos
- **Action icons** for quick edit/delete operations
- **Scroll-to-top button** for easy navigation
- **Loading states and error handling**

## 🛠 Tech Stack

### Frontend
- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with Flexbox/Grid
- **Vanilla JavaScript** - Dynamic interactions and API calls
- **Font Awesome** - Professional icon library
- **Google Fonts** - Montserrat, Playfair Display, Source Sans 3

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Multer** - File upload middleware
- **CORS** - Cross-origin resource sharing
- **Body Parser** - Request body parsing

### Database
- **MongoDB** - NoSQL database for recipe storage
- **Mongoose** - MongoDB object modeling

## 📂 Project Structure
```
recpie-book5/
├── server.js           # Express server and API routes
├── index.js           # Frontend JavaScript functionality
├── index.html         # Main HTML template
├── index.css          # Styling and responsive design
├── package.json       # Project dependencies and scripts
├── uploads/           # Directory for uploaded recipe images
├── node_modules/      # NPM dependencies
└── README.md          # Project documentation
```

## ⚡ Setup Instructions

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Git** for version control

### 1️⃣ Clone the repository
```bash
git clone https://github.com/ajitreddy013/recipe-book.git
cd recipe-book
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Setup MongoDB
**Option A: Local MongoDB**
- Install MongoDB Community Edition
- Start MongoDB service:
  ```bash
  # macOS
  brew services start mongodb-community
  
  # Windows
  net start MongoDB
  
  # Linux
  sudo systemctl start mongod
  ```

**Option B: MongoDB Atlas (Cloud)**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
- Update the connection string in `server.js`

### 4️⃣ Start the application
```bash
# Start the backend server
node server.js
```
The server will run on **http://localhost:5500**

### 5️⃣ Open the frontend
- Open `index.html` in your browser, or
- Use **Live Server** extension in VS Code for hot reload

## 🎯 API Documentation

### Recipe Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|-------------|
| `POST` | `/addRecipe` | Create a new recipe | Recipe object |
| `GET` | `/getRecipes` | Fetch all recipes | None |
| `GET` | `/getRecipe/:id` | Get specific recipe | None |
| `PUT` | `/updateRecipe/:id` | Update existing recipe | Updated recipe object |
| `DELETE` | `/deleteRecipe/:id` | Delete a recipe | None |

### Image Upload Endpoint

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|-------------|
| `POST` | `/uploadImage` | Upload recipe image | FormData with image file |

### Recipe Object Schema
```javascript
{
  "name": "Recipe Name",
  "ingredients": ["ingredient1", "ingredient2"],
  "steps": "Step-by-step cooking instructions",
  "cookingTime": 30,
  "category": "Dinner",
  "dietType": "Vegetarian",
  "imageUrl": "http://localhost:5500/uploads/image.jpg"
}
```

## 🚀 Usage Examples

### Adding a Recipe via API
```javascript
fetch('http://localhost:5500/addRecipe', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Spaghetti Carbonara',
    ingredients: ['spaghetti', 'eggs', 'bacon', 'parmesan'],
    steps: 'Cook pasta, mix eggs with cheese, combine with bacon...',
    cookingTime: 25,
    category: 'Dinner',
    dietType: 'Non-Vegetarian'
  })
});
```

### Uploading an Image
```javascript
const formData = new FormData();
formData.append('recipeImage', fileInput.files[0]);

fetch('http://localhost:5500/uploadImage', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log('Image URL:', data.imageUrl));
```

## 📱 Screenshots

*Add screenshots of your application here*

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory for production:
```env
PORT=5500
MONGO_URI=mongodb://127.0.0.1:27017/recipedb
UPLOAD_DIR=uploads
```

### File Upload Limits
- **Maximum file size**: 5MB
- **Supported formats**: JPEG, JPG, PNG, GIF, WebP
- **Storage location**: `uploads/` directory

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `server.js`
   - Verify firewall settings

2. **Image Upload Not Working**
   - Check file size (max 5MB)
   - Ensure supported file format
   - Verify `uploads/` directory exists

3. **CORS Issues**
   - Check if CORS middleware is properly configured
   - Verify frontend and backend URLs

### Debug Mode
Add debug logging to `server.js`:
```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.body);
  next();
});
```

## 🤝 Contributing
Feel free to contribute by submitting issues or pull requests!

## 📜 License
This project is open-source and free to use.

