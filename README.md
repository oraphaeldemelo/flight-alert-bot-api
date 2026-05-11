# Flight Alert Bot API

## 📌 Sobre o projeto

O **Flight Alert Bot API** é uma aplicação backend desenvolvida em Node.js com NestJS, cujo objetivo é permitir o monitoramento automatizado de preços de passagens aéreas através de um bot no Telegram.

O usuário pode interagir diretamente com o bot para:

* cadastrar alertas de voo
* listar alertas ativos
* remover alertas
* consultar preços de passagens
* receber notificações automáticas de queda de preço

Atualmente o projeto utiliza um provider fake/simulado de voos para fins de estudo e desenvolvimento arquitetural, permitindo evoluir o sistema sem depender inicialmente de APIs externas pagas.

---

# 🚀 Funcionalidades

## ✅ Implementadas

* Integração com bot do Telegram
* Cadastro automático de usuários
* Criação de alertas de passagens
* Listagem de alertas
* Remoção de alertas
* Consulta manual de preços
* Scheduler automático para monitoramento
* Notificações automáticas via Telegram
* Persistência em PostgreSQL
* Tratamento padronizado de erros
* Arquitetura desacoplada via Ports & Adapters

---

# 🤖 Como utilizar o bot

## 1. Buscar o bot no Telegram

No Telegram, pesquise por:

```txt
@flight_alert_raphael_bot
```
---

## 2. Iniciar o bot

Envie:

```txt
/start
```

---

## 3. Comandos disponíveis

### ➕ Adicionar alerta

```txt
/adicionar FOR LIS 2026-10-10 3000
```

Formato:

```txt
/adicionar ORIGEM DESTINO DATA PRECO_ALVO
```

Exemplo:

```txt
/adicionar FOR MIA 2026-12-15 2500
```

---

### 📋 Listar alertas

```txt
/listar
```

---

### ❌ Remover alerta

```txt
/remover ID_DO_ALERTA
```

---

### 🔎 Consultar preços manualmente

```txt
/consultar FOR LIS 2026-10-10
```

---

# 🧱 Arquitetura do projeto

O projeto foi desenvolvido seguindo princípios de:

* Clean Architecture
* Domain-Driven Design
* Arquitetura Hexagonal (Ports & Adapters)
* princípios SOLID

---

# 📂 Estrutura de pastas

```txt
src/
├── domain/
├── application/
├── infra/
├── interfaces/
└── shared/
```

---

## 📌 Domain

Contém as regras centrais do negócio:

* Entities
* Repository contracts
* Regras de validação
* Regras de domínio

Exemplo:

```txt
FlightAlert
User
FlightAlertRepository
UserRepository
```

---

## 📌 Application

Contém os casos de uso da aplicação.

Exemplo:

```txt
CreateFlightAlertUseCase
ListFlightAlertsUseCase
RemoveFlightAlertUseCase
SearchFlightPriceUseCase
CheckFlightPricesUseCase
```

---

## 📌 Infrastructure

Contém implementações técnicas e integrações externas.

Exemplo:

```txt
Prisma
Scheduler
Flight Providers
Notification Adapters
```

---

## 📌 Interfaces

Contém entradas da aplicação:

* HTTP Controllers
* Telegram Commands
* Parsers
* Presenters

---

# 🧩 Padrões de projeto utilizados

## Repository Pattern

Abstração da persistência de dados.

```txt
FlightAlertRepository
UserRepository
```

---

## Adapter Pattern

Integração desacoplada com tecnologias externas.

Exemplo:

```txt
FakeFlightProviderAdapter
TelegramNotificationAdapter
PrismaFlightAlertRepository
```

---

## Use Case Pattern

Cada funcionalidade principal é encapsulada em uma classe específica.

Exemplo:

```txt
CreateFlightAlertUseCase
CheckFlightPricesUseCase
```

---

## Presenter Pattern

Responsável por formatar respostas para o Telegram.

---

## Parser Pattern

Responsável por interpretar comandos enviados pelo usuário.

---

# ⚙️ Tecnologias utilizadas

## Backend

* Node.js
* NestJS
* TypeScript

---

## Banco de dados

* PostgreSQL
* Prisma

---

## Bot Telegram

* Telegraf
* nestjs-telegraf

---

## Scheduler

* @nestjs/schedule

---

## Validação

* class-validator
* class-transformer

---

# 🔄 Fluxo geral da aplicação

```txt
Telegram
↓
Command Handler
↓
Use Case
↓
Entity / Domain
↓
Repository Port
↓
Repository Adapter
↓
PostgreSQL
```

Fluxo automático:

```txt
Scheduler
↓
CheckFlightPricesUseCase
↓
FlightProviderPort
↓
FakeFlightProviderAdapter
↓
NotificationPort
↓
TelegramNotificationAdapter
↓
Telegram
```

---

# 🧪 Ambiente de desenvolvimento

## PARA USO LOCAL

## Instalar dependências

```bash
npm install
```

---

## Configurar variáveis de ambiente

Criar arquivo `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/flight_alert_bot"

TELEGRAM_BOT_TOKEN="SEU_TOKEN_DO_BOT"
```

---

## Gerar Prisma Client

```bash
npx prisma generate
```

---

## Executar migrations

```bash
npx prisma migrate dev
```

---

## Rodar projeto

```bash
npm run start:dev
```
````md
## 🐳 PARA USO COM Docker

## 1. Create the `.env` file

Create a `.env` file in the project root:

```env
TELEGRAM_BOT_TOKEN="YOUR_TELEGRAM_BOT_TOKEN"
````

> The PostgreSQL connection used inside Docker is already configured in the `docker-compose.yml`.

---

## 2. Build and start the containers

```bash
docker compose up --build
```

Run in background mode:

```bash
docker compose up -d --build
```

---

## 3. View application logs

```bash
docker compose logs -f app
```

View PostgreSQL logs:

```bash
docker compose logs -f postgres
```

---

## 4. Stop containers

```bash
docker compose down
```

Stop and remove PostgreSQL volume:

```bash
docker compose down -v
```

> Warning: this will remove all database data.

---

## 5. Project services

The Docker environment includes:

* NestJS API
* PostgreSQL database
* Prisma ORM
* Telegram Bot integration
* Automatic database migrations

---

## 6. Default ports

| Service    | Port   |
| ---------- | ------ |
| API        | `3000` |
| PostgreSQL | `5432` |


## 7. Useful commands

Rebuild containers:

```bash
docker compose up --build
```

Restart containers:

```bash
docker compose restart
```

Remove stopped containers:

```bash
docker compose rm
```

Open terminal inside API container:

```bash
docker exec -it flight-alert-api sh
```

Open PostgreSQL terminal:

```bash
docker exec -it flight-alert-postgres psql -U flight_user -d flight_alert_db
```

```
```

---

# 📌 Roadmap futuro

* Integração com APIs reais de passagens
* Histórico de preços
* Múltiplos providers de voo
* Dashboard Web
* Sistema de autenticação
* Cache com Redis
* Filas assíncronas
* Dockerização
* Deploy em cloud
* Observabilidade e métricas
* Testes automatizados

---

# 🎯 Objetivo do projeto

Além da funcionalidade prática, o projeto foi criado com foco em:

* estudo de arquitetura de software
* aplicação prática de SOLID
* uso de Clean Architecture
* integração com APIs externas
* automação com bots
* desenvolvimento backend profissional com NestJS
