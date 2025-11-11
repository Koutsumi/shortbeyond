# 🎯 shortbeyond
Curso de Teste de API com Playwright
Este repositório contém os exercícios e exemplos desenvolvidos durante o bootcamp "Playwright Além da Interface" da TestBeyond. O foco é a automação de testes end-to-end com APIs REST utilizando Playwright, JavaScript/TypeScript e PostgreSQL.

## 🚀 Tecnologias e Ferramentas Utilizadas
- Playwright – Framework de testes end-to-end
- TypeScript – Tipagem estática para JavaScript
- PostgreSQL (pg) – Integração com banco de dados relacional
- dotenv – Gerenciamento de variáveis de ambiente
- Faker.js – Geração de dados fake para testes
- @playwright/test – Test runner oficial do Playwright
- @types/node / @types/pg – Tipagens para Node.js e PostgreSQL

## ⚙️ Instalação e Execução
- Clone o repositório
```shell
git clone https://github.com/Koutsumi/shortbeyond.git
cd shortbeyond
```
- Instale as dependências
```shell
npm install
```
- Configure o ambiente
- Copie o arquivo .env.example para .env e preencha com suas variáveis (ex: conexão com banco de dados)
- Execute os testes
```shell
npx playwright test
```

## 📚 Objetivos do Projeto
- Automatizar testes de APIs REST sem depender da interface gráfica
- Validar respostas, status codes e persistência em banco de dados
- Simular cenários reais com dados dinâmicos usando Faker
- Aprender boas práticas de testes com Playwright e TypeScript

## 👩‍💻 Autoria
Projeto desenvolvido por Fernanda Matuda Baccarini durante o bootcamp da TestBeyond.
Coordenação: Fernanda Papito
