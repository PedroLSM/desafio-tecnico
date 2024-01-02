# Desafio Técnico

API REST e SPA Angular - Gerenciamento de Cidades/Clientes.

## 📋 Pré-Requisitos

SDKs necessária para abrir e compilar o projeto:

- .NET 6
- SQL Server
- Node.JS v14.20.0
- Angular v15
- Visual Studio 2022 (recomendado) e/ou VS Code

## 🔧 Compilação

Abrir e compilar pelo VS 2022 ou execute o comando CLI `dotnet build` para compilar a aplicação.

> O comando `dotnet build` pode demorar um pouco, pois, será instalado os pacotes da aplicação .NET e Angular.<br />
> Caso os pacotes Angular não tenham sido instalados, acesse [ClientApp](./DesafioApi/ClientApp/) e instale-os `npm install`.

## 🗃️ Migrations

Para criar o banco de dados basta executar o comando: <br />
`dotnet ef database update --project .\DesafioAPI\DesafioAPI.csproj`

## ⚙️ Executar

Após compilar e roda a migration é só executar a aplicação pelo VS 2022 ou rodar o comando: <br />

```bash
dotnet run --project .\DesafioAPI\DesafioAPI.csproj
```

A aplicação Angular será iniciada após acessar a URL da API no navegador.

## 🛠️ Tecnologias Utilizadas

- **.NET 6** - _Web Api, Swagger, SPA Proxy, Mediator, Entity Framework Core 6 com SQL Server_
- **Angular v15** - _Angular Material v15_

## ✒️ Autores

- **Pedro Lucas** - Desenvolvedor
