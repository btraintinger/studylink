# Studylink

## How to run Studylink locally

copy `.env.docker.example` to `.env`

change the variable `PORT` in `.env` to the desired one

### Start a development environment

```bash
docker compose -f docker-compose.dev.yml up
```

### Start a production environment

```bash
docker compose -f docker-compose.node.prod.yml up
```
