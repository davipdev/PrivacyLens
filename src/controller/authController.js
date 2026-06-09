import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";
import { PrismaClient } from "../database/prisma.js"

const prisma = new PrismaClient()

export default async function (fastify, opts) {
    fastify.post("/register", {
        schema: {
            body: {
                type: "object",
                required: ["nome", "email", "senha"],
                properties: {
                    nome: {type: "string"},
                    email: {type: "string", format: "email"},
                    senha: {type: "string", minLength: 6}
                }
            }
        }
    }, async (request, reply) => {
        const {nome, email, senha} = request.body

        try {
            const usuarioexiste = await prisma.usuario.findUnique({
                where: {email}
            })
            if (usuarioexiste) {
                return reply.status(400).send ({
                    erro: "usuario com email ja cadastrado!"
                })
            }
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(senha, salt)
        
            const novousuario = await prisma.usuario.create({
                data: {
                    nome: nome,
                    email: email,
                    senha: hash
                }
            })
            
            return {
                status: "success",
                id: novousuario.id
            }
        } catch (error) {
            console.error(error)
            return reply.status(500).send({erro: "erro ao salvar", detalhe: error.message})
        }

    })
}
