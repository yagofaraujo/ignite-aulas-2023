# ignite-nodejs-2023

## 02-api-rest-nodejs

### Nomenclaturas:
- Cookies: formas da gente manter contexto entra requisições
  - Forma de identificar que é um mesmo usuário que está acessando a aplicação
    - Ex: deixo um cookie no navegador de cada usuário. Desta forma, consigo identificar que todas operações feitas na aplicação através daquele navegador é específico daquele usuário.
### Decisões:
- ZOD: Aparentemente, possui uma integração melhor com o typescript que outras bibliotecas (joi e yup, por exemplo)
- VITEST: É mais simples de instalar (não precisa usar babel e fazer outras configurações para usar da maneira mais adequada). Também é muito mais rápido de executar os testes, pois usa esbuild, um bundler extremamente eficiente e performático.

### Comandos úteis:
* Criação do projeto
  * `npm  init -y` -> Cria o projeto node (cria o arquivo package.json) com "yes" para todas as respostas
  * `npx tsc --init` -> Cria o projeto typescript (cria o tsconfig.json)
* Passar algum parâmetro para um binário do node via npm
  * No exemplo abaixo, o parâmetro seria aplicado ao npm, e não ao binário
    * ex: `npm run knex -h`
  * A maneira correta de usar é aplicando um "--" antes do parâmetro
    * ex: `npm run knex -- -h`
      * Desta maneira, o parâmetro "-h" é repassado ao _**"knex"**_ e não ao _**"npm"**_ 
* Usar uma função do node para executar comandos no terminal - Exec e ExecSync
  * import { execSync } from 'node:child_process'
  * Exemplo: execSync('npm run dev') 
* PRISMA
  * `npx prisma init` -> inicia um projeto prisma na aplicação
  * `npx prisma generate` -> Cria a tipagem do schema definido
  * `npx prisma migrate dev` -> Roda as migrations que estão pendentes de serem executadas em ambiente de desenvolvimento
    * Esse comando procura por novas alterações no schema
    * Se ele achar alguma alteração, o prima considera que foi criada uma nova migration e irá pedir um nome para ela 
  * `npx prisma studio` -> Abre uma "ide" de banco no navegador (nativo do próprio prisma)
 

#### KNEX

##### Atenção!
>Para rodar o knex com typescript, é indicado criar um script para rodar o binário do knex de maneira mais simples:
ex: `"knex": "node --no-warnings --loader tsx ./node_modules/.bin/knex"`

* Criar uma nova migration:
  * `npm run knex -- migrate:make {NOME_DA_MIGRATION}`
* Rodar migrations: 
  * `npm run knex -- migrate:latest`
* Reverter migration:
  * `npm run knex -- migrate:rollback`