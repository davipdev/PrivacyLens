import {verificar} from "../middlewares/user.js"
import { avaliarURL, dashboard } from "../src/controller/avaliarController.js"
import { ListaHistorico } from "../src/controller/historicoController.js"

export async function app(fastify, options) {

fastify.addHook('preHandler', verificar)

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

fastify.get("/historico", { preHandler: [verificar]}, ListaHistorico)

}