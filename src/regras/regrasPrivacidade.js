export const regras = {
    adulto: {
        nessesario: ["data_nascimento", "dados_tecnicos_basicos"],
        talvez: ["cartão_credito", "nome/usuario", "pais", "idioma", "recomendaçoes", "fuso_horario"],
        abusivo: ["endereço", "nome_mãe", "cpf", "rg", "biometria_facial"]
    },
    ecommerce: {
        nessesario: ["email", "senha(caso-haja-conta)", "nome", "endereço_de_entrega", "telefone", "dados_de_pagementos", "logs_acesso", "IP"],
        talvez: ["cpf", "data_nascimento", "localização_aproximada", "historico_de_compras"],
        abusivo: ["cpf_para_navegaçao", "profissão", "renda_mensal", "acesso_a_camera", "nome_da_mãe"]
    },
    utilitarios: {
        nessesario: ["dados_tecnicos_basicos", "IP"],
        talvez: ["email", "nome"],
        abusivo: ["localização_aproximada", "cpf", "nome_da_mãe"]
    },
    desconhecido: {
        nessesario: ["dados_tecnicos_basicos"],
        talvez: ["email"],
        abusivo: ["cpf", "rg", "biometria_facial", "nome_da_mãe"]
    }
}