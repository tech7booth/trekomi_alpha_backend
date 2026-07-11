import Fastify from "fastify";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./plugins/errorHandler";
import fastifyCors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import profileRoutes from "./routes/profile.routes";
import authenticate from "./plugins/authenticate";

export function buildApp() {
    const app = Fastify({
        logger: true
    });

    app.register(fastifyCookie)
    app.register(fastifyCors, {
        origin: [
            (process.env.WEB_URL || "*")
        ],
        credentials: true
    })

    app.get("/", async () => {
        return {
            success: true,
            message: "Hello Fastify + TS"
        };
    });

    app.register(authenticate);
    
    app.register(profileRoutes, {prefix: "/profile"});
    app.register(authRoutes, { prefix: "/auth" });

    app.setErrorHandler(errorHandler);
    return app;
}
