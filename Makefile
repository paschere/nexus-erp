# Makefile para gestión de Docker Compose en ERP System
# Uso: make <comando>

.PHONY: help up down restart logs ps clean backup-db backup-redis setup health test-db test-redis

# Colores para output
RED=\033[0;31m
GREEN=\033[0;32m
YELLOW=\033[1;33m
NC=\033[0m # No Color

help: ## Muestra esta ayuda
	@echo "$(GREEN)Comandos disponibles:$(NC)"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-20s$(NC) %s\n", $$1, $$2}'

setup: ## Configuración inicial - crea archivo .env desde template
	@if [ ! -f .env ]; then \
		echo "$(YELLOW)Creando archivo .env desde template...$(NC)"; \
		cp docker-env.template .env; \
		echo "$(GREEN)✓ Archivo .env creado. Por favor edítalo con tus credenciales.$(NC)"; \
	else \
		echo "$(YELLOW)El archivo .env ya existe.$(NC)"; \
	fi

up: ## Inicia todos los servicios en segundo plano
	@echo "$(GREEN)Iniciando servicios...$(NC)"
	docker compose up -d
	@echo "$(GREEN)✓ Servicios iniciados$(NC)"
	@make health

down: ## Detiene todos los servicios (preserva datos)
	@echo "$(YELLOW)Deteniendo servicios...$(NC)"
	docker compose down
	@echo "$(GREEN)✓ Servicios detenidos$(NC)"

down-volumes: ## Detiene servicios y elimina volúmenes (¡ELIMINA DATOS!)
	@echo "$(RED)⚠️  ADVERTENCIA: Esto eliminará todos los datos$(NC)"
	@read -p "¿Estás seguro? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker compose down -v; \
		echo "$(GREEN)✓ Servicios y volúmenes eliminados$(NC)"; \
	fi

restart: ## Reinicia todos los servicios
	@echo "$(YELLOW)Reiniciando servicios...$(NC)"
	docker compose restart
	@echo "$(GREEN)✓ Servicios reiniciados$(NC)"

restart-db: ## Reinicia solo PostgreSQL
	@echo "$(YELLOW)Reiniciando PostgreSQL...$(NC)"
	docker compose restart db
	@echo "$(GREEN)✓ PostgreSQL reiniciado$(NC)"

restart-redis: ## Reinicia solo Redis
	@echo "$(YELLOW)Reiniciando Redis...$(NC)"
	docker compose restart redis
	@echo "$(GREEN)✓ Redis reiniciado$(NC)"

logs: ## Muestra logs de todos los servicios (Ctrl+C para salir)
	docker compose logs -f

logs-db: ## Muestra logs de PostgreSQL
	docker compose logs -f db

logs-redis: ## Muestra logs de Redis
	docker compose logs -f redis

ps: ## Muestra el estado de los servicios
	@docker compose ps

health: ## Verifica el health status de los servicios
	@echo "$(GREEN)Verificando estado de servicios...$(NC)"
	@docker compose ps
	@echo ""
	@echo "$(GREEN)PostgreSQL Health:$(NC)"
	@docker inspect --format='{{.State.Health.Status}}' erp-postgres 2>/dev/null || echo "$(RED)No disponible$(NC)"
	@echo "$(GREEN)Redis Health:$(NC)"
	@docker inspect --format='{{.State.Health.Status}}' erp-redis 2>/dev/null || echo "$(RED)No disponible$(NC)"

stats: ## Muestra estadísticas de uso de recursos
	docker compose stats

test-db: ## Prueba la conexión a PostgreSQL
	@echo "$(GREEN)Probando conexión a PostgreSQL...$(NC)"
	docker compose exec db pg_isready -U postgres
	@echo "$(GREEN)✓ PostgreSQL está listo$(NC)"

test-redis: ## Prueba la conexión a Redis
	@echo "$(GREEN)Probando conexión a Redis...$(NC)"
	docker compose exec redis redis-cli -a $$(grep REDIS_PASSWORD .env | cut -d '=' -f2) PING
	@echo "$(GREEN)✓ Redis está listo$(NC)"

shell-db: ## Abre shell de PostgreSQL (psql)
	docker compose exec db psql -U postgres -d erp_db

shell-redis: ## Abre shell de Redis (redis-cli)
	docker compose exec redis redis-cli -a $$(grep REDIS_PASSWORD .env | cut -d '=' -f2)

backup-db: ## Crea backup de PostgreSQL
	@echo "$(GREEN)Creando backup de PostgreSQL...$(NC)"
	@mkdir -p backups
	docker compose exec -T db pg_dump -U postgres erp_db > backups/postgres_backup_$$(date +%Y%m%d_%H%M%S).sql
	@echo "$(GREEN)✓ Backup creado en ./backups/$(NC)"

backup-redis: ## Crea backup de Redis
	@echo "$(GREEN)Creando backup de Redis...$(NC)"
	@mkdir -p backups
	docker compose exec redis redis-cli -a $$(grep REDIS_PASSWORD .env | cut -d '=' -f2) BGSAVE
	@echo "$(GREEN)✓ Backup de Redis iniciado$(NC)"

restore-db: ## Restaura backup de PostgreSQL (especificar BACKUP_FILE=archivo.sql)
	@if [ -z "$(BACKUP_FILE)" ]; then \
		echo "$(RED)Error: Especifica BACKUP_FILE=archivo.sql$(NC)"; \
		exit 1; \
	fi
	@echo "$(YELLOW)Restaurando desde $(BACKUP_FILE)...$(NC)"
	docker compose exec -T db psql -U postgres erp_db < $(BACKUP_FILE)
	@echo "$(GREEN)✓ Backup restaurado$(NC)"

clean: ## Limpia recursos Docker no utilizados
	@echo "$(YELLOW)Limpiando recursos Docker...$(NC)"
	docker system prune -f
	@echo "$(GREEN)✓ Limpieza completada$(NC)"

clean-all: ## Limpieza profunda de Docker (¡CUIDADO!)
	@echo "$(RED)⚠️  ADVERTENCIA: Esto eliminará todos los contenedores, redes, volúmenes e imágenes no utilizadas$(NC)"
	@read -p "¿Estás seguro? [y/N] " -n 1 -r; \
	echo; \
	if [[ $$REPLY =~ ^[Yy]$$ ]]; then \
		docker system prune -a --volumes -f; \
		echo "$(GREEN)✓ Limpieza profunda completada$(NC)"; \
	fi

inspect-db: ## Inspecciona el contenedor de PostgreSQL
	docker compose exec db env

inspect-redis: ## Inspecciona el contenedor de Redis
	docker compose exec redis redis-cli -a $$(grep REDIS_PASSWORD .env | cut -d '=' -f2) INFO

volumes: ## Lista los volúmenes de Docker
	@echo "$(GREEN)Volúmenes del proyecto:$(NC)"
	@docker volume ls | grep erp

networks: ## Lista las redes de Docker
	@echo "$(GREEN)Redes del proyecto:$(NC)"
	@docker network ls | grep erp



