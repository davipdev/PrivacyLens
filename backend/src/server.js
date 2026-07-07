import "dotenv/config"
import Fastify from "fastify"
import fastifyCors from "@fastify/cors"
import userRoutes from "../routes/user.js"
import { app } from "../routes/app.js"

const fastify = Fastify({
    logger: true
})

await fastify.register(fastifyCors, {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: [ "GET", "POST", "PUT", "DELETE"]
})

fastify.get("/teste",  async (request , reply) => {
    return ({status:"on"}) 
})

fastify.register(userRoutes)
fastify.register(app)

fastify.listen({ port: process.env.PORT || 3500, host: "0.0.0.0" }, function (err, address){
    if(err) {
        fastify.log.error(err)
        process.exit(1)
    }
})