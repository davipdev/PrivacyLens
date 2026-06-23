import * as cheerio from "cheerio"

export async function escanearURL(url) {
    try {
        const response = await fetch(url, {
            headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
        })

        const htmlint = await response.text()

        const $ = cheerio.load(htmlint)

        const resultado = []

        $("form input").each((index, elemento) => {
            const nome = $(elemento).attr("name")
            const tipo = $(elemento).attr("type") || "text"

            if (nome) {
            resultado.push({
                name:nome,
                type:tipo
            })
            }
        })
         
        return {
            url, 
            total: resultado.length,
            inputs: resultado
        } 
    }   catch (error) {
            return {erro: "nao consegui ler o html"}
        }
}