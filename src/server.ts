import "dotenv/config"

import { buildApp } from "./app.js";
import { connectDb } from "./configs/db.config.js";

const port = Number(process.env.PORT) || 3001;
async function start() {
    const app = buildApp();

    try {
        
        await connectDb()

        const appInstance = await app.listen({
            port,
            host: "0.0.0.0"
        });

        console.log("Server running on - ", appInstance);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

start();