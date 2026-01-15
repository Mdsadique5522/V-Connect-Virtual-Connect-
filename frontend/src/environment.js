let IS_PROD = true; // Set to true for production
const server = IS_PROD ?
    "https://v-connect-zgkr.onrender.com" :

    "http://localhost:8000"


export default server;