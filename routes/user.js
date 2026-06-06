import jwt from "jsonwebtoken"
import {verificar} from "../middlewares/user.js"
import { avaliarURL, dashboard } from "../src/controller/avaliarController.js"

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
    
fastify.get("/admin/dashboard", { preHandler: [verificar] }, dashboard)
}