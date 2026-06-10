import jwt from "jsonwebtoken"
import {verificar} from "../middlewares/user.js"
import { avaliarURL, dashboard } from "../src/controller/avaliarController.js"
import { Acesso, Login } from "../src/controller/authController.js"

export default async function (fastify, options) {

fastify.post("/avaliar", {
    schema: {
        body: {
            type: "object",
            required: ["url", "dados_solicitados"],
            properties: {
                url: {type: "string"},
                dados_solicitados: {
                    type: "array",
                    items: {type: "string"}
                }
            }
        }
    }
}, avaliarURL)

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
    
fastify.get("/admin/dashboard", { preHandler: [verificar] }, dashboard)
}