import jwt from "jsonwebtoken"
import {verificar} from "../middlewares/user.js"

const regras = {
    adulto: {
        nessesario: ["data_nascimento", "dados_tecnicos_basicos"],
        talvez: ["cartão_credito", "nome/usuario", "pais", "idioma", "recomendaçoes", "fuso_horario"],
        abusivo: ["endereço", "nome_mãe", "cpf", "rg", "biometria_facial"]
    },
    ecommerce: {
        nessesario: ["email", "senha(caso-haja-conta)", "nome", "endereço_de_entrega", "telefone", "dados_de_pagementos", "logs_acesso", "IP"],
        talvez: ["cpf", "data_nascimento", "localização_aproximada", "historico_de_compras"],
        abusivo: ["cpf_para_navegaçao", "profissão", "renda_mensal", "acesso_a_camera", "nome_da_mãe"]
    }
}

const historicoConsultas = []

function identificarCat(url) {
    const urlLower = url.toLowerCase()
    const palavrasEcommerce = [
    "shop",
    "store",
    "loja",
    "marketplace",
    "market",
    "ecommerce",
    "commerce",
    "buy",
    "cart",
    "checkout",
    "order",
    "orders",
    "purchase",
    "purchases",
    "sales",
    "deals",
    "offers",
    "product",
    "products",
    "catalog",
    "collection",
    "collections",
    "category",
    "categories",
    "item",
    "items",
    "inventory",
    "payment",
    "payments",
    "billing",
    "invoice",
    "invoices",
    "shipping",
    "delivery",
    "shipment",
    "coupon",
    "coupons",
    "discount",
    "discounts",
    "voucher",
    "vouchers",
    "seller",
    "vendor",
    "merchant"
]

if (palavrasEcommerce.some(palavra => urlLower.includes(palavra))) {
    return "ecommerce"
}
const palavrasAdulto = [
    "adult",
    "porn",
    "xxx",
    "sex",
    "cam",
    "cams",
    "tube",
    "escort",
    "fetish",
    "nsfw",
    "18plus",
    "18+",
    "hot",
    "erotic",
    "nude",
    "nudes",
    "webcam",
    "livecam",
    "mature"
]

if (palavrasAdulto.some(palavra => urlLower.includes(palavra))) {
    return "adulto"
} 
return "ultilitarios"
}

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
}, async function (request , reply) {
       const { url, dados_solicitados } = request.body
       
       const servico = identificarCat(url)
       const regra = regras[servico]

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

    let score = 100

    score -= (talvez.length * 2)
    score -= (abusivo.length * 20)
      
    let nivelrisco = "baixo"
    if (score < 40) {
        nivelrisco = "critico"
    } else if (score < 70) {
        nivelrisco = "alto"
    } else if (score < 90) {
        nivelrisco = "medio"
    }

     historicoConsultas.push ({
        id: historicoConsultas.length + 1,
        url_site: url,
        categoria: servico,
        scoresite: score,
        nivel: nivelrisco,
        data_hora: new Date()
    })
    let resultadoFiltrado = {}
        if (nessesario.length > 0) resultadoFiltrado.nessesario = nessesario
        if (talvez.length > 0) resultadoFiltrado.talvez = talvez
        if (abusivo.length > 0) resultadoFiltrado.abusivo = abusivo

        return reply.status(200).send({
            success: true,
            categoria_detectada: servico,
            score_privacidade: score,
            nivel_risco: nivelrisco,
            resultado: resultadoFiltrado
        })
    })
        
fastify.get("/protect", {preHandler: [verificar]}, async function(request, reply) {

    const usuario = request.user
    
    return reply.status(200).send({resposta: "bem vindo!"})

})
}