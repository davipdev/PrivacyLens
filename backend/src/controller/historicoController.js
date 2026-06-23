import prisma from "../database/prisma.js"

export async function ListaHistorico(request, reply) {
    try {
        const { empresaId } = request.user 

        const historico = await prisma.historicoConsultas.findMany({
            where: {
                empresaId: empresaId
            },
            orderBy: {
                datahora: "desc"
            }
        })
        return reply.status(200).send({
            success: true, historico
        })
    } catch (error) {
        console.error(error)
        return reply.status(500).send({
            erro: "erro ao buscar historico!"
        })
    }
}