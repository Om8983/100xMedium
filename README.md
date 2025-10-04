# Blogging Website Setup

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. Clone the repository
2. Create `.env` files:

   - `backend-medium/.env`
   - `frontend/.env`

3. Run the application:

```bash
   docker-compose up --build

   Frontend: http://localhost:5173
Backend: http://localhost:8787
PostgreSQL: localhost:5432


DATABASE_URL="postgresql://postgres:postgres@postgre_db:5432/belog"
# Add other backend env variables

VITE_API_URL=http://localhost:8787
# Add other frontend env variables

To stop the docker container

docker-compose down