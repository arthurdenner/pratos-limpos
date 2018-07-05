# Pratos Limpos

## Descrição

Projeto para auxiliar no controle de gastos e avaliação da merenda escolar oferecida pelas escolas públicas. Os alunos avaliam as merendas ofertadas em suas escolas diariamente e o governo pode visualizar as avaliações e analisar se o dinheiro enviado para as escolas está sendo bem gasto.

O projeto foi construído como forma de avaliação para algumas disciplinas do 7º período de Sistemas de Informação do Instituto Federal de Alagoas e foi supervisionado pelos professores das disciplinas em questão.

## Estrutura do projeto

Há duas pastas no repositório: `mobile` e `server`.

A pasta `mobile` contém um aplicativo usado pelos alunos para realizar as avaliações diárias e a pasta `server` contém um simples servidor feito que recebe o link para os dados abertos mais atualizados do governo e atualiza a lista de escolas no back-end e recebe requisições do aplicativo mobile na busca de escolas nos momentos de cadastro e edição de perfil.

## Tecnologias usadas

O aplicativo mobile foi feito com Ionic e o servidor com Node.js. Como solução no back-end, foi utilizado o Firebase, fazendo uso de seus módelos de autenticação e real-time database.

## Configuração local do projeto

Após criar seu fork do projeto, para rodá-lo localmente basta realizar os comandos abaixo:

```bash
cd mobile
npm install ou yarn
npm run serve ou yarn serve

cd ../server
npm install ou yarn
npm run dev ou yarn dev
```
