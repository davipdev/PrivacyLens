    import { regras } from "../regras/regrasPrivacidade.js"
    import { identificarCat } from "../utils/urlservico.js"
    
    const historicoConsultas = []
    
    export async function avaliarURL(request , reply) {
       const { url, dados_solicitados } = request.body
       
       const servico = identificarCat(url)
       const regra = regras[servico]

       if (!regra) {
        return reply.status(400).send({
            success: false,
            error: "URL errada ou inexistente."
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
    }