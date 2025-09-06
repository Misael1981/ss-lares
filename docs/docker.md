### Para produção

```
version: "3.8"

services:
  # Banco de dados PostgreSQL
  postgres:
    image: postgres:15-alpine
    container_name: sslares_postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: sslares
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres123
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - sslares_network

  # Aplicação Next.js
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: sslares_app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:postgres123@postgres:5432/sslares
    depends_on:
      - postgres
    networks:
      - sslares_network

  # Redis para cache
  redis:
    image: redis:7-alpine
    container_name: sslares_redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    networks:
      - sslares_network

volumes:
  postgres_data:

networks:
  sslares_network:
    driver: bridge
```
