# Rotas da Jira API

OBS: a apresentação das rotas está organizada dessa forma:

Verbo HTTP - Endpoint

## Auth

#### Rota de registro

- `POST` - `api/v1/register`

#### Rota de login

- `POST` - `api/v1/login`

#### Rota de logout

- `POST` - `api/v1/logout`

#### Rota de alteração de senha

- `PUT` - `api/v1/changePwd`

## Project

#### Rota que obter listas de um projeto com base no projectId

- `GET` - `api/v1/:projectId/lists`

#### Rota que obter issues de um projeto com base no projectId

- `GET` - `api/v1/:projectId/issues`

#### Rota que obter membros de um projeto com base no projectId

- `GET` - `api/v1/:projectId/members`

#### Rota que obter um projeto com base no projectId

- `GET` - `api/v1/:projectId`

#### Rota que altera dados de um projeto com base no projectId

- `PUT` - `api/v1/:projectId`

#### Rota que deleta um projeto com base no projectId

- `DELETE` - `api/v1/:projectId/delete`

#### Rota que remove um User do projeto com base no projectId

- `DELETE` - `api/v1/:projectId/leave`

#### Rota de criação de projeto

- `POST` - `api/v1/create`

## User

#### Rota que obtém dados de um Usuário

- `GET` - `api/v1/authUser`

#### Rota que atualiza dados de um Usuário

- `PATCH` - `api/v1/authUser/update`

#### Rota que deleta um Usuário

- `POST` - `api/v1/authUser/delete`

#### Rota que obtém usuários 

- `GET` - `api/v1/search`

#### Rota que obtém projetos de um Usuário com base no userId

- `GET` - `api/v1/:userId/projects`

#### Rota que obtém dados de um Usuário com base no userId

- `GET` - `api/v1/:userId`

## Member

#### Rota que adiciona um Member a um Projeto

- `PUT` - `api/v1/add`

#### Rota que remove um Member de um Projeto

- `DELETE` - `api/v1/remove`

## List

#### Rota de criação de uma List

- `POST` - `api/v1/create`

#### Rota que deleta uma List com base no listId

- `DELETE` - `api/v1/:id/delete`

#### Rota que atualiza uma List com base no listId

- `PATCH` - `api/v1/:id/update`

#### Rota que reorganiza uma List

- `PUT` - `api/v1/reorder`

## Issue

#### Rota que retorna Comments de uma Issue com base no issueId

- `GET` - `api/v1/:issueId/comments`

#### Rota que reorganiza Issues

- `PUT` - `api/v1/reorder`

#### Rota de criação de uma Issue

- `POST` - `api/v1/create`

#### Rota que atualiza uma Issue com base no issueId 

- `PATCH` - `api/v1/:id/update`

#### Rota que deleta uma Issue com base no issueId

- `DELETE` - `api/v1/:id/delete`

## Comment

#### Rota de criação de um Comment

- `POST` - `api/v1/create`

#### Rota que deleta um Comment com base no commentId

- `DELETE` - `api/v1/:id/delete`