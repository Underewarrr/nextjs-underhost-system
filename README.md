
# UnderHost System em desenvolvimento

Este é um projeto de Sistema de Gerenciamento de Maquina virtual desenvolvido com Next.js. O projeto utiliza Prisma para gerenciamento de banco de dados e várias bibliotecas como Bootstrap, JWT, Mercado Pago, entre outras, para fornecer funcionalidades completas de autenticação, gestão de usuários e solicitações de VPS.

## Funcionalidades

- **Autenticação de Usuário**: Registro, login e gerenciamento de sessão com tokens JWT.
- **Gerenciamento de Usuários**: Armazenamento seguro de senhas com bcrypt, e-mails únicos para cada usuário.
- **Solicitações de VPS**: Os usuários podem solicitar VPS com configurações personalizadas, como número de cores, memória, armazenamento, etc.
- **Pagamentos**: Integração com Mercado Pago para gerenciar pagamentos de VPS.

## Funcionalidades em desenvolvimento
- **Configuração de maquina virtual**: Usando NodeJS para connectar ao OracleVM e Instanciar uma maquina após a conclusão do pagamento.

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização no lado do servidor.
- **Prisma**: ORM para gerenciamento de banco de dados PostgreSQL.
- **PostgreSQL**: Banco de dados relacional utilizado no projeto.
- **Bootstrap**: Framework CSS para design responsivo.
- **JWT**: Gerenciamento de autenticação segura.
- **Mercado Pago**: Integração de pagamento para VPS.

## APIs no Backend

As seguintes rotas de API estão disponíveis no backend:

- `api/admin/user`: Gerenciamento de usuários pelo administrador.
- `api/user/login`: Autenticação de usuário (login).
- `api/user/register`: Registro de novos usuários.
- `api/user/user`: Obtenção de dados do usuário autenticado.
- `api/vps/id`: Consulta de informações de um VPS específico.
- `api/vps/compdownload`: Download de componentes de VPS.
- `api/vps/deleteUnpaid`: Exclusão de VPS não pagos.
- `api/vps/orders`: Gerenciamento de pedidos de VPS.

## Instalação e Configuração

### Pré-requisitos

- Node.js
- PostgreSQL

### Passos para Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/nextjs-login-system.git
   cd nextjs-login-system
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na raiz do projeto e adicione suas configurações:

   ```
   DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
   JWT_SECRET=sua_chave_secreta
   MERCADOPAGO_ACCESS_TOKEN=seu_token_de_acesso
   ```

4. Execute as migrações do banco de dados:
   ```bash
   npm run migrate
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

### Scripts Disponíveis

- `dev`: Inicia o servidor de desenvolvimento.
- `build`: Cria a build de produção.
- `start`: Inicia o servidor em modo de produção.
- `lint`: Executa o linter para verificar erros de código.
- `dbreset`: Reseta o banco de dados e aplica migrações.
- `migrate`: Aplica as migrações do banco de dados.
- `dbmanage`: Abre a interface de gerenciamento do banco de dados com Prisma Studio.

## Estrutura do Projeto

- **next.config.js**: Configurações do Next.js para ignorar o ESLint durante a build de produção.
- **tsconfig.json**: Configurações do TypeScript para o projeto.
- **schema.prisma**: Definições do modelo de dados utilizando Prisma.

### Modelos do Prisma

- **User**: Modelo para gerenciamento de usuários.
- **VPSRequest**: Modelo para solicitações de VPS.
- **Payment**: Modelo para gerenciamento de pagamentos.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
