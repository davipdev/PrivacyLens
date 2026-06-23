    import { regras } from "../regras/regrasPrivacidade.js"
    import { identificarCat } from "../utils/urlservico.js"
    import { escanearURL } from "./escanerController.js"
    import prisma from "../database/prisma.js"
    
    export async function avaliarURL(request , reply) {
       const { url } = request.body
       
       console.log(url)

       const {id: usuarioId, empresaId } = request.user
       const servico = identificarCat(url) || "ecommerce"
       const regra = regras[servico] || regras["ecommerce"]

       if (!regra) {
        return reply.status(400).send({
            success: false,
            error: "URL errada ou inexistente."
        })
       }

       const escaneamento = await escanearURL(url)

       if (escaneamento.erro) {
        return reply.status(422).send({
            success: false,
            error: "nao foi possivel escanear"
        })
       }
       const dados_solicitados = escaneamento.inputs.map(input => input.name)
       
       let nessesario = []
       let talvez = []
       let abusivo = []

       for (let dado of dados_solicitados) {

        dado = dado.toLowerCase().trim()

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
    if (score < 0 ) score = 0
      
    let nivelrisco = "baixo"
    if (score < 40) {
        nivelrisco = "critico"
    } else if (score < 70) {
        nivelrisco = "alto"
    } else if (score < 90) {
        nivelrisco = "medio"
    }

     const Novaconsulta = await prisma.historicoConsultas.create({
        data:{
            urlsite: url,
            categoria: servico,
            scoresite: score,
            nivel: nivelrisco,
            datahora: new Date(),
            usuarioId: Number(usuarioId),
            empresaId: Number(empresaId)
        }
    })
    let resultadoFiltrado = {}
        if (nessesario.length > 0) resultadoFiltrado.nessesario = nessesario
        if (talvez.length > 0) resultadoFiltrado.talvez = talvez
        if (abusivo.length > 0) resultadoFiltrado.abusivo = abusivo

        return reply.status(200).send({
            success: true,
            consulta_id: Novaconsulta.id,
            categoria_detectada: servico,
            score_privacidade: score,
            nivel_risco: nivelrisco,
            resultado: resultadoFiltrado
        })
    }
    export async function dashboard(request, reply) {
        
        const historicoConsultas = await prisma.historicoConsultas.findMany()

        const totalconsultas = historicoConsultas.length

        const somascore = historicoConsultas.reduce((acumulado, consultaAtual) => acumulado + consultaAtual.scoresite, 0 )
        const scoregeral = totalconsultas > 0 ? Math.round(somascore / totalconsultas) : 100

        const criticos = historicoConsultas.filter(consultaAtual => consultaAtual.nivel === "critico").length
        const altos = historicoConsultas.filter(consultaAtual => consultaAtual.nivel === "alto").length
        const medios = historicoConsultas.filter(consultaAtual => consultaAtual.nivel === "medio").length
        const baixos = historicoConsultas.filter(consultaAtual => consultaAtual.nivel === "baixo").length

        const sitessuspeitos = historicoConsultas.filter(consultaAtual => consultaAtual.scoresite < 70).map(consultaAtual => consultaAtual.urlsite)

        const admin = request.user?.nome || "administrador"

        return reply.status(200).send({
            success: true,
            mensagem: `painel de admin ${admin}`,
            scoreGeral: scoregeral,
            metrica: {
                total: totalconsultas,
                alertasCriticos: criticos,
                alertasAltos: altos,
                alertasMedios: medios,
                alertasBaixos: baixos
            },
            ranking: [...new Set(sitessuspeitos)],
            logs: historicoConsultas
        })
        }   