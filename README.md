# API + FRONT : Chat de mensagens e painel admin

![Telas do APP](https://github.com/JhemersonLucas/Chat-mongo-front/blob/master/telas-chat.png)

## Instalação

Clone o projeto ou faça download em sua máquina
``` 
git clone https://github.com/JhemersonLucas/Chat-mongo-front.git
```

### Backend

entre na pasta do backend e execute o comando **yarn**

``` 
cd Chat-mongo-font
cd backend
yarn
```

Agora os módulos foram baixados, você pode utilizar o banco de dados padrão ou colocar o link do seu banco de dados MongoDB
O link está localizado em ``` backend/.env```

- [x] Modules baixados
- [x] Banco de dados configurado

Agora execute o comando ``` yarn dev:server ``` para rodar o node e perceba
que ele retornará a mensagem ``` Server started on port 3333! ```

O node fará a contabilização dos usuários registrados e cadastrará novos usuários
caso o número seja menor que 117

para alterar esta variável ou desabilitar a função, basta ir na linha ``` [35] const minimo = 117;   ``` 
do arquivo **backend/src/app.ts**

### Frontend

faça o mesmo procedimento para a pasta frontend

``` 
cd ..
cd frontend
yarn
```

agora os modules foram baixados, basta executar o comando ``` yarn start ```

E o React irá executar na porta **3000***

### Rotas


``` 
localhost:3333/chat/login/:login [GET] - Permite acesso ao chat
caso não saiba o nome de um usuário, use 'Jhemerson' 
que a api retornará o primeiro usuário cadastrado no mongo
```

``` localhost:3333/chat [GET] - retorna um array com todos usuários cadastrados ```

``` 
localhost:3333/chat [POST] - Cadastra um novo usuário
recebe um json { login: string }  
```

``` localhost:3333/chat/:id [DELETE] - Deleta um usuário ```

``` 
localhost:3333/chat/messages [GET] - retorna um array com todos as mensagens cadastrados
filtros
?user=:id
?sorted:desc || null
?date:YYYY-MM-DD
```

``` 
localhost:3333/chat/messages [POST] - Registra uma nova mensagem
recebe um json { user: id, message: string } 
```

``` localhost:3333/chat/messages/:id [DELETE] - remove uma mensagem ```


**;)** 



