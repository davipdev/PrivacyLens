import jwt from "jsonwebtoken"

export async function verificar(request, reply) {
    try {
        const authHeader = request.headers.authorization

        if (!authHeader) {
            return reply.status(401).send({erro: "token nao fornecido"})
        }
        const parts = authHeader.split(" ")
        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return reply.status(401).send({erro: "use o formato Bearer"})
        }
        
        const token = parts[1]
        console.log("token extraido", token)
        const decod = jwt.verify(token , process.env.JWT_SECRET)

        request.user = decod

        return 

    } catch (err) {

        console.error("erro", err)

        return reply.status(401).send({erro: "token invalido ou expirado."})
    }
}