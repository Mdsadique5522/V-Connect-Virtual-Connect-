let IS_PROD = true; // Set to true for production
const server = IS_PROD ?
    "https://your-render-backend-url.onrender.com" : // Replace with your actual Render backend URL

    "http://localhost:8000"


export default server;