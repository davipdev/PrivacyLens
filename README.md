# PrivacyLens 

> Analisador de privacidade de sites: escaneia os formulários de uma página, classifica os dados que ela pede e gera um **score de privacidade** com alertas de risco — tudo num dashboard multiempresa.


![Demonstração do PrivacyLens](./docs/demo.gif)


**Demo ao vivo:** _em breve_ &nbsp;•&nbsp;

**Repositório:** [github.com/davipdev/PrivacyLens](#)

---

## Sobre o projeto

Muitos sites coletam **mais dados do que precisam** para funcionar. O PrivaKey ajuda a enxergar isso: você informa a URL de uma página, e o sistema escaneia os campos de formulário que ela pede, classifica cada um (necessário / talvez / abusivo) e calcula um **score de 0 a 100** com o nível de risco.

É um projeto **full-stack** construído para aprofundar autenticação, modelagem de dados relacional e arquitetura cliente-servidor. O tema conversa diretamente com pautas de **privacidade e LGPD/GDPR**.

## Funcionalidades

**Autenticação com JWT** — cadastro, login e rotas protegidas por middleware
**Multiempresa (multi-tenant)** — cada usuário pertence a uma empresa; dados isolados por empresa, com papéis (`admin` / `usuario`) e código de convite
**Análise de URL** — escaneia os formulários da página, classifica os campos e pontua o risco
**Dashboard em tempo real** — score geral, métricas, distribuição de risco, ranking de sites suspeitos e histórico (que se atualiza sozinho após cada análise)
**Sessão** — token guardado no cliente e enviado nas requisições protegidas; logout que encerra a sessão

## Stack

 Camada | Tecnologias 

 **Frontend** | Next.js (App Router), React, Tailwind CSS 
 
 **Backend** | Node.js, Fastify, Prisma ORM 
 
 **Banco** | PostgreSQL 
 
 **Auth & outros** | JWT (jsonwebtoken), bcrypt, Cheerio (scraping de HTML) 

## Como funciona?

** Fluxo de autenticação**
```
Login  →  backend valida e assina um JWT  →  cliente guarda o token
       →  envia "Authorization: Bearer <token>" nas rotas protegidas
       →  middleware verifica o token a cada requisição
```

** Fluxo de análise (`POST /avaliar`)**
```
URL  →  Cheerio busca o HTML e extrai os campos de formulário
     →  cada campo é classificado (necessário / talvez / abusivo)
     →  score começa em 100 e cai conforme o risco
     →  resultado é salvo no histórico e o dashboard reflete
```

**Regra de pontuação**
- Cada campo *talvez*: **−2 pontos**
- Cada campo *abusivo*: **−20 pontos**
- Níveis: `crítico` (<40) · `alto` (<70) · `médio` (<90) · `baixo` (≥90)

## Modelo de dados

- **Empresa** — `nome`, `codigo` (único), e relações com usuários e consultas
- **Usuário** — `nome`, `email` (único), `senha` (hash), `role`, vínculo com a empresa
- **HistóricoConsultas** — `urlsite`, `categoria`, `scoresite`, `nivel` (enum), `datahora`, vínculos com empresa e usuário

## Rodando localmente

## Pré-requisitos: **Node.js**, **PostgreSQL** e uma instância de banco criada.

## 1. Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env` na pasta `backend/`:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/privakey"
JWT_SECRET="uma_chave_secreta_bem_aleatoria"
```

Rode as migrações e suba o servidor (porta **3500**):

```bash
npm run db:migrate
npm start
```

## 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse **http://localhost:3000**.

## Endpoints principais

| Método | Rota | Protegida | Descrição |

| `POST` | `/register` |   Cria usuário (e empresa, se não houver código) 

| `POST` | `/login` |   Autentica e retorna o JWT 

| `POST` | `/avaliar` |   Analisa uma URL e salva o resultado 

| `GET`  | `/admin/dashboard` |   Métricas e dados agregados da empresa 

| `GET`  | `/historico` |   Histórico de análises da empresa 

## Limitações conhecidas e próximos passos

Este é um projeto de estudo / prova de conceito. A análise é **heurística** e tem limites conhecidos — assumi-los faz parte:

- **Só lê o HTML estático.** O scanner usa Cheerio e não executa JavaScript, então sites que renderizam formulários no cliente (SPAs) podem não ser lidos por completo.
- **Falsos positivos.** Sites como o GitHub podem aparecer como "crítico", porque o scanner conta campos técnicos de formulário (tokens CSRF, honeypots, busca) como se fossem dados pessoais, e classifica qualquer campo desconhecido como abusivo.
- **Regras simples.** A classificação usa uma lista fixa e correspondência exata, o que não cobre variações de nome de campo.
- **Segurança.** O token fica no `localStorage` (exposto a XSS) e o endpoint de análise busca URLs arbitrárias no servidor (risco de SSRF). Adequado para demo; não para produção.

**Melhorias planejadas:**
- Análise com navegador headless (Playwright) para capturar cookies, trackers e requisições de rede reais
- Ignorar campos técnicos e melhorar a detecção de categoria do site
- Cookie `httpOnly` + refresh token no lugar do `localStorage`
- Limpeza de parâmetros de tracking (UTM) das URLs salvas

Feito por **Davi Oliveira** — [LinkedIn](https://www.linkedin.com/in/davi-oliveira-72a862351) · [Github](https://gitHub.com/davipdev)
