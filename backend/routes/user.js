import jwt from "jsonwebtoken"
import { Acesso, Login } from "../src/controller/authController.js"

export default async function (fastify, options) {

fastify.post("/register", {
        schema: {
            body: {
                type: "object",
                required: ["nome", "email", "senha"],
                properties: {
                    nome: {type: "string"},
                    email: {type: "string", format: "email"},
                    senha: {type: "string", minLength: 6},
                    nomeEmpresa: {type: "string"},
                    codigo: {type: "string"}
                }
            }
        }
    }, Acesso)

fastify.post("/login", {
        schema: {
            body: {
                type: "object",
                required: ["email", "senha"],
                properties: {
                    email: {type: "string", format: "email"},
                    senha: {type: "string", minLength: 6}
            }
        }
    }
}, Login)
    
}