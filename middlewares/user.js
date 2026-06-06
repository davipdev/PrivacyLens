import jwt from "jsonwebtoken"

export function verificar(request, reply, done) {
    try {
        /*const authHeader = request.headers.authorization

        if (!authHeader) {
            return reply.status(401).send({erro: "token nao fornecido"})
        }
        const parts = authHeader.split(" ")
        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return reply.status(401).send({erro: "use o formato Bearer"})
        }
        
        const token = parts[1]

        const decod = jwt.verify(token , process.env.JWT_TOKEN)

        request.user = decod
        */

        request.user = {
            id:1,
            nome: "Davi",
            role: "admin"
        }
        done()

    } catch (err) {

        console.error("erro", err)

        return reply.status(401).send({erro: "token invalido ou expirado."})
    }
}