import jwt from "jsonwebtoken"
import {verificar} from "../middlewares/user.js"

const regras = {
    adulto: {
        nessesario: ["data_nascimento", "dados_tecnicos_basicos"],
        talvez: ["cartão_credito", "nome/usuario", "pais", "idioma", "recomendaçoes", "fuso_horario"],
        abusivo: ["endereço", "nome_mãe", "cpf", "rg", "biometria_facial"]
    },
    ecommerce: {
        nessesario: ["email", "senha(caso-haja-conta", "nome", "endereço_de_entrega", "telefone", "dados_de_pagementos", "logs_acesso", "IP"],
        talvez: ["cpf", "data_nascimento", "localização_aproximada", "historico_de_compras"],
        abusivo: ["cpf_para_navegaçao", "profissão", "renda_mensal", "acesso_a_camera", "nome_da_mãe"]
    }
}

export default async function (fastify, options) {

fastify.post("/avaliar", {
    schema: {
        body: {
            type: "object",
            required: ["servico", "dados_solicitados"],
            properties: {
                servico: {type: "string"},
                dados_solicitados: {
                    type: "array",
                    items: {type: "string"}
                }
            }
        }
    }
}, async function (request , reply) {
       const { servico, dados_solicitados } = request.body

       const regra = regras[servico.toLowerCase()]

       if (!regra) {
        return reply.status(400).send({
            success: false,
            error: "servico invalido ou inexistente, use adulto ou ecommerce."
        })
       }

       let nessesario = []
       let talvez = []
       let abusivo = []

       for (const dado of dados_solicitados) {

        if(regra.nessesario.includes(dado)) {
            nessesario.push(dado)
        } else if (regra.talvez.includes(dado)) {
            talvez.push(dado)
        } else {
            abusivo.push(dado)
        }
    }
      
        let resultadoFiltrado = {}

        if (nessesario.length > 0) {
            resultadoFiltrado.nessesario = nessesario
        }
        
        if (talvez.length > 0) {
            resultadoFiltrado.talvez = talvez
        }
        
        if (abusivo.length > 0) {
            resultadoFiltrado.abusivo = abusivo
        }

        return reply.status(200).send({
            success: true,
            resultado: resultadoFiltrado
        })
    })
        
fastify.get("/protect", {preHandler: [verificar]}, async function(request, reply) {

    const usuario = request.user
    
    return reply.status(200).send({resposta: "bem vindo!"})

})
}