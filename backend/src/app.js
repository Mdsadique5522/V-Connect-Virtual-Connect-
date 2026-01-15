import express from "express";
import { createServer } from "node:http";

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

console.log("MONGO_URI from env:", process.env.MONGO_URI);

const app = express();
const server = createServer(app);
const io = connectToSocket(server);


app.set("port", (process.env.PORT || 8000))
app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

app.use("/api/v1/users", userRoutes);

const start = async () => {
    try {
         const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/zoom-app";
         console.log("Using mongoUri:", mongoUri);
        
        const connectionDb = await mongoose.connect(mongoUri)

        console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`)
        server.listen(app.get("port"), () => {
            console.log(`Server is LISTENING ON PORT ${app.get("port")}`)
        });
    } catch(error) {
        console.error("Error in start function:", error);
        process.exit(1);
    }
}

start().catch((err) => {
    console.error("Error starting server:", err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});