import Fastify from "fastify"
import jwt from "jsonwebtoken"
import "dotenv/config"

const fastify = Fastify({
    logger: true
})

fastify.get("/teste",  async (request , reply) => {
    return ({status:"on"}) 
})

fastify.post("/getage", {
    schema: {
        body: {
            type: "object",
            required: ["data"],
            properties: {
                data: {type: "string", format: "date" }
            }
        }
    }
}, async function (request , reply) {
       const { data } = request.body

       const niver = new Date(data)
       const hoje = new Date()

       let idade = hoje.getFullYear() - niver.getFullYear()

       if (
        hoje.getMonth() < niver.getMonth() || (
            hoje.getMonth() === niver.getMonth() &&
            hoje.getDate() < niver.getDate()
        )
       )
       {
        idade--
       }
        if (idade >=18) {

            const token = jwt.sign(
            {id: 1, maior: true
            },
            process.env.JWT_TOKEN,
            {expiresIn: "10m"}
        )
        return reply.status(200).send({success: true, idade, token})
       }
       if (idade <18) {
        return reply.status(200).send({error: false, idade})
       }
})

fastify.listen({port:3500}, function (err, address){
    if(err) {
        fastify.log.error(err)
        process.exit(1)
    }
})