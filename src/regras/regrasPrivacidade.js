export const regras = {
   
    "ecommerce": {
        "nessesario": ["email", "senha(caso-haja-conta)", "nome", "endereço_de_entrega", "telefone", "dados_de_pagementos", "logs_acesso", "IP"],
        "talvez": ["cpf", "data_nascimento", "localização_aproximada", "historico_de_compras"],
        "abusivo": ["cpf_para_navegaçao", "profissão", "renda_mensal", "acesso_a_camera", "nome_da_mãe"],
        "pesoErro": 15
    }
}