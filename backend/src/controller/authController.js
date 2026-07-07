import  jwt  from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "../database/prisma.js";
import fastify from "fastify";
import crypto from "crypto"

export async function Acesso(request, reply) {
        const {nome, email, senha, codigo, nomeEmpresa} = request.body

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
            
            let empresaID
            let rolefinal = "usuario"

            if (codigo) {
                const empresaExistente = await prisma.empresa.findUnique({
                    where: {codigo: codigo}
                })
            if (!empresaExistente) {
                return reply.status(400).send({
                    erro: "codigo invalido ou empresa nao encontrada."
                })
            }
            empresaID = empresaExistente.id
            rolefinal = "usuario"
            }
            else {
                const codigoAle = `PK-${crypto.randomBytes(3).toString("hex").toUpperCase()}`

                const nomefinalemp = nomeEmpresa || `empresa de ${nome}`

                const novaempresa = await prisma.empresa.create({
                    data: {
                        nome: nomefinalemp,
                        codigo: codigoAle
                    }
                })
                empresaID = novaempresa.id
                rolefinal = "admin"
            }

            const novousuario = await prisma.usuario.create({
                data: {
                    nome: nome,
                    email: email,
                    senha: hash,
                    role: rolefinal,
                    empresaId: empresaID
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

    }
export async function Login (request, reply) {

    const {email, senha} = request.body

    const consultaDB = await prisma.usuario.findUnique({
        where: {email}
    })
    if (!consultaDB) {
        return reply.status(401).send({ erro: "email nao existe" })
    }
    const igual = await bcrypt.compare(senha, consultaDB.senha)

    if (igual) {
        const token = jwt.sign (
            {id: consultaDB.id,
             nome: consultaDB.nome,
             empresaId: consultaDB.empresaId,
             role: consultaDB.role   
            },
            process.env.JWT_SECRET,
            {expiresIn: "15m"}
        )
        return reply.status(200).send({token: token})
    } else {
        return reply.status(401).send({
            erro: "senha incorreta"
        })
    }
}
