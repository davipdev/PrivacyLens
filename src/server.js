import Fastify from "fastify"
import "dotenv/config"
import userRoutes from "../routes/user.js"

const fastify = Fastify({
    logger: true
})

fastify.get("/teste",  async (request , reply) => {
    return ({status:"on"}) 
})

fastify.register(userRoutes)

fastify.listen({port:3500}, function (err, address){
    if(err) {
        fastify.log.error(err)
        process.exit(1)
    }
})