# import .env
ENV	:= $(dir $(realpath $(lastword $(MAKEFILE_LIST))))/.env

# Environment variables for project
include $(ENV)

# Export all variable to sub-make
export

.PHONY: build-development
build-development: ## Build the development docker image.
	docker compose -f docker/docker-compose.dev.yml build

.PHONY: start-development
start-development: ## Start the development docker container.
	docker compose -f docker/docker-compose.dev.yml up 

.PHONY: stop-development
stop-development: ## Stop the development docker container.
	docker compose -f docker/docker-compose.dev.yml down

.PHONY: build-production
build-production: ## Build the production docker image.
	docker compose -f docker/docker-compose.prod.yml build

.PHONY: start-production
start-production: ## Start the production docker container.
	docker compose -f docker/docker-compose.prod.yml up

.PHONY: stop-production
stop-production: ## Stop the production docker container.
	docker compose -f docker/docker-compose.prod.yml down