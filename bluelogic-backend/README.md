<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# API RESTful para Gerenciamento de Itens

## Description

Este projeto é uma API RESTful simples desenvolvida com **NestJS** e **TypeScript**, que permite gerenciar itens. A API oferece operações básicas para criar, ler, atualizar e excluir itens.

### Instalação

1. Clone este repositório:
   ```bash
   git clone https://github.com/rodinogueira/bluelogic-sistemas-teste-desenvolvedor.git
   cd bluelogic-sistemas-teste-desenvolvedor/bluelogic-backend

## Project Setup
Antes de começar, você precisa ter o Node.js e o npm instalados. Se você não os tem, clique [aqui](https://nodejs.org/) para instalá-los.

Instale as dependências do projeto:

```bash
$ npm install
```

Compile and run the project:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```
Open [http://localhost:3003](http://localhost:3003).

## Endpoints

A API possui os seguintes endpoints:

### 1. Criar um Novo Item
- **POST /items**
- **Request Body**:
  ```json
  {
    "name": "Nome do item",
    "description": "Descrição do item"
  }

### 2. Listar Todos os Itens
- **GET /items**
- **Response:**
  ```json
  [
    {
      "name": "Nome do item",
      "description": "Descrição do item"
    },
    ...
  ]
  ```

### 3. Obter um Item Específico
- **GET /items/{id}**
- **Response:**
  ```json
  {
    "id": "uuid",
  }

### 4. Atualizar um Item Existente
- **PUT /items/{id}**
- **Request Body:**
  ```json
  {
    "id": "uuid",
    "name": "Novo nome do item",
    "description": "Nova descrição do item"
  }

### 5. Excluir um Item
- **DELETE /items/{id}**
- **Response:**
  ```json
  {
    "id": "uuid",
  }
  ```