<h1 align="center">
     ♻️ <a href="#" alt="API Recipes "> DMAPI </a>
</h1>

<h3 align="center">
    🌱 Proporciona acesso a diversas receitas à partir do envio de ingredientes.
</h3>

<h4 align="center">
	🚧   Em testes 🚀 🚧
</h4>

Tabela de conteúdos
=================
<!--ts-->
   * [Sobre o projeto](#-sobre-o-projeto)
   * [Funcionalidades](#-funcionalidades)
   * [Como executar o projeto](#-como-executar-o-projeto)
     * [Pré-requisitos](#pré-requisitos)
     * [Rodando o Backend (servidor)](#user-content--rodando-o-backend-servidor)
   * [Tecnologias](#-tecnologias)
     * [Server](#user-content-server--nodejs----typescript)
   * [Contribuidores](#-contribuidores)
   * [Como contribuir no projeto](#-como-contribuir-no-projeto)
   * [Autor](#-autor)
   * [Licença](#user-content--licença)
<!--te-->


## 💻 Sobre o projeto

♻️ DMAPI - é uma forma de ter acesso a diversas receitas passando de 1 até 3 ingredientes de livre escolha.


---


## ⚙️ Funcionalidades

- [x] Aplicações Frontend de qualquer tecnologia podem acessar o endpoint da API e acessar as informações sobre receitas:
  - [x] Todas as receitas com pelo menos um dos ngredientes informados
  - [x] Link para receita no site de origem
  - [x] e um link para um gif animado referente a cada receita acessada. 

---

## 🚀 Como executar o projeto

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 

#### 🎲 Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone git@github.com:pesabreu/dmapi.git
# ou
$ git clone https://github.com/pesabreu/dmapi.git

# Acesse a pasta do projeto no terminal/cmd
$ cd dmapi

# Faça um Pull da imagem mais recente do NodeJS
$ docker pull node

# Crie a imagem da aplicação DMAPI
$ docker build -t dmapi/node:latest .

# Inicialize um Container Docker para rodar a aplicação DMAPI
$docker run -d -p 3636:3636 --name dmapi_001 dmapi/node

# O servidor inciará na porta:3636 - acesse http://localhost:3636/recipes?i=ingrediente1,[ingrediente2],[ingrediente3] 
# A Porta de acesso ao endpoint da API pode ser configurada direto na aplicação(arquivo .env) ou na imagem Docker no arquivo Dockerfile  
#

---

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

#### [](https://github.com/pesabreu/dmapi#server-nodejs)**Server**  ([NodeJS](https://nodejs.org/en/))

-   **[Express](https://expressjs.com/)**
-   **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
-   **[dotENV](https://github.com/motdotla/dotenv)**

> Veja o arquivo  [package.json](https://github.com/pesabreu/dmapi/package.json)

---

## 👨‍💻 Contribuidores

 N/A.

## 💪 Como contribuir no projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`
4. Envie as suas alterações: `git push origin my-feature`
> Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](./CONTRIBUTING.md)

---

## 🦸 Autor

<a href="https://pesabreu.com/">
  <sub><b>Paulo E S Abreu</b></sub>
</a>

<a href="https://pesabreu.com/" title="Pesabreu WMS"></a>
<br />

---

## 📝 Licença

Este projeto esta sobe a licença [MIT](./LICENSE).

Feito por Paulo Abreu 👋🏽 [Entre em contato!](https://www.linkedin.com/in/paulo-emilio-dos-santos-abreu-43738b25/)

---

##  Versões do README

[Português 🇧🇷](./README.md)  | [Portugues sem logo  🇧🇷](./README-sem-logo.md) 
