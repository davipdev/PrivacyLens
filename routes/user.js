import jwt from "jsonwebtoken"
import {verificar} from "../middlewares/user.js"

export default async function (fastify, options) {

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

       let idade = hoje.getFullYear() - niver.getUTCFullYear()

       if (
        hoje.getMonth() < niver.getUTCMonth() || (
            hoje.getMonth() === niver.getUTCMonth() &&
            hoje.getDate() < niver.getUTCDate()
        )
       )
       {
        idade--
       }
        if (idade >=18) {

            const token = jwt.sign(
            {maior: true
            },
            process.env.JWT_TOKEN,
            {expiresIn: "10m"}
        )
        return reply.status(200).send({success: true, token})
       }
       if (idade <18) {
        return reply.status(403).send({success: false})
       }
})

fastify.get("/protect", {preHandler: [verificar]}, async function(request, reply) {

    const usuario = request.user
    
    return reply.status(200).send({resposta: "bem vindo!"})

})
}