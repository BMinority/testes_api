# testes_api

## MODELO DE ROTAS PARA TESTES NO INSOMNIA

### Rota de Login
URL: http://localhost:3000/login
Método: POST
Body (JSON):

{
  "email": "seu_email@example.com",
  "senha": "sua_senha"
}

##

### Rota de Cadastro de Usuário
URL: http://localhost:3000/usuarios
Método: POST
Body (JSON):

{
  "nome": "Seu Nome",
  "email": "seu_email@example.com",
  "senha": "sua_senha"
}

##

### Rota para Listar Categorias
URL: http://localhost:3000/categorias
Método: GET
Headers:

{
  "Authorization": "Bearer seu_token"
}

##

### Rota para Listar Transações
URL: http://localhost:3000/transacoes
Método: GET
Headers:

{
  "Authorization": "Bearer seu_token"
}

##

### Rota para Obter Transação por ID
URL: http://localhost:3000/transacoes/:id
Método: GET
Headers:

{
  "Authorization": "Bearer seu_token"
}
Substitua :id pelo ID da transação que você deseja obter.

##

### Rota para Cadastrar Transação
URL: http://localhost:3000/transacoes
Método: POST
Headers:

{
  "Authorization": "Bearer seu_token"
}

Body (JSON):

{
  "tipo": "entrada",
  "descricao": "Salário",
  "valor": 3000,
  "data": "2023-06-01",
  "categoria_id": 1
}

##

### Rota para Atualizar Transação
URL: http://localhost:3000/transacoes/:id
Método: PUT
Headers:

{
  "Authorization": "Bearer seu_token"
}

Body (JSON):

{
  "tipo": "entrada",
  "descricao": "Salário atualizado",
  "valor": 3500,
  "data": "2023-06-01",
  "categoria_id": 1
}
Substitua :id pelo ID da transação que você deseja atualizar.

##

### Rota para Deletar Transação
URL: http://localhost:3000/transacoes/:id
Método: DELETE
Headers:

{
  "Authorization": "Bearer seu_token"
}